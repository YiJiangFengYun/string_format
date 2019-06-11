"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var NumberFixedExt = /** @class */ (function () {
    function NumberFixedExt() {
        this._fixedPoint = 0;
        this._autoDelTailZero = true;
    }
    /**
     * set new fixed point. if value equal to 0, it means no fixed action.
     * @param value  fixed point
     */
    NumberFixedExt.prototype.setFixedPoint = function (value) {
        if (value === void 0) { value = 0; }
        this._fixedPoint = value;
    };
    NumberFixedExt.prototype.setAutoDelTailZero = function (isAutoDel) {
        if (isAutoDel === void 0) { isAutoDel = false; }
        this._autoDelTailZero = isAutoDel;
    };
    NumberFixedExt.prototype.processTokens = function (tokens) {
        if (this._fixedPoint == 0)
            return tokens;
        var autoDelTailZero = this._autoDelTailZero;
        var lenToken = tokens.length;
        var indexToken;
        for (indexToken = 0; indexToken < lenToken; ++indexToken) {
            if (this._isNumber(tokens[indexToken])) {
                var number = Number(tokens[indexToken]);
                var token = number.toFixed(this._fixedPoint);
                if (autoDelTailZero) {
                    token = token.replace(/[.]?[0]+$/, "");
                }
                tokens.splice(indexToken, 1, token);
            }
        }
        return tokens;
    };
    NumberFixedExt.prototype._isNumber = function (token) {
        var resNum = Number(token);
        if (typeof resNum === "number")
            return true;
        return false;
    };
    return NumberFixedExt;
}());
exports.NumberFixedExt = NumberFixedExt;
//# sourceMappingURL=NumberFixedExt.js.map