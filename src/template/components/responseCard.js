const ResponseCard =`
  {selectedPage.response && selectedPage.response.length > 0 ?
    <div className="content-card">
      <h4 className="icon i-response">Response:</h4>
      <ul className="steps-list">
      {selectedPage.response.map( (resItem, index) => {
          if (['Array of', 'Object of'].includes(resItem.name))
            return <li> {resItem.name} <b>{resItem.type}</b></li>
          else
            return <li> <b>{resItem.name}</b> : {resItem.type}</li>
        }
      )}
      </ul>
    </div>
    : null}
`

module.exports = ResponseCard
