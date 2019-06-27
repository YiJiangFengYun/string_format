import { IFormatExt } from "./IFormatExt";
import { ExpressionExt } from "./ExpressionExt";
import { NumberFixedExt } from "./NumberFixedExt";
export declare type TypeValueMap = {
    [token: string]: string | number;
};
export declare class StringFormat {
    private _formatValueMap;
    private _formatExs;
    private _expressionExt;
    private _numberFixedExt;
    constructor();
    setFormatValues(values: TypeValueMap): void;
    format(targetStr: string): string;
    addExt(ext: IFormatExt): void;
    removeExt(ext: IFormatExt): void;
    readonly expressionExt: ExpressionExt;
    readonly numberFixedExt: NumberFixedExt;
    private _findReplaceStrWithPercentSign;
    private _iskeyStr;
    private _tokensSplitStr;
}
