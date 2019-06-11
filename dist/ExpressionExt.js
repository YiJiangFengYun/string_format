"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionExt = /** @class */ (function () {
    function ExpressionExt() {
        this.TOKEN_ADD = "+";
        this.TOKEN_SUB = "-";
        this.TOKEN_MUL = "*";
        this.TOKEN_DIV = "/";
        var tokenNum = 4;
        var operatorTokens = [];
        operatorTokens.length = tokenNum;
        operatorTokens[0] = this.TOKEN_ADD;
        operatorTokens[1] = this.TOKEN_SUB;
        operatorTokens[2] = this.TOKEN_MUL;
        operatorTokens[3] = this.TOKEN_DIV;
        this._operatorTokens = operatorTokens;
        var operateFuns = [];
        operateFuns.length = tokenNum;
        operateFuns[0] = this._add;
        operateFuns[1] = this._sub;
        operateFuns[2] = this._mul;
        operateFuns[3] = this._div;
        this._operateFuns = operateFuns;
    }
    ExpressionExt.prototype.processTokens = function (tokens) {
        //now supply addition, subtract, multiply and divide.
        var operatorTokens = this._operatorTokens;
        var operateFuns = this._operateFuns;
        var operatorNum = operatorTokens.length;
        var operatorIndex;
        var tokenLen = tokens.length;
        var tokenIndex;
        for (tokenIndex = 0; tokenIndex < tokenLen; ++tokenIndex) {
            var token = tokens[tokenIndex];
            var isOperator = false;
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
                    var firstNum = Number(tokens[tokenIndex - 1]);
                    var secondNum = Number(tokens[tokenIndex + 1]);
                    var resultNum = operateFuns[operatorIndex](firstNum, secondNum);
                    //replace tokens
                    var index = tokenIndex - 1;
                    tokens.splice(index, 3, resultNum.toString());
                    tokenIndex = index;
                }
            }
        }
        return tokens;
    };
    ExpressionExt.prototype._add = function (num1, num2) {
        return num1 + num2;
    };
    ExpressionExt.prototype._sub = function (num1, num2) {
        return num1 - num2;
    };
    ExpressionExt.prototype._mul = function (num1, num2) {
        return num1 * num2;
    };
    ExpressionExt.prototype._div = function (num1, num2) {
        return num1 / num2;
    };
    ExpressionExt.prototype._isNumber = function (token) {
        var resNum = Number(token);
        if (!isNaN(resNum))
            return true;
        return false;
    };
    return ExpressionExt;
}());
exports.ExpressionExt = ExpressionExt;
