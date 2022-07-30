const assert = require('assert')
const { usecase, step, Ok, Err } = require('@herbsjs/herbs')
const usecase2diagram = require('../src/mermaid/usecase2diagram')

describe('Convert usecase to diagram', () => {

	const givenASimpleUsecase = () => {
		const AUsecase = usecase('A Usecase', {
			'Step 1': step(() => Ok()),
			'Step 2': step(() => Ok()),
			'Step 3': step(() => Ok()),
		})

		return AUsecase

	}

	it('should return a graph with all steps and relationship', async () => {
		// given

		const simpleUsecase = givenASimpleUsecase()
		await simpleUsecase.run()

		const usecase = {
			id: 'AUsecase',
			usecase: simpleUsecase
		}

		// when
		const result = usecase2diagram([usecase])

		// then
		assert.equal(result.length, 1)
		assert.equal(result[0].id, 'AUsecase')
		assert.equal(result[0].description, "A Usecase")
		assert.match(result[0].definition, /graph TD/)
		assert.match(result[0].definition, /(Step 1)/)
		assert.match(result[0].definition, /(Step 2)/)
		assert.match(result[0].definition, /(Step 3)/)
	})
})