const StepsCard =`
  <div className="content-card">
    <h4 className="icon i-play">Steps:</h4>
    <ul className="steps-list">
      {selectedPage.steps.map(step => step.type === 'if else' ?
       
       <div class="step-if-description">
         <li class="li-if-description">{step.description}</li>
         <ul className="if-steps-list">
          <li class="icon i-if">[if] {step.if.description}</li>
          <li class="icon i-then">[then] {step.then.description}</li>
          <li class="icon i-then">[else] {step.else.description}</li>
        </ul>
        </div>
      :
        <li>{step.description}</li>
      )}
    </ul>
  </div>
`
module.exports = StepsCard
