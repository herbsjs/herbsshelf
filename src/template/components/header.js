const Header = `<header> 
    built with
    <picture>
      <a href="https://github.com/herbsjs">
        <source srcSet="https://herbsjs.org/img/logo-herbsjs-douradoebranco.png" media="(prefers-color-scheme: dark)"/>
        <img
          className="logo"
          style={{width: '150px'}}
          src="https://herbsjs.org/img/logo-herbsjs.png"
          alt="HerbsJS Logo"
        />
      </a>
    </picture>
    <label className="switch">
      <div>
        <input type="checkbox" id="switch" name="theme" onChange={() => toggleTheme()} />
        <span className="slider round"></span>
      </div>
    </label>
  </header>`

module.exports = Header
