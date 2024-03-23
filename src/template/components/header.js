const Header = (project, description) => `
  <header> 
    <a href="/">  
      <h1>${project}</h1>
      <p>${description}</p>
    </a>
    <div className="header-right-side">
      <label className="switch">
        <div>
          <input type="checkbox" id="switch" name="theme" onChange={() => toggleTheme()} />
          <span className="slider round"></span>
        </div>
      </label>
      </div>
  </header>`

module.exports = Header
