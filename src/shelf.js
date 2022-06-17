const generateHTML = require('./template/default')

const generateShelfData = (usecases, specs = []) => {

  const shelfData = []
  const groups = [...new Set(usecases.map(i => i.tags.group))]
  for (const group of groups) {
    shelfData.push({
      section: group,
      useCases: usecases
        .filter(i => i.tags.group === group)
        .map(i => formatUseCaseDoc(
          i.usecase.doc(),
          specs.find(s => s.usecase === i.id)
        ))
    })
  }
  return shelfData

}

const formatUseCaseDoc = (usecase, spec) => {
  const requestParams = []
  const responseParams = []

  if (usecase.request) {
    if (Object.entries(usecase.request).length == 0)
      responseParams.push({ name: 'Object of', type: usecase.request.name })
    else {
      Object.entries(usecase.request).map(([key, value]) => {
        requestParams.push({
          name: key, type: value.name ? value.name : { iterableKind: 'Array of', valueOf: value[0].name }
        })
      })
    }
    usecase.request = requestParams
  }

  if (usecase.response) {
    if (Object.entries(usecase.response).length == 0)
      responseParams.push({ name: 'Object of', type: usecase.response.name })
    else {
      Object.entries(usecase.response).map(([key, value]) => {
        responseParams.push({ name: key == '0' ? 'Array of' : key, type: value.name })
      })
    }
    usecase.response = responseParams
  }

  if (spec) { usecase.spec = spec.spec.doc() }

  return usecase

}

function renderShelfHTML(project, usecases, readmePath = './README.md') {
  const shelfData = generateShelfData(usecases)
  return generateHTML(project, shelfData, readmePath)
}


function herbsshelf({ herbarium, project, readmePath = './README.md' }) {

  function renderHTML({ project, usecases, specs, readmePath }) {
    const shelfData = generateShelfData(usecases, specs)
    return generateHTML(project, shelfData, readmePath)
  }

  const usecases = Array.from(herbarium.usecases.all).map(([_, item]) =>
    ({ usecase: item.usecase(), id: item.id, tags: { group: item.group } }))

  const specs = Array.from(herbarium.specs.all).map(([_, item]) =>
    ({ spec: item.spec, id: item.id, usecase: item.usecase }))


  return renderHTML({ project, usecases, specs, readmePath })
}

module.exports = { renderShelfHTML, herbsshelf }
