const { checker } = require("@herbsjs/herbs")
const { Steps2Diagram } = require("./steps2Diagram")
const { StepsRelationship } = require("./stepsRelationship")

class Usecase2Diagram {
    constructor({ id, usecase }) {
        if (checker.isEmpty(usecase) || checker.isEmpty(id)) throw new Error("Usecase2Diagram: id and usecase are required")
        this.id = id
        this.usecase = usecase

    }

    getFlowChart() {
        const definition = this.usecase2FlowChart()
        return { id: this.id, definition }
    }

    usecase2FlowChart() {

        const steps = Object.entries(this.usecase._mainStep._body)
        const step2diagram = new Steps2Diagram(steps)
        const stepRelationship = new StepsRelationship(steps)

        step2diagram.steps2FlowChart(`([*])`, `(*)`)
        stepRelationship.stepsRelationship(step2diagram.getChartSteps())

        let flowChat = `graph TD
            ${step2diagram.getClassDiagramString()}           
            ${stepRelationship.getRelationshipString()}         
        `
        return flowChat
    }
}

module.exports = (usecases) => {
    const toDiagram = (usecase) => 
        new Usecase2Diagram(usecase)
        .getFlowChart()

    const usecasesFlowChart = usecases.filter(element => element.id === 'UpdateItem').map(toDiagram)
    return usecasesFlowChart[0].definition
}