const { isIfElseStep, isFirstStep, isMultipleSteps, firstStep, lastStep } = require("../helpers/stepsHelper")
const crypto = require('crypto')

class StepsRelationship {
    constructor(steps) {
        this.steps = steps
        this.relationship = []
    }

    stepsRelationship(chartSteps, type, graphId) {

        for (let index = 0; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            const [stepDescription, step] = stepInfo
            const stepId = chartSteps.find(chartStep => chartStep.description === stepDescription).id

            if (isIfElseStep(step)) {
                const ifSteps = Object.entries(step._body)
                const stepRelationship = new StepsRelationship(ifSteps)
                stepRelationship.stepsIfElseRelationship(stepId, chartSteps)
                this.relationship = this.relationship.concat(stepRelationship.getRelationship())
            }

            if (this.hasOnlyOneStep()) return
            if (isFirstStep(index)) continue

            const previousStepInfo = this.steps[index - 1]
            const [previousStepDescription, previousStep] = previousStepInfo

            if (isIfElseStep(previousStep)) {
                // eslint-disable-next-line no-unused-vars
                const [_, thenStep, elseStep] = Object.keys(previousStep._body)

                const thenStepId = chartSteps.find(chartStep => chartStep.description === thenStep).id
                const elseStepId = chartSteps.find(chartStep => chartStep.description === elseStep).id

                this.relationship.push({ type: type || step.type, definition: `${thenStepId} --> ${stepId}` })
                this.relationship.push({ type: type || step.type, definition: `${elseStepId} --> ${stepId}` })

                continue
            }


            if (isMultipleSteps(step)) {
                const subGraphId = crypto.randomUUID()
                const multipleSteps = Object.entries(step._body)
                const stepRelationship = new StepsRelationship(multipleSteps)
                stepRelationship.stepsRelationship(chartSteps, 'multiple steps', subGraphId)
                const stepRelations = stepRelationship.getRelationship()

                const multipeStepsDefinitions = Object.keys(step._body)

                const firstStepInfo = firstStep(multipeStepsDefinitions)
                const lastStepInfo = lastStep(multipeStepsDefinitions)

                const firstStepId = chartSteps.find(chartStep => chartStep.description === firstStepInfo).id
                const lastStepId = chartSteps.find(chartStep => chartStep.description === lastStepInfo).id

                this.relationship.push({ type: 'steps', definition: `${stepId} --> |Multi-level Steps| ${firstStepId}`, graphId: subGraphId })
                this.relationship = this.relationship.concat(stepRelations)

                if (!this.isLastStep(index)) {
                    const nextStepInfo = this.steps[index + 1]
                    const [nextStepDescription, _] = nextStepInfo
                    const nextStepId = chartSteps.find(chartStep => chartStep.description === nextStepDescription).id
                    this.relationship.push({ type: 'steps', definition: `${lastStepId} --> ${nextStepId}` })
                }

            }

            if (!isMultipleSteps(previousStep)) {
                const previousStepId = chartSteps.find(chartStep => chartStep.description === previousStepDescription).id
                this.relationship.push({ type: type || step.type, definition: `${previousStepId} --> ${stepId}`, graphId })
            }
        }
    }

    isLastStep(index) {
        return (this.steps.length - 1) === index
    }

    hasOnlyOneStep() {
        return this.steps.length === 1
    }


    stepsIfElseRelationship(rootStepId, chartSteps) {
        const ifElseCharts = chartSteps.filter(chartStep => chartStep.parentId === rootStepId)
        const [ifStep, thenStep, elseStep] = ifElseCharts

        this.relationship.push({ type: 'if else', definition: `${rootStepId} --> |If| ${ifStep.id}` })
        this.relationship.push({ type: 'if else', definition: `${ifStep.id} --> |Then| ${thenStep.id}` })
        this.relationship.push({ type: 'if else', definition: `${ifStep.id} --> |Else| ${elseStep.id}` })
    }

    getRelationship() {
        return this.relationship
    }


    getRelationshipString() {
        return this.relationship
            .filter(relation => relation.type !== 'multiple steps')
            .map(relation => `
                ${relation.definition}`)
            .join("")
    }

    getMultistepsRelationshipString() {
        const graphIds = [...new Set(this.relationship.map(relation => relation.graphId))]
        const subGraphs = []

        for (let index = 0; index < graphIds.length; index++) {
            const graphId = graphIds[index]

            if (!graphId) continue

            const definition = this.relationship
                .filter(relation => relation.type == 'multiple steps' && relation.graphId === graphId)
                .map(relation => `
                ${relation.definition}`)
                .join("")

            const graphDefinition = `subgraph ${graphId} [ ]
                ${definition}
            end
            `

            subGraphs.push(graphDefinition)

        }

        return subGraphs.join("")

    }
}
exports.StepsRelationship = StepsRelationship
