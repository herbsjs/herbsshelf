class StepsRelationship {
    constructor(usecase) {
        this.usecase = usecase
        this.steps = Object.entries(usecase._mainStep._body)
        this.relationship = []
    }

    stepsRelationship(chartSteps) {
        for (let index = 1; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            const previousStepInfo = this.steps[index - 1]

            // eslint-disable-next-line no-unused-vars
            const [stepDescription] = stepInfo
            const [previousStepDescription] = previousStepInfo

            const stepId = chartSteps.find(chartStep => chartStep.description === stepDescription).id
            const previousStepId = chartSteps.find(chartStep => chartStep.description === previousStepDescription).id

            this.relationship.push(`${previousStepId} --> ${stepId}`)
        }
    }


    getRelationshipString() {
        return this.relationship
            .map(relation => `
                ${relation}`)
            .join("")
    }
}
exports.StepsRelationship = StepsRelationship
