const StepsCard = `
  <div className="content-card">
    <div className="header-card">
      <h4 className="icon i-play no-border">Steps:</h4>
      <ul className="card-options">
        <li className="icon i-steps" onClick={() => setUsecaseCaseView(STEPS_VIEW)}></li>
        <li className="icon i-flux" onClick={() => setUsecaseCaseView(CLASS_DIAGRAM_VIEW)}></li>
      </ul>
    </div>
    <div id="card-body">
      {usecaseCaseView === STEPS_VIEW ? (
        <ul className="steps-list">        
          {selectedPage.steps.map(step => step.type === 'if else' ?
          
          <div class="step-if-description">
            <li class="li-if-description">🠆 {step.description}</li>
            <ul className="if-steps-list">
              <li className="icon i-if">[if] {step.if.description}</li>
              <li className="icon i-then">[then] {step.then.description}</li>
              <li className="icon i-then">[else] {step.else.description}</li>
            </ul>
            </div>
          :
            <li>🠆 {step.description}</li>
          )}
        </ul>
      ) : (
          <div id="graphDivUseCase" class="mermaid">
            Loading Diagram...
          </div>
      )}
    </div>
  </div>
`
module.exports = StepsCard
