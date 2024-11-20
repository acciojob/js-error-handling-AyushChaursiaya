//your code here
class OutOfRangeError exports Error {
	constructor(arg) {
		super(`Expression should only consist of integers and +-/* characters and not ${arg}`);
		this.name = 'OutOfRangeError';
	}
} 

class InvalidExprError exports Error {
	constructor() {
		super('Expression should not have an invalid combination of expression');
		this.name = 'InvalidExprError';
	}
}


function evalString(expression) {
	try {
        // Remove spaces for easier validation
        const trimmedExpr = expression.replace(/\s+/g, '');

        // Check for invalid characters
        if (/[^0-9+\-*/]/.test(trimmedExpr)) {
            const invalidChar = trimmedExpr.match(/[^0-9+\-*/]/)[0];
            throw new OutOfRangeError(invalidChar);
        }

        // Check for invalid operator combinations
        if (/[\+\-*/]{2,}/.test(trimmedExpr)) {
            throw new InvalidExprError();
        }

        // Check for invalid start
        if (/^[+\/*]/.test(trimmedExpr)) {
            throw new SyntaxError("Expression should not start with invalid operator");
        }

        // Check for invalid end
        if (/[\+\-*/]$/.test(trimmedExpr)) {
            throw new SyntaxError("Expression should not end with invalid operator");
        }

        // Evaluate the expression
        return eval(expression);
    } catch (error) {
        if (error instanceof OutOfRangeError || error instanceof InvalidExprError) {
            throw error;
        } else if (error instanceof SyntaxError) {
            throw error;
        } else {
            throw new Error("An unexpected error occurred");
        }
    }
}

try {
    console.log(evalString("10 + 20"));       // 30
    console.log(evalString("10 ++ 20"));     // Throws InvalidExprError
    console.log(evalString("10 + 20 & 30")); // Throws OutOfRangeError
    console.log(evalString("*10 + 20"));     // Throws SyntaxError
    console.log(evalString("10 + 20-"));     // Throws SyntaxError
} catch (error) {
    console.error(`${error.name}: ${error.message}`);
}