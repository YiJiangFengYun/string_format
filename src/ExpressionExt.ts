import { IFormatExt } from "./IFormatExt";

export class ExpressionExt implements IFormatExt {
    private TOKEN_ADD = "+";
    private TOKEN_SUB = "-";
    private TOKEN_MUL = "*";
    private TOKEN_DIV = "/";

    private _operatorTokens: String[];
    private _operateFuns: ((num1: number, num2: number) => number)[];
    public constructor() {
        var tokenNum = 4;
        var operatorTokens: string[] = [];
        operatorTokens.length = tokenNum;
        operatorTokens[0] = this.TOKEN_ADD;
        operatorTokens[1] = this.TOKEN_SUB;
        operatorTokens[2] = this.TOKEN_MUL;
        operatorTokens[3] = this.TOKEN_DIV;
        this._operatorTokens = operatorTokens;

        var operateFuns: ((num1: number, num2: number) => number)[] = [];
        operateFuns.length = tokenNum;
        operateFuns[0] = this._add;
        operateFuns[1] = this._sub;
        operateFuns[2] = this._mul;
        operateFuns[3] = this._div;
        this._operateFuns = operateFuns;
    }

    public processTokens(tokens: string[]): string[] {
        //now supply addition, subtract, multiply and divide.
        var operatorTokens = this._operatorTokens;
        var operateFuns = this._operateFuns;
        var operatorNum = operatorTokens.length;
        var operatorIndex: number;

        var tokenLen = tokens.length;
        var tokenIndex: number;
        for (tokenIndex = 0; tokenIndex < tokenLen; ++tokenIndex) {
            var token = tokens[tokenIndex];
            var isOperator: boolean = false;
            for (operatorIndex = 0; operatorIndex < operatorNum; ++operatorIndex) {
                if (token === operatorTokens[operatorIndex]) {
                    isOperator = true;
                    break;
                }
            }
            if (isOperator) {
                if (tokenIndex == 0 || this._isNumber(tokens[tokenIndex - 1]) == false) {
                    //continue to search expression.
                    continue;
                }
                else if (tokenIndex == tokenLen - 1 || this._isNumber(tokens[tokenIndex + 1]) == false) {
                    //end search expression.
                    break;
                }
                else {
                    //operate expression.
                    var firstNum: number = Number(tokens[tokenIndex - 1]);
                    var secondNum: number = Number(tokens[tokenIndex + 1]);
                    var resultNum = operateFuns[operatorIndex](firstNum, secondNum);

                    //replace tokens
                    var index = tokenIndex - 1;
                    tokens.splice(index, 3, resultNum.toString());
                    tokenIndex = index;
                }
            }
        }

        return tokens;

    }

    private _add(num1: number, num2: number): number {
        return num1 + num2;
    }

    private _sub(num1: number, num2: number): number {
        return num1 - num2;
    }

    private _mul(num1: number, num2: number): number {
        return num1 * num2;
    }

    private _div(num1: number, num2: number): number {
        return num1 / num2;
    }

    private _isNumber(token: string): boolean {
        let resNum = Number(token);
        if (! isNaN(resNum)) return true;
        return false;
    }



}

