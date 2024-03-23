const Nav = (i18n) => `
  <nav>
    <ul className="uc-nav">
      <li className="uc-nav-groups" onClick={() => openPage(-1)}>
        <span className={navOpen === -1 ? "nav-selected" : null}>
          ${i18n.__('Overview')}
        </span>      
      </li>
      <li className="uc-nav-groups" onClick={() => openPage(-2)}>
        <span className={navOpen === -2 ? "nav-selected" : null}>
          ${i18n.__('Entities')}
        </span>
      </li>
      {shelfData.map((item, index) =>
        <li key={item.section} className="uc-nav-groups">
          <span onClick={() => openNav(index)} className={navOpen === index ? "nav-selected i-arrow-up":"i-arrow-down"}>
            {item.section}
          </span>
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
