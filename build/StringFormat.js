"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ExpressionExt_1 = require("./ExpressionExt");
var NumberFixedExt_1 = require("./NumberFixedExt");
var StringFormat = /** @class */ (function () {
    function StringFormat() {
        this._formatValueMap = {};
        this._formatExs = [];
        this._expressionExt = new ExpressionExt_1.ExpressionExt();
        this._numberFixedExt = new NumberFixedExt_1.NumberFixedExt();
        this.addExt(this._expressionExt);
        this.addExt(this._numberFixedExt);
    }
    StringFormat.prototype.setFormatValues = function (values) {
        var valueMap = this._formatValueMap;
        //clear key values
        for (var key in valueMap) {
            delete valueMap[key];
        }
        //copy key values
        for (var key in values) {
            valueMap[key] = values[key];
        }
    };
    StringFormat.prototype.format = function (targetStr) {
        var valueMap = this._formatValueMap;
        var exts = this._formatExs;
        var extsLen = exts.length;
        var extIndex;
        //query all sub strings with percent sign.
        var strWithPercentSigns = this._findReplaceStrWithPercentSign(targetStr);
        var lenOfStrWithPercentSign = strWithPercentSigns.length;
        var resultStrs = [];
        resultStrs.length = lenOfStrWithPercentSign;
        //calculate all result strings for replacing all sub strings.
        for (var i = 0; i < lenOfStrWithPercentSign; ++i) {
            var strWithPercentSign = strWithPercentSigns[i];
            var strNoPercentSign = strWithPercentSign.substr(1, strWithPercentSign.length - 2);
            var tokens = this._tokensSplitStr(strNoPercentSign);
            //replace token using key-value or replace "\%" with "%".
            var tokenLen = tokens.length;
            var tokenIndex;
            var token;
            for (tokenIndex = 0; tokenIndex < tokenLen; ++tokenIndex) {
                token = tokens[tokenIndex];
                if (this._iskeyStr(token) && valueMap.hasOwnProperty(token)) {
                    token = valueMap[token];
                    tokens[tokenIndex] = String(token);
                }
            }
            //process continuously tokens with existing extensions.
            for (extIndex = 0; extIndex < extsLen; ++extIndex) {
                tokens = exts[extIndex].processTokens(tokens);
            }
            //get result string from fistr item of final tokens, so we should guarantee final tokens remain one item.
            // if tokens is empty. set result string to empty string.
            var resultStr = tokens.length ? tokens[0] : "";
            resultStrs[i] = resultStr;
        }
        //construct final result string;
        for (var i = 0; i < lenOfStrWithPercentSign; ++i) {
            targetStr = targetStr.replace(strWithPercentSigns[i], resultStrs[i]);
        }
        targetStr = targetStr.replace("\\%", "%");
        return targetStr;
    };
    StringFormat.prototype.addExt = function (ext) {
        var index = this._formatExs.indexOf(ext);
        if (index == -1)
            this._formatExs.push(ext);
    };
    StringFormat.prototype.removeExt = function (ext) {
        var index = this._formatExs.indexOf(ext);
        if (index != -1)
            this._formatExs.splice(index, 1);
    };
    Object.defineProperty(StringFormat.prototype, "expressionExt", {
        get: function () { return this._expressionExt; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(StringFormat.prototype, "numberFixedExt", {
        get: function () { return this._numberFixedExt; },
        enumerable: true,
        configurable: true
    });
    StringFormat.prototype._findReplaceStrWithPercentSign = function (targetStr, results) {
        if (results === void 0) { results = null; }
        if (results == null)
            results = [];
        results.length = 0;
        var length = targetStr ? targetStr.length : 0;
        var i;
        var startIndex = 0;
        var endIndex = length;
        var percentSign = "%";
        var percentSignIndex = 0;
        for (i = 0; i < length; ++i) {
            var char = targetStr.charAt(i);
            if (char == percentSign) {
                if (i != 0 && targetStr.charAt(i - 1) == "\\") {
                    continue;
                } //invalid percent sign.
                if (percentSignIndex == 0) {
                    startIndex = i;
                    percentSignIndex = 1;
                }
                else {
                    endIndex = i + 1;
                    percentSignIndex = 0;
                    results.push(targetStr.substring(startIndex, endIndex));
                }
            }
        }
        return results;
    };
    StringFormat.prototype._iskeyStr = function (targetStr) {
        var res = targetStr.match(/^[a-zA-Z_]+[a-zA-Z0-9_]*/);
        if (res)
            return true;
        return false;
    };
    StringFormat.prototype._tokensSplitStr = function (str) {
        return str.split(/[\s\r\n]+/);
    };
    return StringFormat;
}());
exports.StringFormat = StringFormat;
//# sourceMappingURL=StringFormat.js.map