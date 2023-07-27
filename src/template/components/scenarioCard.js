const scenario = `
  {selectedPage.spec && selectedPage.spec.scenarios && selectedPage.spec.scenarios.length > 0 ?
      <div className="content-card">
        <div className="header-card">
          <h4>
            <span className="icon i-scenarios"></span>
            Scenarios
          </h4>        
        </div>        
        
        {selectedPage.spec.scenarios.map( (scenario, _) => {
          return <ul className="scenario-list">
            <span className="icon i-scenario"></span>
            {scenario.description}
            {scenario.samples.map( (sample, _) => {
              return <li className="scenario-list"> 
                <span className="icon i-sample"></span>
                {sample.description} <div className="tag-line">sample</div>
              </li>
            })}
            {scenario.givens.map( (given, _) => {
              return <li className="scenario-list">
                <span className="icon i-given"></span>
                {given.description} <div className="tag-line">given</div>
              </li>
            })}
            {scenario.whens.map( (when, _) => {
              return <li className="scenario-list">
                <span className="icon i-when"></span>
                {when.description} <div className="tag-line">when</div>
              </li>
            })}
            {scenario.checks.map( (check, _) => {
              return <li className="scenario-list">
                <span className="icon i-check"></span>
                {check.description} <div className="tag-line">check</div>
              </li>
            })}
        </ul>
        }
      )}
    </div>
  : null}
`

module.exports = scenario


