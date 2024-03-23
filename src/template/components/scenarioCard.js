const scenario = (i18n) => `
  {selectedPage.spec && selectedPage.spec.scenarios && selectedPage.spec.scenarios.length > 0 ?
      <div className="content-card">
        <div className="header-card">
          <h4 className="icon i-scenario">${i18n.__("Scenarios")}:</h4>        
        </div>        
        
        {selectedPage.spec.scenarios.map( (scenario, _) => {
          return <ul className="scenario-list">
            🟒 {scenario.description}
            {scenario.samples.map( (sample, _) => {
              return <li className="scenario-list">⇶ {sample.description} <div className="scenario-type">(${i18n.__("sample")})</div></li>
            })}
            {scenario.givens.map( (given, _) => {
              return <li className="scenario-list">🠆 {given.description} <div className="scenario-type">(${i18n.__("given")})</div></li>
            })}
            {scenario.whens.map( (when, _) => {
              return <li className="scenario-list">🠆 {when.description} <div className="scenario-type">(${i18n.__("when")})</div></li>
            })}
            {scenario.checks.map( (check, _) => {
              return <li className="scenario-list">🠆 {check.description} <div className="scenario-type">(${i18n.__("check")})</div></li>
            })}
        </ul>
        }
      )}
    </div>
  : null}
`

module.exports = scenario


