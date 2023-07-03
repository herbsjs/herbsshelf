const { checker } = require("@herbsjs/herbs")
const { entity2diagram, usecase2diagram } = require('@herbsjs/herbs2mermaid')
const generateHTML = require('./template/default')

const generateShelfData = (usecases, specs = []) => {
	const shelfData = []
	const groups = [...new Set(usecases.map((i) => i.tags.group))]
	for (const group of groups) {
		shelfData.push({
			section: group,
			useCases: usecases
				.filter((i) => i.tags.group === group)
				.map((i) =>
					formatUseCaseDoc(
						i.usecase.doc(),
						specs.find((s) => s.usecase === i.id)
					)
				)
		})
	}
	return shelfData
}

const formatUseCaseDoc = (usecase, spec) => {
	const requestParams = []
	const responseParams = []

	if (!checker.isEmpty(usecase.request)) {
		if (Object.entries(usecase.request).length == 0) requestParams.push({ name: 'Object of', type: usecase.request.name })
		else {
			Object.entries(usecase.request).map(([key, value]) => {
				requestParams.push({
					name: key,
					type: value.name ? value.name : { iterableKind: 'Array of', valueOf: value[0].name }
				})
			})
		}
		usecase.request = requestParams
	}

	if (!checker.isEmpty(usecase.response)) {
		if (Object.entries(usecase.response).length == 0) responseParams.push({ name: 'Object of', type: usecase.response.name })
		else {
			Object.entries(usecase.response).map(([key, value]) => {
				if (Array.isArray(value)) {
					responseParams.push({ name: key, type: 'Array of ' + value[0].name })
					return
				}
				responseParams.push({ name: key == '0' ? 'Array of' : key, type: value.name })
			})
		}
		usecase.response = responseParams
	}

	if (spec) {
		usecase.spec = spec.spec.doc()
	}

	return usecase
}

function renderHTML({ project, usecases, entities, specs, description, readmePath }) {
	const shelfData = generateShelfData(usecases, specs)
	const classDiagram = entity2diagram(entities)
	const usecasesFlowChart = usecase2diagram(usecases)
	return generateHTML(project, shelfData, description, readmePath, classDiagram, usecasesFlowChart)
}

function renderShelfHTML(project, usecases, entities, description = '', readmePath = './README.md') {
	const shelfData = generateShelfData(usecases)
	const classDiagram = entity2diagram(entities)
	const usecasesFlowChart = usecase2diagram(usecases)
	return generateHTML(project, shelfData, description, readmePath, classDiagram, usecasesFlowChart)
}

function herbsshelf({ herbarium, project, description = '', readmePath = './README.md' }) {
	const usecases = Array.from(herbarium.usecases.all).map(([_, item]) => ({
		usecase: item.usecase(),
		id: item.id,
		tags: { group: item.group }
	}))

	const entities = Array.from(herbarium.entities.all).map(([_, item]) => ({
		entity: item.entity,
		id: item.id,
		tags: { group: item.group || 'Others' }
	}))

	const specs = Array.from(herbarium.specs.all).map(([_, item]) => ({
		spec: item.spec,
		id: item.id,
		usecase: item.usecase
	}))

	return renderHTML({ project, usecases, entities, specs, description, readmePath })
}

module.exports = { renderShelfHTML, herbsshelf }
