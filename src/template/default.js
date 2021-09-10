const fs = require('fs')
const path = require('path')


const getCssStyle = () => {
    const cssFilePath = path.resolve(__dirname, '../css/shelf.css')
    return fs.readFileSync(cssFilePath, "utf-8")
}

function generateHTML(shelfData) {

    let template = `
  <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Herbs Shelf</title>
</head>

<style>
    ${getCssStyle()}
</style>

<body>
    <main id="shelf">

    </main>

    <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

    <script type="text/babel">
        const { useState } = React
        function Shelf() {
            const [page, setPage] = useState(-1);
            const [navOpen, setNavOpen] = useState(-1);
            const [selectedPage, setSelectedPage] = useState({});
            const [shelfData, setShelfData] = useState(${JSON.stringify(shelfData)});


            const openNav = (value) => {
                setNavOpen(navOpen === value ? -1 : value)
                setPage(-1)
                forceUpdate()
            }

            const openPage = (value) => {
                const selectedPage = page === value ? -1 : value
                setPage(selectedPage)
                if(selectedPage !== -1) setSelectedPage(shelfData[navOpen].useCases[selectedPage])
                forceUpdate()
            }

            return (
                <main>
                    <nav>
                        <div className="text-center">
                            <img className="logo" src="https://avatars3.githubusercontent.com/u/60399865" alt="HerbsJS Logo" />
                        </div>
                        <ul className="uc-nav">
                            {shelfData.map((item, index) =>
                                <li key={item.section} className="icon"
                                    className={navOpen !== index ? 'i-folder' : 'i-folder-open'}>
                                    <span onClick={() => openNav(index)}>{item.section}</span>
                                    {navOpen === index ? <ul className="uc-list-nav">
                                        {item.useCases.map((uc, ucIndex) =>
                                            <li key={uc.description} className="icon i-code"
                                                className={page === ucIndex ? "selected" : null} onClick={() => openPage(ucIndex)}>
                                                {uc.description}
                                            </li>
                                        )}
                                    </ul> : null}
                                </li>)}
                        </ul>
                        <div className="contribute">
                            <a href="https://github.com/herbsjs">
                                <h3>Contribute on Github</h3>
                            </a>
                        </div>
                    </nav >
                    {
                        page < 0 ? <section className="content">
                            <h1 className="shelf-title">Herbs Shelf</h1>
                            <h2>Welcome to the shelf!</h2>
                            <p>
                                This is a self-generate documentation, here you can see all the flow
                                of information in the application.
                            </p>
                            <p>
                                You can use the lateral panel to navigate into
                                <strong>Use Cases</strong> of this application.
                            </p>
                            <div className="arrow-to-nav">
                                <svg xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" viewBox="0 0 24 24"
                                    fill="black">
                                    <path d="M0 0h24v24H0z" fill="none" />
                                    <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
                                </svg>
                            </div>
                        </section>
                            :
                            <section className="content">
                                <h1 className="shelf-title">Herbs Shelf</h1>
                                <h1>{selectedPage.description}</h1>

                                {selectedPage.request && selectedPage.request.length > 0 ?
                                    <div>
                                        <h4>Request:</h4>
                                        <ul className="steps-list">
                                        {selectedPage.request.map( (reqItem, index) =>
                                            <li className="icon i-request"> <b> {reqItem.name} </b> : <i> {reqItem.type} </i></li>
                                        )}
                                        </ul>
                                    </div>
                                    : null}

                                {selectedPage.response && selectedPage.response.length > 0 ?
                                    <div>
                                        <h4>Response:</h4>
                                        <ul className="steps-list">
                                        {selectedPage.response.map( (resItem, index) =>
                                                <li className="icon i-response"> <b> {resItem.name} </b> : <i> {resItem.type} </i></li>
                                        )}
                                        </ul>
                                    </div>
                                    : null}

                                <h3>Steps:</h3>

                                <ul className="steps-list">
                                        {selectedPage.steps.map(step => step.type === 'if else' ?
                                                <ul className="if-steps-list">
                                                    <li className="icon i-if">[if] {step.if.description}</li>
                                                    <li className="icon i-then">[then] {step.then.description}</li>
                                                    <li className="icon i-then">[else] {step.else.description}</li>
                                                </ul>
                                            :
                                                <li className="icon i-play">{step.description}</li>
                                        )}
                                </ul>
                            </section>
                    }
                </main>
            );

        }

        const domContainer = document.querySelector('#shelf');
        ReactDOM.render(<Shelf />, domContainer);
    </script>
</body>

</html>
  `
    return template
}
module.exports = generateHTML
