const generateHTML = require('./template/default')

const generateShelfData = (usecases) => {

  const shelfData = []
  const groups = [...new Set(usecases.map(i => i.tags.group))]
  for (const group of groups) {
    shelfData.push({
      section: group,
      useCases: usecases
        .filter(i => i.tags.group === group)
        .map(i => formatUseCaseDoc(i.usecase.doc()))
    })
  }
  return shelfData

}

const formatUseCaseDoc = (usecase) => {
  var requestParams = []
  var responseParams = []

  if (usecase.request) {
    if (Object.entries(usecase.request).length == 0)
      responseParams.push({ 'name': 'Object of', 'type': usecase.request.name })
    else {
      for (const [key, value] of Object.entries(usecase.request)) {
        requestParams.push({ 'name': key, 'type': value.name ? value.name : `Array of ${value[0].name}` })

      }
    }
    usecase.request = requestParams
  }

  if (usecase.response) {
    if (Object.entries(usecase.response).length == 0)
      responseParams.push({ 'name': 'Object of', 'type': usecase.response.name })
    else {
      for (const [key, value] of Object.entries(usecase.response)) {
        responseParams.push({ 'name': key == '0' ? 'Array of' : key, 'type': value.name })

      }
    }
    usecase.response = responseParams
  }

  return usecase

}

function renderShelfHTML(project, usecases, readmePath = './README.md') {
  const shelfData = generateShelfData(usecases)
  return generateHTML(project, shelfData, readmePath)
}

module.exports = renderShelfHTML
