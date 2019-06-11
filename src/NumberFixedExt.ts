import { IFormatExt } from "./IFormatExt";

export class NumberFixedExt implements IFormatExt {
    private _fixedPoint = 0;
    private _autoDelTailZero = true;
    public constructor() {
    }

    /**
     * set new fixed point. if value equal to 0, it means no fixed action.
     * @param value  fixed point
     */
    public setFixedPoint(value = 0): void {
        this._fixedPoint = value;
    }

    public setAutoDelTailZero(isAutoDel: boolean = false): void {
        this._autoDelTailZero = isAutoDel;
    }

    public processTokens(tokens: string[]): string[] {
        if (this._fixedPoint == 0) return tokens;
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
    }

    private _isNumber(token: string): boolean {
        let resNum = Number(token);
        if (typeof resNum === "number") return true;
        return false;
    }
}

