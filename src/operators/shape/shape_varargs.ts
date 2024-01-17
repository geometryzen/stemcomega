import { ExtensionEnv, Operator, OperatorBuilder, TFLAG_DIFF, TFLAG_HALT } from "../../env/ExtensionEnv";
import { hash_nonop_cons } from "../../hashing/hash_info";
import { SHAPE } from "../../runtime/constants";
import { Cons, U } from "../../tree/tree";
import { FunctionVarArgs } from "../helpers/FunctionVarArgs";
import { Eval_shape } from "./shape";

class Builder implements OperatorBuilder<U> {
    create($: ExtensionEnv): Operator<U> {
        return new Op($);
    }
}

class Op extends FunctionVarArgs implements Operator<Cons> {
    readonly #hash: string;
    constructor($: ExtensionEnv) {
        super('shape', SHAPE, $);
        this.#hash = hash_nonop_cons(this.opr);
    }
    get hash(): string {
        return this.#hash;
    }
    transform(expr: Cons): [number, U] {
        const $ = this.$;
        const retval = Eval_shape(expr, $);
        const changed = !retval.equals(expr);
        return [changed ? TFLAG_DIFF : TFLAG_HALT, retval];
    }
}

export const shape_varargs = new Builder();
