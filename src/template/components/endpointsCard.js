const displayEndpointRequestParameters = `const displayEndpointRequestParameters = (parameters, indentation = 0) => {
    return Object.keys(parameters).map((parameter) => {
      const value = parameters[parameter];
  
      if (typeof value === 'object' && !Array.isArray(value)) {
        return (
          <div className="endpoint-parameters-source" key={parameter}>
            <div className="endpoint-parameters-source-title" style={{ paddingLeft: indentation * 20 }} >
              <div className="endpoint-parameters-source-title-name">
                {parameter}
              </div>
              :{' {'}
            </div>
            {displayEndpointRequestParameters(value, indentation + 1)}
            <div className="endpoint-parameters-source-title" style={{ paddingLeft: indentation * 20 }} >
              {'}'}
            </div>
          </div>
        );
      } else {
        return (
          <div
            className="endpoint-parameters-source-parameter"
            key={parameter}
            style={{ paddingLeft: indentation * 20 }}
          >
            <div className="endpoint-parameters-source-parameter-name">
              {parameter}:
            </div>
            <div className="endpoint-parameters-source-parameter-type">
              {JSON.stringify(value)}
            </div>
          </div>
        );
      }
    });
  };	
`
const EndpointsCard = `
    {selectedPage.REST && selectedPage.REST.length > 0 ?
        <div className="content-card">
            <div className="header-card">
                <h4>
                    <span className="icon i-endpoints"></span>
                    Endpoints
                </h4>
            </div>
            <div className="card-body-endpoint">
                <div className="endpoint-type">
                    REST
                </div>
                <div className="endpoints-list">
                    {selectedPage.REST.map( (endpoint) => {
                        return <div className="endpoint-list">
                            <div className="endpoint-header"> 
                                <div className={'endpoint-method endpoint-method-' + endpoint.method}>{endpoint.method}</div>
                                <div className="endpoint-path">{endpoint.path}</div>
                            </div>
                            <div className="endpoint-description">
                                <div className="endpoint-description-version">Version: 
                                    <span className="endpoint-values">{endpoint.version}</span>
                                </div>
                                <div className="endpoint-description-method">Method:
                                    <span className="endpoint-values">{endpoint.method}</span>
                                </div>

                                <div className="endpoint-description-resource">Resource:
                                    <span className="endpoint-values">{endpoint.resource}</span>
                                </div>
                            </div>
                            <div className="endpoint-parameters">
                                <div className="endpoint-parameters-title">Request</div>
                                {endpoint.parameters && Object.keys(endpoint.parameters).length > 0 ? (
                                <div className="endpoint-parameters-list">
                                    {displayEndpointRequestParameters(endpoint.parameters)}
                                </div>
                                ) : null}
                            </div>
                        </div>
                    })}
                </div>
                <div className="endpoint-type">
                    GraphQL
                </div>
                <div className="endpoints-list">
                    Coming soon... 🚀
                </div>
            </div>
        </div>
    : null}
`
module.exports = { EndpointsCard, displayEndpointRequestParameters }


