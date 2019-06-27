import { IFormatExt } from "./IFormatExt";
import { ExpressionExt } from "./ExpressionExt";
import { NumberFixedExt } from "./NumberFixedExt";

export type TypeValueMap = { [token: string]: string | number };

export class StringFormat {
    private _formatValueMap: TypeValueMap = {};
    private _formatExs: IFormatExt[] = [];
    private _expressionExt: ExpressionExt;
    private _numberFixedExt: NumberFixedExt;
    public constructor() {
        this._expressionExt = new ExpressionExt();
        this._numberFixedExt = new NumberFixedExt();
        this.addExt(this._expressionExt);
        this.addExt(this._numberFixedExt);
    }

    public setFormatValues(values: TypeValueMap): void {
        var valueMap = this._formatValueMap;
        //clear key values
        for (let key in valueMap) {
            delete valueMap[key];
        }

        //copy key values
        for (let key in values) {
            valueMap[key] = values[key];
        }
    }

    public format(targetStr: string): string {
        var valueMap = this._formatValueMap;
        var exts = this._formatExs;
        var extsLen = exts.length;
        var extIndex: number;
        //query all sub strings with percent sign.
        var strWithPercentSigns = this._findReplaceStrWithPercentSign(targetStr);
        var lenOfStrWithPercentSign = strWithPercentSigns.length;
        var resultStrs = [];
        resultStrs.length = lenOfStrWithPercentSign;

        //calculate all result strings for replacing all sub strings.
        for (let i = 0; i < lenOfStrWithPercentSign; ++i) {
            var strWithPercentSign = strWithPercentSigns[i];
            var strNoPercentSign = strWithPercentSign.substr(1, strWithPercentSign.length - 2);
            var tokens = this._tokensSplitStr(strNoPercentSign);

            //replace token using key-value or replace "\%" with "%".
            var tokenLen = tokens.length;
            var tokenIndex;
            var token: string | number;
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
            let resultStr = tokens.length ? tokens[0] : "";
            resultStrs[i] = resultStr;
        }

        //construct final result string;
        for (let i = 0; i < lenOfStrWithPercentSign; ++i) {
            targetStr = targetStr.replace(strWithPercentSigns[i], resultStrs[i]);
        }

        targetStr = targetStr.replace("\\%", "%");

        return targetStr;

    }


    public addExt(ext: IFormatExt): void {
        var index = this._formatExs.indexOf(ext);
        if (index == -1) this._formatExs.push(ext);
    }

    public removeExt(ext: IFormatExt): void {
        var index = this._formatExs.indexOf(ext);
        if (index != -1) this._formatExs.splice(index, 1);
    }

    public get expressionExt(): ExpressionExt { return this._expressionExt; }
    public get numberFixedExt(): NumberFixedExt { return this._numberFixedExt; }

    private _findReplaceStrWithPercentSign(targetStr: string, results: string[] = null): string[] {
        if (results == null) results = [];
        results.length = 0;
        var length = targetStr ? targetStr.length : 0;
        var i: number;
        var startIndex = 0;
        var endIndex = length;
        var percentSign = "%";
        var percentSignIndex = 0;
        for (i = 0; i < length; ++i) {
            var char: string = targetStr.charAt(i);
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
    }

    private _iskeyStr(targetStr: string): boolean {
        var res = targetStr.match(/^[a-zA-Z_]+[a-zA-Z0-9_]*/);
        if (res) return true;
        return false;
    }

    private _tokensSplitStr(str: string): string[] {
        return str.split(/[\s\r\n]+/);
    }

}

