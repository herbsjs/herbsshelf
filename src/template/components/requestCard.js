const RequestCard =`
  {selectedPage.request && selectedPage.request.length > 0 ?
    <div className="content-card">
      <h4 className="icon i-request">Request:</h4>
      <ul className="steps-list">
      {selectedPage.request.map( (reqItem, index) =>
        <li> <b> {reqItem.name} </b> : <i> {reqItem.type} </i></li>
      )}
      </ul>
  </div>
  : null}
`

module.exports = RequestCard
