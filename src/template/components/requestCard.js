const RequestCard =`
  {selectedPage.request && selectedPage.request.length > 0 ?
    <div className="content-card">
    <div className="header-card">
      <h4>
        <span className="icon i-request"></span>
        Request
      </h4>
    </div>      
    <ul className="steps-list">
    {selectedPage.request.map( (reqItem, index) => {
      if (reqItem.type.hasOwnProperty('iterableKind')) {
        return <li> 
          <b> {reqItem.name} </b> : <span className="request-type">
            {reqItem.type.iterableKind} 
            <b> {reqItem.type.valueOf} </b>
          </span>
        </li>
      }
      else 
        return <li> 
          <b> {reqItem.name} </b> : <span className="request-type">
            {reqItem.type} 
          </span>
        </li>
    }
    )}
    </ul>
  </div>
  : null}
`

module.exports = RequestCard
