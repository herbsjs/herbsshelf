class StepsRelationship {
    constructor(steps) {
        this.steps = steps
        this.relationship = []
    }

    stepsRelationship(chartSteps) {
        for (let index = 1; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            const previousStepInfo = this.steps[index - 1]

            // eslint-disable-next-line no-unused-vars
            const [stepDescription, step] = stepInfo
            const [previousStepDescription] = previousStepInfo
            const stepId = chartSteps.find(chartStep => chartStep.description === stepDescription).id

            if (step.type === 'if else') {
                const ifSteps = Object.entries(step._body)
                const stepRelationship = new StepsRelationship(ifSteps)
                stepRelationship.stepsIfElseRelationship(stepId, chartSteps)
                this.relationship = this.relationship.concat(stepRelationship.getRelationship())
            }

            const previousStepId = chartSteps.find(chartStep => chartStep.description === previousStepDescription).id
            this.relationship.push({ type: step.type, definition: `${previousStepId} --> ${stepId}` })

        }
    }

    stepsIfElseRelationship(rootStepId, chartSteps) {
        const ifElseCharts = chartSteps.filter(chartStep => chartStep.type === 'if else')
        const [ifStep, thenStep, elseStep] = ifElseCharts

        this.relationship.push({ type: 'if else', definition: `${rootStepId} --> ${ifStep.id}` })
        this.relationship.push({ type: 'if else', definition: `${ifStep.id} --> ${thenStep.id}` })
        this.relationship.push({ type: 'if else', definition: `${ifStep.id} --> ${elseStep.id}` })
    }

    getRelationship() {
        return this.relationship
    }


    getRelationshipString() {
        return this.relationship
            .map(relation => `
                ${relation.definition}`)
            .join("")
    }
}
exports.StepsRelationship = StepsRelationship
