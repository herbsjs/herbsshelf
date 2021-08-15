const fs = require("fs")
const path = require("path")

const getCssStyle = () => {
  const cssFilePath = path.resolve(__dirname, "../css/shelf.css")
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
      <header> 
      built with
      <img
        class="logo"
        src="https://avatars3.githubusercontent.com/u/60399865"
        alt="HerbsJS Logo"
      />
      <div>DarkMode</div>
      </header>
      <main id="shelf">
        <nav>
          <div class="project-tag"> PROJETO </div>
          <h1>NOME DO PROJETO</h1>
          <ul class="uc-nav">
            <li
              v-for="(item,index) in shelfData"
              :key="item.section"
              class="uc-nav-groups"
            >
              <span @click="openNav(index)">{{ item.section }}</span>
              <ul class="uc-list-nav" v-if="navOpen === index">
                <li
                  v-for="(uc, ucIndex) in item.useCases"
                  :key="uc.description"
                  class="icon i-code"
                  :class="{selected : page === ucIndex }"
                  @click="openPage(ucIndex)"
                >
                  {{uc.description}}
                </li>
              </ul>
            </li>
          </ul>
          <div class="contribute">
            <a href="https://github.com/herbsjs">
              <h3>Contribute on Github</h3>
            </a>
          </div>
        </nav>
        <section class="content" v-if="page < 0">
          <h1 class="shelf-title">Herbs Shelf</h1>
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
        <section class="content" v-else>
          <h2>{{selectedPage.description}}</h2>
          <div class="content-card">

            <h4 class="icon i-play">Steps:</h4>
    
            <ul class="steps-list">
              <template v-for="step in selectedPage.steps">
                <template v-if="step.type === 'if else'">
                  <ul class="if-steps-list">s
                    <li class="icon i-if">[if] {{step.if.description}}</li>
                    <li class="icon i-then">[then] {{step.then.description}}</li>
                    <li class="icon i-then">[else] {{step.else.description}}</li>
                  </ul>
                </template>
                <template v-else>
                  <li class="icon i-play">{{step.description}}</li>
                </template>
              </template>
            </ul>
          </div>
          <div class="content-row">
            <div v-if="selectedPage.request && selectedPage.request.length > 0" class="content-card">
              <h4>Request:</h4>
              <ul class="steps-list">
                <template v-for="(item,index) in selectedPage.request">
                  <li class="icon i-request">  <b> {{ item.name }} </b> : <i> {{ item.type }} </i></li>
                </template>
            </ul>
            </div>

            <div v-if="selectedPage.response && selectedPage.response.length > 0" class="content-card">
              <h4>Response:</h4>
              <ul class="steps-list">
                <template v-for="(item,index) in selectedPage.response">
                  <li class="icon i-response">  <b> {{ item.name }} </b> : <i> {{ item.type }} </i></li>
                </template>
              </ul>
            </div>
          </div>
          
        </section>
      </main>
  
      <script src="https://cdn.jsdelivr.net/npm/vue/dist/vue.js"></script>
      <script>
        var shelf = new Vue({
          el: "#shelf",
          data: {
            page: -1,
            navOpen: -1,
            selectedPage: {},
            shelfData: ${JSON.stringify(shelfData)},
          },
          methods: {
            openNav: function (value) {
              this.navOpen = this.navOpen === value ? -1 : value
              this.page = -1
              this.$forceUpdate()
            },
            openPage: function (value) {
              this.page = this.page === value ? -1 : value
              this.selectedPage = this.shelfData[this.navOpen].useCases[
                this.page
              ]
              this.$forceUpdate()
            },
          },
        })
      </script>
    </body>
  </html>
  `
  return template
}
module.exports = generateHTML
