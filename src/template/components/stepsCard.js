const StepsCard = `
  <div className="content-card">
    <div className="header-card">
      <h4 className="no-border">
        <span className="icon i-play"></span>
        Steps
      </h4>
      <ul className="card-options">
        <li className="icon i-steps" onClick={() => setUsecaseCaseView(STEPS_VIEW)}></li>
        <li className="icon i-flux" onClick={() => setUsecaseCaseView(CLASS_DIAGRAM_VIEW)}></li>
      </ul>
    </div>
    <div id="card-body">
      {usecaseCaseView === STEPS_VIEW ? (
        <ul className="steps-list">        
          {selectedPage.steps.map(step => step.type === 'if else' ?
            <li class="step-ifElse-item-description">
              <div className="step-ifElse-item-description-header">
                <span className="mini-icon i-ifElse-step"></span>
                {step.description}
              </div>
              <ul className="if-steps-list">
                <li className="step-ifElse-substep-description">
                  <span className="mini-icon i-if-step"></span>
                  {step.if.description}
                  <div className="if-steps-type">(if)</div>
                </li>
                <li className="step-ifElse-substep-description">
                  <span className="mini-icon i-then-step"></span>
                  {step.then.description}
                  <div className="if-steps-type">(then)</div>
                </li>
                <li className="step-ifElse-substep-description">
                  <span className="mini-icon i-else-step"></span>
                  {step.else.description}
                  <div className="if-steps-type">(else)</div>
                </li>
              </ul>
            </li>
          :
            <li className="step-item-description">
              <span className="mini-icon i-step"></span>
              {step.description}
            </li>
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
