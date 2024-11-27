export default class ExpressionType
{
    static alternationType = new ExpressionType(1 << 0)

    static intersectionType = new ExpressionType(1 << 1)

    static concatenationType = new ExpressionType(1 << 2)

    static quantificationType = new ExpressionType(1 << 3)

    static complementationType = new ExpressionType(1 << 4)

    static interpretationType = new ExpressionType(1 << 5)

    static representationType = new ExpressionType(1 << 6)

    static substitutionType = new ExpressionType(1 << 7)

    static derivationType = new ExpressionType(1 << 8)

    static terminationType = new ExpressionType(1 << 9)

    constructor(expressionValue)
    {
        this.expressionValue = expressionValue
    }

    getRule(expressionValue)
    {
        return this.expressionValue === ExpressionType.quantificationType.expressionValue || this.expressionValue === ExpressionType.representationType.expressionValue || this.expressionValue === ExpressionType.derivationType.expressionValue ? expressionValue : expressionValue - expressionValue
    }

    invertRule(expressionValue)
    {
        return this.expressionValue === ExpressionType.quantificationType.expressionValue || this.expressionValue === ExpressionType.representationType.expressionValue || this.expressionValue === ExpressionType.derivationType.expressionValue ? expressionValue - expressionValue : expressionValue
    }

    equalTo(expressionType)
    {
        return this.expressionValue === expressionType.expressionValue
    }

    compareTo(expressionType)
    {
        return this.expressionValue - expressionType.expressionValue
    }
}
