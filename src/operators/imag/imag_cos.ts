import { ExtensionEnv, Operator, OperatorBuilder, TFLAGS, TFLAG_DIFF, TFLAG_NONE } from "../../env/ExtensionEnv";
import { Native } from "../../native/Native";
import { native_sym } from "../../native/native_sym";
import { zero } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, U } from "../../tree/tree";
import { CompositeOperator } from "../CompositeOperator";

const COS = native_sym(Native.cos);
const IM = native_sym(Native.imag);

class Builder implements OperatorBuilder<U> {
    create($: ExtensionEnv): Operator<U> {
        return new Op($);
    }
}

/**
 * im(cos(z)) = 0 when z is real
 */
class Op extends CompositeOperator {
    constructor($: ExtensionEnv) {
        super(IM, COS, $);
    }
    transform1(opr: Sym, cosExpr: Cons, imExpr: Cons): [TFLAGS, U] {
        const $ = this.$;
        const cosArg = cosExpr.arg;
        if ($.isreal(cosArg)) {
            return [TFLAG_DIFF, zero];
        }
        else {
            return [TFLAG_NONE, imExpr];
        }
    }
}

export const imag_cos = new Builder();
