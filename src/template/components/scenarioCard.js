const scenario = `
  {selectedPage.spec && selectedPage.spec.scenarios && selectedPage.spec.scenarios.length > 0 ?
    <div class="content-row">
      <div className="content-card">
        <h4 className="icon i-scenario">Scenarios:</h4>
        
        {selectedPage.spec.scenarios.map( (scenario, _) => {
          return <ul className="scenario-list">
            🟒 {scenario.description}
            {scenario.samples.map( (sample, _) => {
              return <li className="scenario-list">⇶ {sample.description} <div className="scenario-type">(sample)</div></li>
            })}
            {scenario.givens.map( (given, _) => {
              return <li className="scenario-list">🠆 {given.description} <div className="scenario-type">(given)</div></li>
            })}
            {scenario.whens.map( (when, _) => {
              return <li className="scenario-list">🠆 {when.description} <div className="scenario-type">(when)</div></li>
            })}
            {scenario.checks.map( (check, _) => {
              return <li className="scenario-list">🠆 {check.description} <div className="scenario-type">(check)</div></li>
            })}
        </ul>
        }
      )}
    </div>
  </div>
  : null}
`

module.exports = scenario


