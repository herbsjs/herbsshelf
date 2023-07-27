const ResponseCard = `
  {selectedPage.response && selectedPage.response.length > 0 ?
    <div className="content-card">      
      <div className="header-card">
        <h4>
          <span className="icon i-response"></span>
          Response
        </h4>
      </div>
      <ul className="req-resp-list">
      {selectedPage.response.map( (resItem, index) => {
          if (['Array of', 'Instance of'].includes(resItem.name))
            return <li> {resItem.name} 
              <b> 
                <span className="response-type"> {resItem.type} </span>
              </b>
            </li>
          else
            return <li> 
              <b>{resItem.name}</b> : 
              <span className="response-type"> {resItem.type} </span> 
            </li>
        }
      )}
      </ul>
    </div>
    : null}
`

module.exports = ResponseCard
