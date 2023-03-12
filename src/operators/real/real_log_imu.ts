import { ExtensionEnv, Operator, OperatorBuilder, TFLAGS, TFLAG_DIFF } from "../../env/ExtensionEnv";
import { Native } from "../../native/Native";
import { native_sym } from "../../native/native_sym";
import { zero } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, U } from "../../tree/tree";
import { UCons } from "../helpers/UCons";
import { is_imu } from "../imu/is_imu";
import { AbstractChain } from "../isreal/AbstractChain";

const real = native_sym(Native.real);
const log = native_sym(Native.log);

class Builder implements OperatorBuilder<U> {
    create($: ExtensionEnv): Operator<U> {
        return new Op($);
    }
}

class Op extends AbstractChain {
    constructor($: ExtensionEnv) {
        super(real, log, $);
    }
    isKind(expr: U): expr is UCons<Sym, Cons> {
        if (super.isKind(expr)) {
            const logExpr = expr.argList.head;
            const x = logExpr.argList.head;
            return is_imu(x);
        }
        else {
            return false;
        }
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform1(opr: Sym, logExpr: Cons): [TFLAGS, U] {
        return [TFLAG_DIFF, zero];
    }
}

export const real_log_imu = new Builder();
