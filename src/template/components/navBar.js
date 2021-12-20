const Nav = (project) => `
  <nav>
    <div className="project-tag"> PROJECT </div>
    <h1>${project}</h1>
    <ul className="uc-nav">
      {shelfData.map((item, index) =>
        <li key={item.section} className="uc-nav-groups">
          <span onClick={() => openNav(index)} className={navOpen === index ? "nav-selected i-arrow-up":"i-arrow-down"}>{item.section}</span>
          {navOpen === index ? <ul className="uc-list-nav">
            {item.useCases.map((uc, ucIndex) =>
              <li key={uc.description} className={page === ucIndex ? " icon i-code selected" : "icon i-code"} onClick={() => openPage(ucIndex)}>
                {uc.description}
              </li>
          )}
          </ul> : null}
        </li>)}
    </ul>
  </nav >
`

module.exports = Nav
