const { checker } = require("@herbsjs/herbs")

function isIfElseStep(step) {
    return step.type === 'if else'
}

function isFirstStep(index) {
    return index === 0
}

function isMultipleSteps(step) {
    return (step.type === 'step' && !checker.isFunction(step._body) && checker.isObject(step._body))
}

function firstStep(array) {
    return array[0]
}

function lastStep(array) {
    return array[array.length - 1]
}

module.exports = {
    isIfElseStep,
    isFirstStep,
    isMultipleSteps,
    firstStep,
    lastStep
}
