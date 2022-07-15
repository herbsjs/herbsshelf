const crypto = require('crypto')

class Steps2Diagram {
    constructor(usecase) {
        this.usecase = usecase
        this.steps = Object.entries(usecase._mainStep._body)
        this.chartSteps = []
    }
    steps2FlowChart(rootChartExpression, chartExpression) {
        for (let index = 0; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            // eslint-disable-next-line no-unused-vars
            const [_, step] = stepInfo

            if (index === 0)
                this.addChartStep(step, rootChartExpression)
            else
                this.addChartStep(step, chartExpression)
        }

        // return `
        //     A([Update User Account])
        //     B(Validate given User Account information)
        //     C(Is User expired?)
        //     D{If User is expired}
        //     E(Then Activate User)
        //     F(Else Do nothing)
        //     G(Save User Account)
        // `
    }

    addChartStep(step, expression) {
        const id = crypto.randomUUID()
        const [expressionOpen, expressionClose] = expression.split("*")
        
        this.chartSteps.push({
            id,
            description: step.description,
            definition: `${id}${expressionOpen}${step.description}${expressionClose}`
        })
    }

    getClassDiagramString() {
        return this.chartSteps
            .map(chartStep => `
            ${chartStep.definition}`)
            .join("")
    }

    getChartSteps() {
        return this.chartSteps
    }
}
exports.Steps2Diagram = Steps2Diagram
