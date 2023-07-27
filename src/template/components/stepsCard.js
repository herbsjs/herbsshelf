const stepHtml = ` <ul className="steps-list">
      <li className="step-item-description">
          <div className="step-description-text">
            <span className="mini-icon i-step"></span>
            <div>{this.step.description}</div>
            {this.steps.length > 0 && <div className="tag-line">substeps</div>}
          </div>
          <div className="step-item-children">
            {this.steps.map(step => step.createHtml(indentation + 1))}
          </div>
      </li>
    </ul>
`

const ifStepHtml = ` <ul className="steps-list">
      <li class="step-ifElse-item-description">
        <div className="step-ifElse-item-description-header">
          <span className="mini-icon i-ifElse-step"></span>
          {this.ifStep.description}
        </div>
        <ul className="if-steps-list">
          <li>
            <div className="step-ifElse-substep-description-header">
              <span className="mini-icon i-if-step"></span>
              {this.if.step.description}
              <div className="tag-line">if</div>
              {this.if.steps.length > 0 && <div className="tag-line">substeps</div>}
            </div>
            <div className="step-item-children">
              {this.if.steps.map(step => step.createHtml(indentation + 1))}
            </div>
          </li>
          <li>
            <div className="step-ifElse-substep-description-header">
              <span className="mini-icon i-then-step"></span>
              {this.then.step.description}
              <div className="tag-line">then</div>
              {this.then.steps.length > 0 && <div className="tag-line">substeps</div>}
            </div>
            <div className="step-item-children">
              {this.then.steps.map(step => step.createHtml(indentation + 1))}
            </div>
          </li>
          <li>
            <div className="step-ifElse-substep-description-header">
              <span className="mini-icon i-else-step"></span>
              {this.else.step.description}
              <div className="tag-line">else</div>
              {this.else.steps.length > 0 && <div className="tag-line">substeps</div>}
            </div>
            <div className="step-item-children">
              {this.else.steps.map(step => step.createHtml(indentation + 1))}
            </div>
          </li>
        </ul>
      </li>
    </ul>
`
      
const displayStep = `

const stepBuilder = (step) => {
  let stepUI = null
  if (step.type === 'if else')
    stepUI = new IfStepUI(step)
  else
    stepUI = new StepUI(step)
  stepUI.createChildrenSteps()
  return stepUI
}

const UsecaseUI = class UsecaseUI {

  constructor(usecase) {
    this.usecase = usecase
  }

  createSteps() {
    const steps = []
    
    if (this.usecase.steps) {
      this.usecase.steps.forEach(step => {
        const stepUI = stepBuilder(step)
        steps.push(stepUI)
      })
    }
    this.steps = steps
    return this
  }

  createHtml() {
    const html = this.steps.map(step => {
      const html = step.createHtml()
      return html
    })
    return html
  }

}

const StepUI = class StepUI {
  constructor(step) {
    this.step = step
  }

  createChildrenSteps() {
    const steps = []
    if (this.step.steps) {
      this.step.steps.forEach(step => {
        const stepUI = stepBuilder(step)
        steps.push(stepUI)
      })
    }
    this.steps = steps
  }

  createHtml(indentation = 0) {
    return ${stepHtml}
  }      
}

const IfStepUI = class IfStepUI {
  constructor(ifStep) {
    this.ifStep = ifStep
  }

  createChildrenSteps() {
    this.if = stepBuilder(this.ifStep.if)
    this.then = stepBuilder(this.ifStep.then)
    this.else = stepBuilder(this.ifStep.else)
  }

  createHtml(indentation = 0) {
    const fontSize = Math.max(10, 20 - indentation * 2)
    return ${ifStepHtml}
  }
}
`

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
        (new UsecaseUI(selectedPage)).createSteps().createHtml()
      ) : (
          <div id="graphDivUseCase" class="mermaid">
            Loading Diagram...
          </div>
      )}
    </div>
  </div>
`



module.exports = { StepsCard, displayStep }
