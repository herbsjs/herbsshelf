const StepsCard =`
  <div className="content-card">
    <h4 className="icon i-play">Steps:</h4>
    <ul className="steps-list">
      {selectedPage.steps.map(step => step.type === 'if else' ?
        <ul className="if-steps-list">
          <li>[if] {step.if.description}</li>
          <li>[then] {step.then.description}</li>
          <li>[else] {step.else.description}</li>
        </ul>
      :
        <li>{step.description}</li>
      )}
    </ul>
  </div>
`

module.exports = StepsCard
