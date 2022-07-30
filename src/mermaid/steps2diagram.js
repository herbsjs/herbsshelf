const crypto = require('crypto')
const { isIfElseStep, isMultipleSteps } = require('../helpers/stepsHelper')

class Steps2Diagram {
    constructor(steps) {
        this.steps = steps
        this.chartSteps = []
    }
    steps2FlowChart(rootChartExpression, chartExpression, type = 'step', parentId = null) {
        for (let index = 0; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            // eslint-disable-next-line no-unused-vars
            const [_, step] = stepInfo
            let stepId = null

            if (index === 0) stepId = this.addChartStep(step, rootChartExpression, type, parentId)
            else stepId = this.addChartStep(step, chartExpression, type, parentId)

            if (isIfElseStep(step)) {
                const ifSteps = Object.entries(step._body)
                const step2diagram = new Steps2Diagram(ifSteps)
                step2diagram.steps2FlowChart(`{*}`, `(*)`, 'if else', stepId)
                this.chartSteps = this.chartSteps.concat(step2diagram.getChartSteps())
            }

            if (isMultipleSteps(step)) {
                const multipleSteps = Object.entries(step._body)
                const step2diagram = new Steps2Diagram(multipleSteps)
                step2diagram.steps2FlowChart(`[[*]]`, `[[*]]`, 'multiple steps', stepId)
                this.chartSteps = this.chartSteps.concat(step2diagram.getChartSteps())
            }
        }
    }

    addChartStep(step, expression, type, parentId) {
        const id = crypto.randomUUID()
        const [expressionOpen, expressionClose] = expression.split("*")

        this.chartSteps.push({
            id,
            type,
            parentId,
            description: step.description,
            definition: `${id}${expressionOpen}${step.description}${expressionClose}`,
        })
        return id
    }

    getClassDiagramString() {
        return this.getChartSteps()
            .map(chartStep => `
                ${chartStep.definition}`)
            .join("")
    }

    getChartSteps() {
        return this.chartSteps
    }
}
exports.Steps2Diagram = Steps2Diagram
