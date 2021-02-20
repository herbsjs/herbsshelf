const generateHTML = require('./template/default')

const generateShelfData = (usecases) => {

  const shelfData = []
  const groups = [...new Set(usecases.map(i => i.tags.group))]
  for (const group of groups) {
    shelfData.push({
      section: group,
      useCases: usecases
        .filter(i => i.tags.group === group)
        .map(i => i.usecase.doc())
    })
  }
  return shelfData
}


function renderShelfHTML(usecases) {
  const shelfData = generateShelfData(usecases)
  return generateHTML(shelfData)
}

module.exports = renderShelfHTML
