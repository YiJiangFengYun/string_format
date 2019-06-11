import { IFormatExt } from "./IFormatExt";
export declare class ExpressionExt implements IFormatExt {
    private TOKEN_ADD;
    private TOKEN_SUB;
    private TOKEN_MUL;
    private TOKEN_DIV;
    private _operatorTokens;
    private _operateFuns;
    constructor();
    processTokens(tokens: string[]): string[];
    private _add;
    private _sub;
    private _mul;
    private _div;
    private _isNumber;
}
