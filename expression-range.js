export default class ExpressionRange
{
    static mergeCollection(leftExpressions, rightExpressions)
    {
        return leftExpressions.flatMap(leftExpression => rightExpressions.flatMap(rightExpression => leftExpression.leftExpression > rightExpression.rightExpression || leftExpression.rightExpression < rightExpression.leftExpression ? [] : [new ExpressionRange(leftExpression.leftExpression < rightExpression.leftExpression ? rightExpression.leftExpression : leftExpression.leftExpression, leftExpression.rightExpression > rightExpression.rightExpression ? rightExpression.rightExpression : leftExpression.rightExpression)]))
    }

    static validateCollection(leftExpressions)
    {
        return leftExpressions.flatMap(leftExpression => leftExpression.leftExpression > leftExpression.rightExpression ? [] : [new ExpressionRange(leftExpression.leftExpression, leftExpression.rightExpression)])
    }

    constructor(leftExpression, rightExpression)
    {
        this.leftExpression = leftExpression

        this.rightExpression = rightExpression
    }

    get leftExpressionRange()
    {
        return expressionRange => new ExpressionRange(expressionRange.leftExpression, this.leftExpression !== expressionRange.leftExpression ? this.leftExpression - 1 : expressionRange.leftExpression)
    }

    get rightExpressionRange()
    {
        return expressionRange => new ExpressionRange(expressionRange.rightExpression === this.rightExpression ? expressionRange.rightExpression : this.rightExpression + 1, expressionRange.rightExpression)
    }

    includesValue(expressionByte)
    {
        return this.leftExpression <= expressionByte && this.rightExpression >= expressionByte
    }

    excludesValue(expressionByte)
    {
        return this.leftExpression > expressionByte || this.rightExpression < expressionByte
    }

    intersectsWith(expressionRange)
    {
        return this.leftExpression <= expressionRange.leftExpression && this.rightExpression >= expressionRange.rightExpression
    }

    overlapsWith(expressionRange)
    {
        return this.leftExpression <= expressionRange.rightExpression && this.rightExpression >= expressionRange.leftExpression
    }

    equalTo(expressionRange)
    {
        return this.leftExpression === expressionRange.leftExpression && this.rightExpression === expressionRange.rightExpression
    }

    compareTo(expressionRange)
    {
        return this.leftExpression - expressionRange.leftExpression || this.rightExpression - expressionRange.rightExpression
    }

    getInversion(expressionRange)
    {
        return this.leftExpression <= expressionRange.leftExpression || this.rightExpression >= expressionRange.rightExpression ? this.leftExpression <= expressionRange.leftExpression ? this.rightExpression >= expressionRange.rightExpression ? [] : [this.rightExpressionRange(expressionRange)] : [this.leftExpressionRange(expressionRange)] : [this.leftExpressionRange(expressionRange), this.rightExpressionRange(expressionRange)]
    }

    getPartition(expressionRange)
    {
        return this.leftExpression <= expressionRange.leftExpression || this.rightExpression >= expressionRange.rightExpression ? this.leftExpression <= expressionRange.leftExpression ? this.rightExpression >= expressionRange.rightExpression ? [this] : [this, this.rightExpressionRange(expressionRange)] : [this, this.leftExpressionRange(expressionRange)] : [this, this.leftExpressionRange(expressionRange), this.rightExpressionRange(expressionRange)]
    }
}
