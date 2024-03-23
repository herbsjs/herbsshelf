const Footer = (i18n) => `
  <footer> 

    <div className="footer-right-side">
      ${i18n.__("Built With")}
      <picture>
        <a href="https://github.com/herbsjs">
          <source srcSet="https://herbsjs.org/img/logo-herbsjs-douradoebranco.png" media="(prefers-color-scheme: dark)"/>
          <img
            className="logo"
            style={{width: '6em'}}
            src="https://herbsjs.org/img/logo-herbsjs.png"
            alt="HerbsJS Logo"
          />
        </a>
      </picture>
      </div>
  </footer>`

module.exports = Footer
