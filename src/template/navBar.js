const Nav =`
  <nav>
    <div className="project-tag"> PROJETO </div>
    <h1>NOME DO PROJETO</h1>
    <ul className="uc-nav">
      {shelfData.map((item, index) =>
        <li key={item.section} className="uc-nav-groups">
          <span onClick={() => openNav(index)} className="i-arrow">{item.section}</span>
          {navOpen === index ? <ul className="uc-list-nav">
            {item.useCases.map((uc, ucIndex) =>
              <li key={uc.description} className={page === ucIndex ? " icon i-code selected" : "icon i-code"} onClick={() => openPage(ucIndex)}>
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
`

module.exports = Nav
