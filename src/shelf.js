const { checker } = require("@herbsjs/herbs")
const { entity2diagram, usecase2diagram } = require('@herbsjs/herbs2mermaid')
const generateHTML = require('./template/default')

const generateShelfData = (usecases, specs = [], REST = []) => {
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
						specs.find((s) => s.usecase === i.id),
						REST.find((r) => r.id === i.id)?.REST
					)
				)
		})
	}
	return shelfData
}

const formatUseCaseDoc = (usecase, spec, REST) => {
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
		if (Object.entries(usecase.response).length == 0)
			responseParams.push({ name: 'Instance of', type: usecase.response.name })
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

	if (spec) usecase.spec = spec.spec.doc()
	if (REST) {
		usecase.REST = JSON.parse(JSON.stringify(REST))
		function stringify(obj) {
			function convertFieldsArrayToObject(fields) {
				const result = {}
				fields.forEach(field => { result[field.name] = field.type })
				return result
			}
			const result = {}
			for (const key in obj) {
				if (Array.isArray(obj[key])) result[key] = obj[key].map(stringify)
				else if (typeof obj[key] === 'object' && obj[key] !== null) result[key] = stringify(obj[key])
				else result[key] = obj[key].name
			}
			return result
		}
		REST.map((endpoints) => { usecase.REST.find((e) => e.path === endpoints.path).parameters = stringify(endpoints.parameters) })
	}
	return usecase
}

function renderHTML({ project, usecases, entities, specs, REST, description, readmePath }) {
	const shelfData = generateShelfData(usecases, specs, REST)
	const classDiagram = entity2diagram(entities)
	const usecasesFlowChart = usecase2diagram(usecases)
	return generateHTML(project, shelfData, description, readmePath, classDiagram, usecasesFlowChart)
}

function renderShelfHTML(project, usecases, entities, description = '', readmePath = './README.md') {
	// eslint-disable-next-line no-console
	console.warn(`⚠️  'renderShelfHTML' function is deprecated. Use the 'herbsshelf' function instead.`)
	const shelfData = generateShelfData(usecases)
	const classDiagram = entity2diagram(entities)
	const usecasesFlowChart = usecase2diagram(usecases)
	return generateHTML(project, shelfData, description, readmePath, classDiagram, usecasesFlowChart)
}

function herbsshelf({ herbarium, project, description = '', readmePath = './README.md' }) {
	function groupFrom(node) {
		if (node.type === herbarium.node.entity) return node.id
		const entities = node.linkedTo({ type: herbarium.node.entity })
		const group = entities.length > 0 ? groupFrom(entities[0]) : null
		const name = group.replace(/([A-Z])/g, ' $1').trim()
		return name
	}

	const usecases = herbarium.nodes.find({ type: herbarium.node.usecase }).map((item) => ({
		usecase: item.value(),
		id: item.id,
		tags: { group: groupFrom(item) }
	}))

	const entities = herbarium.nodes.find({ type: herbarium.node.entity }).map((item) => ({
		entity: item.value,
		id: item.id,
		tags: { group: groupFrom(item) }
	}))

	const specs = herbarium.nodes.find({ type: herbarium.node.spec }).map((item) => ({
		spec: item.value,
		id: item.id,
		usecase:(() => item.linkedTo({ type: herbarium.node.usecase })?.[0]?.id)()
	}))

	const REST = herbarium.nodes.find({ type: herbarium.node.usecase }).map((item) => ({
		id: item.id,
		REST: item.metadatas?.REST
	}))

	return renderHTML({ project, usecases, entities, specs, REST, description, readmePath })
}

module.exports = { renderShelfHTML, herbsshelf }
