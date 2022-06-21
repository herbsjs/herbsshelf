const Nav =`
  <nav>
    <ul className="uc-nav">
    <li key={item.section} className="uc-nav-groups" onClick={() => openPage(0)}>
      README
    </li>
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
