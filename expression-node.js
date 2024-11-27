import ExpressionRange from "./expression-range.js"

export default class ExpressionNode
{
    static mergeProduction(leftExpression, rightExpression)
    {
        return new ExpressionNode(leftExpression, rightExpression)
    }

    static composeProduction(leftExpression, rightExpression)
    {
        return new ExpressionNode(rightExpression, leftExpression)
    }

    constructor(leftExpression, rightExpression)
    {
        this.leftExpression = leftExpression

        this.rightExpression = rightExpression
    }

    getRule(expressionValue)
    {
        return this.leftExpression.getRule(expressionValue++) || this.rightExpression.getRule(expressionValue++)
    }

    invertRule(expressionValue)
    {
        return this.leftExpression.invertRule(expressionValue++) || this.rightExpression.invertRule(expressionValue++)
    }

    equalTo(expressionNode)
    {
        return this.leftExpression.equalTo(expressionNode.leftExpression) && this.rightExpression.equalTo(expressionNode.rightExpression)
    }

    compareTo(expressionNode)
    {
        return this.leftExpression.compareTo(expressionNode.leftExpression) || this.rightExpression.compareTo(expressionNode.rightExpression)
    }

    getDerivation(expressionRange)
    {
        return ExpressionNode.mergeProduction(this.leftExpression.getDerivation(expressionRange), this.rightExpression.getDerivation(expressionRange))
    }

    getPartition(expressionRange)
    {
        return ExpressionRange.mergeCollection(this.leftExpression.getPartition(expressionRange), this.rightExpression.getPartition(expressionRange))
    }
}
