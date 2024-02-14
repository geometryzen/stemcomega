import { Directive, Extension, ExtensionBuilder, ExtensionEnv, FEATURE, TFLAGS, TFLAG_HALT, TFLAG_NONE } from "../../env/ExtensionEnv";
import { HASH_SYM } from "../../hashing/hash_info";
import { Native } from "../../native/Native";
import { native_sym } from "../../native/native_sym";
import { Sym } from "../../tree/sym/Sym";
import { Cons, cons, U } from "../../tree/tree";
import { assert_sym } from "./assert_sym";
import { is_sym } from "./is_sym";

const MATH_POW = native_sym(Native.pow);

class Builder implements ExtensionBuilder<Sym> {
    create(): Extension<Sym> {
        return new SymMathPow();
    }
}

/**
 * 
 */
class SymMathPow implements Extension<Sym> {
    constructor() {
    }
    phases?: number | undefined;
    dependencies?: FEATURE[] | undefined;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    test(expr: Sym, opr: Sym): boolean {
        throw new Error("Method not implemented.");
    }
    iscons(): false {
        return false;
    }
    operator(): Sym {
        throw new Error();
    }
    get hash(): string {
        return HASH_SYM;
    }
    get name(): string {
        return 'SymMathPow';
    }
    evaluate(expr: U, argList: Cons): [TFLAGS, U] {
        return this.transform(cons(expr, argList));
    }
    transform(expr: U): [TFLAGS, U] {
        return [this.isKind(expr) ? TFLAG_HALT : TFLAG_NONE, expr];
    }
    isKind(arg: U): arg is Sym {
        return is_sym(arg) && MATH_POW.equals(arg);
    }
    subst(expr: Sym, oldExpr: U, newExpr: U): U {
        if (expr.equals(oldExpr)) {
            return newExpr;
        }
        else {
            return expr;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toInfixString(expr: Sym, $: ExtensionEnv): string {
        if ($.getDirective(Directive.useCaretForExponentiation)) {
            return '^';
        }
        else {
            return '**';
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toLatexString(expr: Sym): string {
        return ' ^ ';
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    toListString(expr: Sym, $: ExtensionEnv): string {
        return $.getSymbolPrintName(MATH_POW);
    }
    valueOf(expr: Sym): Sym {
        return assert_sym(this.transform(expr)[1]);
    }
}

export const sym_math_pow_builder = new Builder();
