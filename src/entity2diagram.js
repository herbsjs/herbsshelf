const { checker } = require("@herbsjs/herbs")

function entity2diagram(entities) {
    let classDiagram = `classDiagram
        ${createClasses(entities)}
        ${createRelationship(entities)}
    `
    return classDiagram
}

function createClasses(entities) {
    const classes = entities.reduce((ac, value) => [...ac, entity2class(value)], [])
    return classes.join('')
}

function createRelationship(entities) {
    let relationShip = ""
    entities.forEach(element => relationShip += hasRelationShip(element))
    return relationShip
}

function hasRelationShip({ entity, id }) {
    const definition = Object
        .entries(entity.prototype.meta.schema)
        .filter(([_, def]) => !checker.isFunction(def) && (isEntity(def.type) || isArrayOfEntities(def.type)))
        .map(([_, def]) => `${id} <|-- ${getEntityName(def.type)}`)
        .join('\\n')
    return definition
}

function entity2fields(schema) {
    const definition = Object
        .entries(schema)
        .filter(([_, def]) => !checker.isFunction(def))
        .map(([name, def]) => `+${fieldType(def.type)} ${name}`)
        .join("\\n")
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

function getEntityName(type) {
    if (isArrayOfEntities(type)) {
        return type[0].name
    }

    return type.name
}

function fieldType(type) {
    if (isArrayOfEntities(type)) {
        return `${type[0].name}[]`
    }

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

function entity2class({ entity, id, metadata }) {
    return `
            class ${id}{
                ${entity2fields(entity.prototype.meta.schema)}
                ${entity2methods(entity.prototype.meta.schema)}                
            }
        `
}

module.exports = entity2diagram