const assert = require('assert')
const { entity, id, field } = require('@herbsjs/herbs')
const entity2diagram = require('../src/entity2diagram')

describe('Convert entity to diagram', () => {

	const givenASimpleEntity = () => {
		const AEntity = entity('A Entity', {
			id: id(Number),
			stringTest: field(String),
			booleanTest: field(Boolean),
			isExample: () => true
		})

		return [{ entity: AEntity, id: 'AEntity', metadata: {} }]
	}

	const givenAComplexEntity = () => {
		const ParentEntity = entity('A Parent Entity', {
			id: id(Number),
		})

		const AEntity = entity('A Entity', {
			id: id(Number),
			stringTest: field(String),
			booleanTest: field(Boolean),
			entityTest: field(ParentEntity),
			entitiesTest: field([ParentEntity])
		})

		return [
			{ entity: AEntity, id: 'AEntity', metadata: {} },
			{ entity: ParentEntity, id: 'ParentEntity', metadata: {} }
		]
	}

	it('should render simple class diagram with fields and methods', () => {
		// given
		const entities = givenASimpleEntity()

		// when
		const result = entity2diagram(entities)

		// then
		assert.match(result, /AEntity/)
		assert.match(result, /Number id/)
		assert.match(result, /String stringTest/)
		assert.match(result, /Boolean booleanTest/)
		assert.match(result, /isExample()/)
	})

	it('should render a class diagram with relationship one to many', () => {
		// given
		const entities = givenAComplexEntity()

		// when
		const result = entity2diagram(entities)

		// then
		assert.match(result, /AEntity/)
		assert.match(result, /ParentEntity/)
		assert.match(result, /AEntity "1" <|-- "*" ParentEntity/)
	})

	it('should render a class diagram with relationship one to one', () => {
		// given
		const entities = givenAComplexEntity()

		// when
		const result = entity2diagram(entities)

		// then
		assert.match(result, /AEntity/)
		assert.match(result, /ParentEntity/)
		assert.match(result, /AEntity "1" <|-- "1" ParentEntity/)
	})
	

	it('should return null if not given entity', () => {
		// given
		const entities = null

		// when
		const result = entity2diagram(entities)

		// then
		assert.equal(result, null)
	})
})