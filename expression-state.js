import ExpressionQueue from "./expression-queue.js"

export default class ExpressionState
{
    static createDestination(expressionNode, expressionValue)
    {
        return new ExpressionState(expressionNode, expressionValue, ExpressionQueue.expressionBytes.map(expressionByte => void expressionByte))
    }

    constructor(expressionNode, expressionValue, expressionTable)
    {
        this.expressionNode = expressionNode

        this.expressionValue = expressionValue

        this.expressionTable = expressionTable
    }

    toString()
    {
        return this.expressionValue.toString()
    }

    valueOf()
    {
        return this.expressionValue.valueOf()
    }

    getRule(expressionValue = 0)
    {
        return this.expressionNode.getRule(expressionValue)
    }

    invertRule(expressionValue = 0)
    {
        return this.expressionNode.invertRule(expressionValue)
    }

    equalTo(expressionNode)
    {
        return this.expressionNode.equalTo(expressionNode)
    }

    compareTo(expressionNode)
    {
        return this.expressionNode.compareTo(expressionNode)
    }

    getDerivation(expressionRange)
    {
        return this.expressionNode.getDerivation(expressionRange)
    }

    getPartition(expressionRange)
    {
        return this.expressionNode.getPartition(expressionRange)
    }

    getRoute(expressionByte)
    {
        return this.expressionTable.at(expressionByte)
    }

    setRoute(expressionByte, expressionState)
    {
        return this.expressionTable.splice(expressionByte, 1, expressionState)
    }
}
