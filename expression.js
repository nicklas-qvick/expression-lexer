import ExpressionRange from "./expression-range.js"
import ExpressionType from "./expression-type.js"

export default class Expression
{
    static createAlternation(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.alternationType && rightExpression.expressionType === ExpressionType.alternationType)
        {
            if(leftExpression.leftExpression.compareTo(rightExpression.leftExpression) < 0)
            {
                return Expression.createAlternationType(leftExpression.leftExpression, Expression.createAlternation(rightExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            if(leftExpression.leftExpression.compareTo(rightExpression.leftExpression) > 0)
            {
                return Expression.createAlternationType(rightExpression.leftExpression, Expression.createAlternation(leftExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            return Expression.createAlternationType(leftExpression.leftExpression, Expression.createAlternation(leftExpression.rightExpression, rightExpression.rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.alternationType && rightExpression.expressionType !== ExpressionType.alternationType)
        {
            if(leftExpression.leftExpression.compareTo(rightExpression) < 0)
            {
                return Expression.createAlternationType(leftExpression.leftExpression, Expression.createAlternation(rightExpression, leftExpression.rightExpression))
            }

            if(leftExpression.leftExpression.compareTo(rightExpression) > 0)
            {
                return Expression.createAlternationType(rightExpression, Expression.createAlternation(leftExpression.leftExpression, leftExpression.rightExpression))
            }

            return Expression.createAlternationType(leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.alternationType && rightExpression.expressionType === ExpressionType.alternationType)
        {
            if(rightExpression.leftExpression.compareTo(leftExpression) < 0)
            {
                return Expression.createAlternationType(rightExpression.leftExpression, Expression.createAlternation(leftExpression, rightExpression.rightExpression))
            }

            if(rightExpression.leftExpression.compareTo(leftExpression) > 0)
            {
                return Expression.createAlternationType(leftExpression, Expression.createAlternation(rightExpression.leftExpression, rightExpression.rightExpression))
            }

            return Expression.createAlternationType(rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.alternationType && rightExpression.expressionType !== ExpressionType.alternationType)
        {
            if(rightExpression.compareTo(leftExpression) < 0)
            {
                return Expression.createAlternationType(rightExpression, leftExpression)
            }

            if(rightExpression.compareTo(leftExpression) > 0)
            {
                return Expression.createAlternationType(leftExpression, rightExpression)
            }

            return Expression.createAlternationType(leftExpression, Expression.createTermination())
        }

        return Expression.createAlternationType(leftExpression, rightExpression)
    }

    static createIntersection(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.intersectionType && rightExpression.expressionType === ExpressionType.intersectionType)
        {
            if(leftExpression.leftExpression.compareTo(rightExpression.leftExpression) < 0)
            {
                return Expression.createIntersectionType(leftExpression.leftExpression, Expression.createIntersection(rightExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            if(leftExpression.leftExpression.compareTo(rightExpression.leftExpression) > 0)
            {
                return Expression.createIntersectionType(rightExpression.leftExpression, Expression.createIntersection(leftExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression)))
            }

            return Expression.createIntersectionType(leftExpression.leftExpression, Expression.createIntersection(leftExpression.rightExpression, rightExpression.rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.intersectionType && rightExpression.expressionType !== ExpressionType.intersectionType)
        {
            if(leftExpression.leftExpression.compareTo(rightExpression) < 0)
            {
                return Expression.createIntersectionType(leftExpression.leftExpression, Expression.createIntersection(rightExpression, leftExpression.rightExpression))
            }

            if(leftExpression.leftExpression.compareTo(rightExpression) > 0)
            {
                return Expression.createIntersectionType(rightExpression, Expression.createIntersection(leftExpression.leftExpression, leftExpression.rightExpression))
            }

            return Expression.createIntersectionType(leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.intersectionType && rightExpression.expressionType === ExpressionType.intersectionType)
        {
            if(rightExpression.leftExpression.compareTo(leftExpression) < 0)
            {
                return Expression.createIntersectionType(rightExpression.leftExpression, Expression.createIntersection(leftExpression, rightExpression.rightExpression))
            }

            if(rightExpression.leftExpression.compareTo(leftExpression) > 0)
            {
                return Expression.createIntersectionType(leftExpression, Expression.createIntersection(rightExpression.leftExpression, rightExpression.rightExpression))
            }

            return Expression.createIntersectionType(rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType !== ExpressionType.intersectionType && rightExpression.expressionType !== ExpressionType.intersectionType)
        {
            if(rightExpression.compareTo(leftExpression) < 0)
            {
                return Expression.createIntersectionType(rightExpression, leftExpression)
            }

            if(rightExpression.compareTo(leftExpression) > 0)
            {
                return Expression.createIntersectionType(leftExpression, rightExpression)
            }

            return Expression.createIntersectionType(leftExpression, Expression.createRepresentation())
        }

        return Expression.createIntersectionType(leftExpression, rightExpression)
    }

    static createConcatenation(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.concatenationType && rightExpression.expressionType === ExpressionType.concatenationType)
        {
            return Expression.createConcatenationType(leftExpression.leftExpression, Expression.createConcatenation(leftExpression.rightExpression, rightExpression))
        }

        if(leftExpression.expressionType === ExpressionType.concatenationType && rightExpression.expressionType !== ExpressionType.concatenationType)
        {
            return Expression.createConcatenationType(leftExpression.leftExpression, Expression.createConcatenation(leftExpression.rightExpression, rightExpression))
        }

        return Expression.createConcatenationType(leftExpression, rightExpression)
    }

    static createQuantification(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationType)
        {
            return Expression.createDerivationType()
        }

        if(leftExpression.expressionType === ExpressionType.derivationType)
        {
            return Expression.createDerivationType()
        }

        if(leftExpression.expressionType === ExpressionType.substitutionType)
        {
            return Expression.createRepresentationType()
        }

        if(leftExpression.expressionType === ExpressionType.representationType)
        {
            return Expression.createRepresentationType()
        }

        return Expression.createQuantificationType(leftExpression)
    }

    static createComplementation(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationType)
        {
            return Expression.createRepresentationType()
        }

        if(leftExpression.expressionType === ExpressionType.representationType)
        {
            return Expression.createTerminationType()
        }

        return Expression.createComplementationType(leftExpression)
    }

    static createInterpretation(leftExpression)
    {
        return Expression.createInterpretationType(leftExpression)
    }

    static createRepresentation()
    {
        return Expression.createRepresentationType()
    }

    static createSubstitution()
    {
        return Expression.createSubstitutionType()
    }

    static createDerivation()
    {
        return Expression.createDerivationType()
    }

    static createTermination()
    {
        return Expression.createTerminationType()
    }

    static createAlternationType(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.representationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        return new Expression(ExpressionType.alternationType, leftExpression, rightExpression)
    }

    static createIntersectionType(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.representationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.representationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.intersectionType, leftExpression, rightExpression)
    }

    static createConcatenationType(leftExpression, rightExpression)
    {
        if(leftExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.terminationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(leftExpression.expressionType === ExpressionType.derivationType)
        {
            return new Expression(rightExpression.expressionType, rightExpression.leftExpression, rightExpression.rightExpression)
        }

        if(rightExpression.expressionType === ExpressionType.derivationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.concatenationType, leftExpression, rightExpression)
    }

    static createQuantificationType(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.quantificationType)
        {
            return new Expression(leftExpression.expressionType, leftExpression.leftExpression, leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.quantificationType, leftExpression)
    }

    static createComplementationType(leftExpression)
    {
        if(leftExpression.expressionType === ExpressionType.complementationType)
        {
            return new Expression(leftExpression.leftExpression.expressionType, leftExpression.leftExpression.leftExpression, leftExpression.leftExpression.rightExpression)
        }

        return new Expression(ExpressionType.complementationType, leftExpression)
    }

    static createInterpretationType(leftExpression)
    {
        return new Expression(ExpressionType.interpretationType, leftExpression)
    }

    static createRepresentationType()
    {
        return new Expression(ExpressionType.representationType)
    }

    static createSubstitutionType()
    {
        return new Expression(ExpressionType.substitutionType)
    }

    static createDerivationType()
    {
        return new Expression(ExpressionType.derivationType)
    }

    static createTerminationType()
    {
        return new Expression(ExpressionType.terminationType)
    }

    constructor(expressionType, leftExpression, rightExpression)
    {
        this.expressionType = expressionType

        this.leftExpression = leftExpression

        this.rightExpression = rightExpression
    }

    getRule(expressionValue)
    {
        if(this.expressionType === ExpressionType.alternationType)
        {
            return this.leftExpression.getRule(expressionValue) || this.rightExpression.getRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.intersectionType)
        {
            return this.leftExpression.getRule(expressionValue) && this.rightExpression.getRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.concatenationType)
        {
            return this.leftExpression.getRule(expressionValue) && this.rightExpression.getRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.complementationType)
        {
            return this.leftExpression.invertRule(expressionValue)
        }

        return this.expressionType.getRule(expressionValue)
    }

    invertRule(expressionValue)
    {
        if(this.expressionType === ExpressionType.alternationType)
        {
            return this.leftExpression.invertRule(expressionValue) || this.rightExpression.invertRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.intersectionType)
        {
            return this.leftExpression.invertRule(expressionValue) && this.rightExpression.invertRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.concatenationType)
        {
            return this.leftExpression.invertRule(expressionValue) && this.rightExpression.invertRule(expressionValue)
        }

        if(this.expressionType === ExpressionType.complementationType)
        {
            return this.leftExpression.getRule(expressionValue)
        }

        return this.expressionType.invertRule(expressionValue)
    }

    equalTo(expressionRule)
    {
        if(this.expressionType === ExpressionType.alternationType && expressionRule.expressionType === ExpressionType.alternationType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression) && this.rightExpression.equalTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.intersectionType && expressionRule.expressionType === ExpressionType.intersectionType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression) && this.rightExpression.equalTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.concatenationType && expressionRule.expressionType === ExpressionType.concatenationType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression) && this.rightExpression.equalTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.quantificationType && expressionRule.expressionType === ExpressionType.quantificationType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression)
        }

        if(this.expressionType === ExpressionType.complementationType && expressionRule.expressionType === ExpressionType.complementationType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression)
        }

        if(this.expressionType === ExpressionType.interpretationType && expressionRule.expressionType === ExpressionType.interpretationType)
        {
            return this.leftExpression.equalTo(expressionRule.leftExpression)
        }

        return this.expressionType.equalTo(expressionRule.expressionType)
    }

    compareTo(expressionRule)
    {
        if(this.expressionType === ExpressionType.alternationType && expressionRule.expressionType === ExpressionType.alternationType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression) || this.rightExpression.compareTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.intersectionType && expressionRule.expressionType === ExpressionType.intersectionType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression) || this.rightExpression.compareTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.concatenationType && expressionRule.expressionType === ExpressionType.concatenationType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression) || this.rightExpression.compareTo(expressionRule.rightExpression)
        }

        if(this.expressionType === ExpressionType.quantificationType && expressionRule.expressionType === ExpressionType.quantificationType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression)
        }

        if(this.expressionType === ExpressionType.complementationType && expressionRule.expressionType === ExpressionType.complementationType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression)
        }

        if(this.expressionType === ExpressionType.interpretationType && expressionRule.expressionType === ExpressionType.interpretationType)
        {
            return this.leftExpression.compareTo(expressionRule.leftExpression)
        }

        return this.expressionType.compareTo(expressionRule.expressionType)
    }

    getDerivation(expressionRange)
    {
        if(this.expressionType === ExpressionType.alternationType)
        {
            return Expression.createAlternation(this.leftExpression.getDerivation(expressionRange), this.rightExpression.getDerivation(expressionRange))
        }

        if(this.expressionType === ExpressionType.intersectionType)
        {
            return Expression.createIntersection(this.leftExpression.getDerivation(expressionRange), this.rightExpression.getDerivation(expressionRange))
        }

        if(this.expressionType === ExpressionType.concatenationType)
        {
            if(this.leftExpression.getRule())
            {
                return Expression.createAlternation(this.rightExpression.getDerivation(expressionRange), Expression.createConcatenation(this.leftExpression.getDerivation(expressionRange), this.rightExpression))
            }
            else
            {
                return Expression.createConcatenation(this.leftExpression.getDerivation(expressionRange), this.rightExpression)
            }
        }

        if(this.expressionType === ExpressionType.quantificationType)
        {
            return Expression.createConcatenation(this.leftExpression.getDerivation(expressionRange), this)
        }

        if(this.expressionType === ExpressionType.complementationType)
        {
            return Expression.createComplementation(this.leftExpression.getDerivation(expressionRange))
        }

        if(this.expressionType === ExpressionType.interpretationType)
        {
            if(this.leftExpression.overlapsWith(expressionRange))
            {
                return Expression.createDerivation()
            }
            else
            {
                return Expression.createTermination()
            }
        }

        if(this.expressionType === ExpressionType.representationType)
        {
            return Expression.createRepresentation()
        }

        if(this.expressionType === ExpressionType.substitutionType)
        {
            return Expression.createDerivation()
        }

        return Expression.createTermination()
    }

    getPartition(expressionRange)
    {
        if(this.expressionType === ExpressionType.alternationType)
        {
            return ExpressionRange.mergeCollection(this.leftExpression.getPartition(expressionRange), this.rightExpression.getPartition(expressionRange))
        }

        if(this.expressionType === ExpressionType.intersectionType)
        {
            return ExpressionRange.mergeCollection(this.leftExpression.getPartition(expressionRange), this.rightExpression.getPartition(expressionRange))
        }

        if(this.expressionType === ExpressionType.concatenationType)
        {
            if(this.leftExpression.getRule())
            {
                return ExpressionRange.mergeCollection(this.leftExpression.getPartition(expressionRange), this.rightExpression.getPartition(expressionRange))
            }
            else
            {
                return ExpressionRange.validateCollection(this.leftExpression.getPartition(expressionRange))
            }
        }

        if(this.expressionType === ExpressionType.quantificationType)
        {
            return ExpressionRange.validateCollection(this.leftExpression.getPartition(expressionRange))
        }

        if(this.expressionType === ExpressionType.complementationType)
        {
            return ExpressionRange.validateCollection(this.leftExpression.getPartition(expressionRange))
        }

        if(this.expressionType === ExpressionType.interpretationType)
        {
            return ExpressionRange.validateCollection(this.leftExpression.getPartition(expressionRange))
        }

        return ExpressionRange.validateCollection(expressionRange.getPartition(expressionRange))
    }
}
