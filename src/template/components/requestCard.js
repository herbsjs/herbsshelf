const RequestCard =`
  {selectedPage.request && selectedPage.request.length > 0 ?
    <div className="content-card">
      <h4 className="icon i-request">Request:</h4>
      <ul className="steps-list">
      {selectedPage.request.map( (reqItem, index) => {
          if (reqItem.type.hasOwnProperty('iterableKind'))
            return <li> <b> {reqItem.name} </b> : {reqItem.type.iterableKind} <b>{reqItem.type.valueOf} </b></li>
          else 
            return <li> <b> {reqItem.name} </b> : {reqItem.type} </li>
        }
      )}
      </ul>
  </div>
  : null}
`

module.exports = RequestCard
