const crypto = require('crypto')

class Steps2Diagram {
    constructor(steps) {
        this.steps = steps
        this.chartSteps = []
    }
    steps2FlowChart(rootChartExpression, chartExpression, type = 'step') {
        for (let index = 0; index < this.steps.length; index++) {
            const stepInfo = this.steps[index]
            // eslint-disable-next-line no-unused-vars
            const [_, step] = stepInfo

            if (index === 0) this.addChartStep(step, rootChartExpression, type)
            else this.addChartStep(step, chartExpression, type)

            if (step.type === 'if else') {
                const ifSteps = Object.entries(step._body)
                const step2diagram = new Steps2Diagram(ifSteps)
                step2diagram.steps2FlowChart(`{*}`, `(*)`, 'if else')
                this.chartSteps = this.chartSteps.concat(step2diagram.getChartSteps())
            }            
        }
    }

    addChartStep(step, expression, type) {
        const id = crypto.randomUUID()
        const [expressionOpen, expressionClose] = expression.split("*")

        this.chartSteps.push({
            id,
            type,
            description: step.description,
            definition: `${id}${expressionOpen}${step.description}${expressionClose}`,
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
