const fs = require('fs')
const path = require('path')
const Header = require('./components/header')
const NavBar = require('./components/navBar')
const StepsCard = require('./components/stepsCard')
const RequestCard = require('./components/requestCard')
const ResponseCard = require('./components/responseCard')
const scenarioCard = require('./components/scenarioCard')
const { EndpointsCard, displayEndpointRequestParameters } = require('./components/endpointsCard')

const getCssStyle = () => {
	const cssFilePath = path.resolve(__dirname, '../css/shelf.css')
	return fs.readFileSync(cssFilePath, 'utf-8')
}

const initMermaidToReadme = () => 'document.querySelectorAll("pre.mermaid, pre>code.language-mermaid").forEach($el => { console.log(1); if ($el.tagName === "CODE") {$el = $el.parentElement} $el.outerHTML = "<div class=\'mermaid\'>" + $el.textContent + "</div> <details> <summary>Diagram source</summary><pre>" + $el.textContent + "</pre></details> "})'


const getReadme = (path) => {
	if (fs.existsSync(path)) {
		const readme = fs.readFileSync(path).toString()

		return encodeURI(readme.replace(/'/g, ''))
	}

	return ''
}

function generateHTML(project, shelfData, description, readmePath, classDiagram, usecasesFlowChart) {
	let template = `
	  <!DOCTYPE html>
	  <html lang="en">
	  <head>
	      <meta charset="UTF-8" />
		  <meta name="color-scheme" content="dark light">
	      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
	      <title>Herbs Shelf</title>		
	  </head>
	  <style>
	    ${getCssStyle()}
	  </style>
	  <body>
	    
	    <main id="shelf"/>

	    <script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"></script>
	    <script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"></script>
		<script src="https://cdnjs.cloudflare.com/ajax/libs/marked/4.0.2/marked.min.js"></script>
	    <script src="https://unpkg.com/babel-standalone@6.26.0/babel.min.js"></script>
		<script src="https://cdn.jsdelivr.net/npm/mermaid@8.14.0/dist/mermaid.min.js"></script>
		
	    <script type="text/babel">
	      const { useState, useEffect} = React
	      function Shelf() {	
			
			const ENTITIES_PAGE = -2
			const README_PAGE = -1
			const STEPS_VIEW = 'STEPS_VIEW'
			const CLASS_DIAGRAM_VIEW = 'CLASS_DIAGRAM_VIEW'

	        const [theme, setTheme] = useState(localStorage.getItem('data-theme'));
			const [readmeText, setReadmeText] = useState('${getReadme(readmePath)}');
	        const [page, setPage] = useState(README_PAGE);
	        const [navOpen, setNavOpen] = useState(README_PAGE);	        
	        const [selectedPage, setSelectedPage] = useState({});
	        const [diagram, setDiagram] = useState("");
	        const [shelfData, setShelfData] = useState(${JSON.stringify(shelfData)});
			const [usecaseCaseView, setUsecaseCaseView] = useState(CLASS_DIAGRAM_VIEW);
	        const [usecasesDiagram, setUsecasesDiagram] = useState(${JSON.stringify(usecasesFlowChart)});

			const initMermaid = (theme) => {
				const options = {
					startOnLoad:true, 
					theme:'base',
					themeVariables: { 	
						primaryColor: '#e6d2b1',
						edgeLabelBackground:'#fff',
						tertiaryColor: '#eddec6',
					}
				}

				if(theme === 'dark') {
					options.themeVariables = {
						primaryColor: '#fff',
						edgeLabelBackground:'#fff',
						tertiaryColor: '#fff',
					}
				} 
				mermaid.initialize(options);				
			}

	        const toggleTheme = () => {
				const themeSwitch = document.querySelector('#main-body')
						
				if (theme ==='dark'){
					themeSwitch.classList.replace("dark", 'light');
					localStorage.setItem("data-theme", 'light') 
					setTheme('light')
					initMermaid('light')
					
				} else{
					themeSwitch.classList.replace("light", "dark");
					localStorage.setItem("data-theme", "dark")
					setTheme('dark')
					initMermaid('dark')					
				}
			}

			useEffect(() => {
				switch (page) {
					case README_PAGE:
						break;
					case ENTITIES_PAGE:					
						renderEntitiesDiagram()
						break;
					default:
						renderUsecaseFlowChat()
						break;
							
				}				
			})

			const renderEntitiesDiagram = () => {
				initMermaid(localStorage.getItem("data-theme"))
				const graphDefinition = \`${classDiagram}\`
				const graph = document.querySelector("#graphDivEntities")
				if(!graph) return
				const container = document.querySelector('#shelf main section.content')
				renderDiagram(graph, container, graphDefinition)	
			}

			const renderUsecaseFlowChat = () => {
				initMermaid(localStorage.getItem("data-theme"))
				const graph = document.querySelector("#graphDivUseCase")
				if(!graph) return
				
				const graphDefinition = usecasesDiagram.find(usecase => usecase.description === selectedPage.description)
				const container = document.querySelector('#shelf main #card-body')
				renderDiagram(graph, container, graphDefinition.definition)
			}

			const renderDiagram = (element, container, graphDefinition) => {						
				const graph = mermaid.render(element.id, graphDefinition, (svgCode, bindFunctions) => element.innerHTML = svgCode)
				container.append(element)
			}

	        const openNav = (value) => {
				const selectedValue = navOpen === value ? README_PAGE : value
				setNavOpen(selectedValue)
				setPage(README_PAGE)
	        }

	        const openPage = (value) => {
				const selectedPage = page === value ? README_PAGE : value
				setPage(selectedPage)
				if (value < 0 ) setNavOpen(value)
				if (selectedPage >= 0) setSelectedPage(shelfData[navOpen].useCases[selectedPage])
	        }

			const StartedProject = () => {
				return (
					<section className="content">
						<h2>Getting started!</h2>
						<p>This is a self-generate documentation, here you can see all the flow of information in the application.</p>
						<p>You can use the lateral panel to navigate into <strong>Use Cases</strong> of this application.</p>
					</section>
				)
			}

			const ReadmeDoc = () => {
				return (
					<section className="content">
						<article dangerouslySetInnerHTML={{__html: marked.parse(decodeURI(readmeText)) }}></article>
					</section>
				)
			}			

			const WelcomeProject = () => readmeText ? <ReadmeDoc /> : <StartedProject /> 

			const EntitiesDiagram = () => (
				<section className="content">
					<h2>Entities</h2>
					<p>Explore and learn more about ${project} through its entities and relationships.</p>
					<div id="graphDivEntities" class="mermaid">
						Loading Diagram...
					</div>
				</section>				
			)

			${displayEndpointRequestParameters}

	        return (
				<div id="main-body" className={theme}>
					${Header(project, description)}
					<main id="shelf">
						${NavBar}
						{page === README_PAGE && <WelcomeProject />}
						{page === ENTITIES_PAGE && <EntitiesDiagram />}
						{page >= 0 &&
							<section className="content">
								<h3>{selectedPage.description}</h3>
								<div class="content-row">
									${RequestCard}
									${ResponseCard}
								</div>
								${StepsCard}
								${scenarioCard}
								${EndpointsCard}
							</section>
						}
					</main>
				</div>
	        );
	      }
	      const domContainer = document.querySelector('#shelf');
	      ReactDOM.render(<Shelf />, domContainer);
		  ${initMermaidToReadme()}
	      </script>
		 </body>
	  </html>`
	return template
}
module.exports = generateHTML
