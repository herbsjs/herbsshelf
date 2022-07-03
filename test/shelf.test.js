const assert = require('assert')
const { usecase, Ok, step } = require('@herbsjs/herbs')
const { renderShelfHTML, herbsshelf } = require('../src/shelf')

describe('Generate usecase self-documentation', () => {
	describe('the simplest use case', () => {
		var usecases = []
		const givenTheSimplestUseCase = () => {
			const uc = usecase('A use case', {
				'A step': step(() => {
					return Ok()
				}),
				'A second step': step({
					'step 1': step(() => {
						return Ok()
					}),
					'step 2': step(() => {
						return Ok()
					})
				})
			})
			return uc
		}

		it('should generate some doc', () => {
			//given
			usecases.push({ usecase: givenTheSimplestUseCase(), tags: { group: 'SimplestestUseCase' } })
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.ok(shelf)
		})

		it('should validate if documentation generated is a valid HTML document', () => {
			//given
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)
		})

		it('should return empty doc for invalid readme path', () => {
			//given
			usecases.push({ usecase: givenTheSimplestUseCase(), tags: { group: 'SimplestestUseCase' } })
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project', 'invalid.md')
			//then
			assert.ok(shelf)
		})
	})

	describe('the simplest use case with complex request and response', () => {
		var usecases = []
		const givenTheSimplestUseCaseWithRequestResponse = () => {
			const uc = usecase('A use case', {
				request: {
					param1: String,
					param2: Number
				},
				response: {
					output1: String
				},
				'A step': step((ctx) => {
					ctx.ret.response3 = ctx.req.param2 + 1
					return Ok()
				})
			})
			return uc
		}

		it('should generate some doc', () => {
			//given
			usecases.push({ usecase: givenTheSimplestUseCaseWithRequestResponse(), tags: { group: 'SimplestestUseCaseWithRequestResponse' } })
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.ok(shelf)
		})

		it('should validate if documentation generated is a valid HTML document', () => {
			//given
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)
		})
	})

	describe('the simplest use case with request and response without name declaration', () => {
		var usecases = []
		const givenTheSimplestUseCaseWithRequestResponse = () => {
			const uc = usecase('A use case', {
				request: String,
				response: String,
				'A step': step((ctx) => {
					ctx.ret.response3 = ctx.req.param2 + 1
					return Ok()
				})
			})
			return uc
		}

		it('should generate some doc', () => {
			//given
			usecases.push({ usecase: givenTheSimplestUseCaseWithRequestResponse(), tags: { group: 'SimplestestUseCaseWithRequestResponse' } })
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.ok(shelf)
		})

		it('should validate if documentation generated is a valid HTML document', () => {
			//given
			var shelf = renderShelfHTML('Project Test', usecases, null, 'Description of the project')
			//then
			assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)
		})
	})

	describe('the herbarium use case', () => {
		var herbarium = {
			usecases: { all: () => {} },
			entities: { all: () => {} },
			specs: { all: () => {} }
		}

		it('should generate some doc', () => {
			//given
			var shelf = herbsshelf({ herbarium, project: 'Project Test', description: 'Description of the project' })
			//then
			assert.ok(shelf)
		})

		it('should validate if documentation generated is a valid HTML document', () => {
			//given
			var shelf = herbsshelf({ herbarium, project: 'Project Test', description: 'Description of the project' })
			//then
			assert.strictEqual(/<(?=.*? .*?\/ ?>|br|hr|input|!--|wbr)[a-z]+.*?>|<([a-z]+).*?<\/\1>/i.test(shelf), true)
		})
	})
})
