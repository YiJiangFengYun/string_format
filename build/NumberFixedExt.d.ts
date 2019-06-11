import { IFormatExt } from "./IFormatExt";
export declare class NumberFixedExt implements IFormatExt {
    private _fixedPoint;
    private _autoDelTailZero;
    constructor();
    /**
     * set new fixed point. if value equal to 0, it means no fixed action.
     * @param value  fixed point
     */
    setFixedPoint(value?: number): void;
    setAutoDelTailZero(isAutoDel?: boolean): void;
    processTokens(tokens: string[]): string[];
    private _isNumber;
}
