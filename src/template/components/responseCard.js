const ResponseCard =`
  {selectedPage.response && selectedPage.response.length > 0 ?
    <div className="content-card">
      <h4 className="icon i-response">Response:</h4>
      <ul className="steps-list">
      {selectedPage.response.map( (resItem, index) =>
        <li> <b> {resItem.name} </b> : <i> {resItem.type} </i></li>
      )}
      </ul>
    </div>
    : null}
`

module.exports = ResponseCard
