const { checker } = require("@herbsjs/herbs")

function entity2diagram(entities) {
    if (checker.isEmpty(entities)) return null

    let classDiagram = `classDiagram
        ${createClasses(entities)}
        ${createRelationship(entities)}
    `

    return classDiagram
}

function entity2class(entities, { entity, id }) {
    return `
            class ${id}{
                ${entity2fields(entities, entity.prototype.meta.schema)}
                ${entity2methods(entity.prototype.meta.schema)}                
            }
        `
}

function createClasses(entities) {
    const classes = entities.reduce((ac, value) => [...ac, entity2class(entities, value)], [])
    return classes.join('')
}

function createRelationship(entities) {
    const relations = entities.map(element => getRelationShip(entities, element))
    const distinctReletions = Array.from(new Set([...relations]))
    return distinctReletions.join('')
}

function getRelationShip(entities, { entity, id }) {
    const definition = Object
        .entries(entity.prototype.meta.schema)
        .filter(([_, def]) => !checker.isFunction(def) && (isEntity(def.type) || isArrayOfEntities(def.type)))
        .map(([_, def]) => `
            ${id} "1" <|-- ${getRelationType(entities, def.type)}`)

    const distinctDefinitions = Array.from(new Set([...definition]))
    return distinctDefinitions.join('')
}

function findEntityIdByName(entities, name) {
    const entity = entities.find(definition => definition.entity.name === name)
    if (!entity) throw new Error(`Entity ${name} not found on given source`)
    return entity.id
}

function entity2fields(entities, schema) {
    const definition = Object
        .entries(schema)
        .filter(([_, def]) => !checker.isFunction(def))
        .map(([name, def]) => `
            +${fieldTypeDescription(entities, def.type)} ${name}`)
        .join('')
    return definition
}

function entity2methods(schema) {
    const definition = Object
        .entries(schema)
        .filter(([_, def]) => checker.isFunction(def))
        .map(([name, _]) => `+${name}()`)
        .join("\\n")
    return definition
}

function getRelationType(entities, type) {
    if (isArrayOfEntities(type)) {
        return `"*" ${findEntityIdByName(entities, type[0].name)}`
    }

    return `"1" ${findEntityIdByName(entities, type.name)}`

}

function fieldTypeDescription(entities, type) {
    if (isArrayOfEntities(type)) {
        return `${findEntityIdByName(entities, type[0].name)}[]`
    }

    if (isEntity(type))
        return findEntityIdByName(entities, type.name)

    if (Array.isArray(type)) {
        return `${type.name}[]`
    }

    return type.name
}

function isArrayOfEntities(type) {
    return Array.isArray(type) && type[0] && isEntity(type[0])
}

function isEntity(entity) {
    return entity &&
        !Array.isArray(entity) &&
        entity.prototype.meta?.name
}

module.exports = entity2diagram