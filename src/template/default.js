const fs = require("fs")
const path = require("path")
const Header = require("./header")
const NavBar = require("./navBar")
const StepsCard = require("./stepsCard")
const RequestCard = require("./requestCard")
const ResponseCard = require("./responseCard")

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
      ${Header}

      <main id="shelf"/>

      <script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
      <script src="https://unpkg.com/babel-standalone@6/babel.min.js"></script>

      <script type="text/babel">
        const { useState } = React
        function Shelf() {
          const [theme, setTheme] = useState('light');
          const [page, setPage] = useState(-1);
          const [navOpen, setNavOpen] = useState(-1);
          const [selectedPage, setSelectedPage] = useState({});
          const [shelfData, setShelfData] = useState(${JSON.stringify(shelfData)});


          const toggleTheme = () => {
            console.log("AQUI")
            if (theme === 'light') {
              window.localStorage.setItem('theme', 'dark');
              setTheme('dark');
            } else {
              window.localStorage.setItem('theme', 'light');
              setTheme('light');
            }
            forceUpdate()
          }

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
            <main id="shelf">
              ${NavBar}
              {page < 0 ? <section className="content">
                <h2>Getting started!</h2>
                <p>
                    This is a self-generate documentation, here you can see all the flow
                    of information in the application.
                </p>
                <p>
                    You can use the lateral panel to navigate into
                    <strong>Use Cases</strong> of this application.
                </p>
              </section>
              :
              <section className="content">
                <h3>{selectedPage.description}</h3>

                ${StepsCard}
                
                <div class="content-row">
                  ${RequestCard}
                  ${ResponseCard}
                </div>
              </section>
            }
          </main>
        );
        }
        const domContainer = document.querySelector('#shelf');
        ReactDOM.render(<Shelf />, domContainer);
        </script>
      </body>
    </html>`
return template
}
module.exports = generateHTML
