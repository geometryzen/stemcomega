import { ExtensionEnv, Operator, OperatorBuilder, TFLAGS, TFLAG_DIFF } from "../../env/ExtensionEnv";
import { HASH_ANY, hash_binop_cons_atom } from "../../hashing/hash_info";
import { is_base_of_natural_logarithm } from "../../predicates/is_base_of_natural_logarithm";
import { MATH_POW } from "../../runtime/ns_math";
import { Rat } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, is_cons, items_to_cons, U } from "../../tree/tree";
import { and } from "../helpers/and";
import { BCons } from "../helpers/BCons";
import { Function2X } from "../helpers/Function2X";
import { is_opr_2_lhs_rhs } from "../helpers/is_opr_2_lhs_rhs";
import { is_mul_2_rat_sym } from "../mul/is_mul_2_rat_sym";
import { is_rat } from "../rat/RatExtension";

class Builder implements OperatorBuilder<Cons> {
    create($: ExtensionEnv): Operator<Cons> {
        return new Op($);
    }
}

type LL = Sym;
type LR = BCons<Sym, Rat, Sym>;
type LHS = BCons<Sym, LL, LR>;
type RHS = Rat;
type EXP = BCons<Sym, LHS, RHS>;

const guardL = and(is_cons, is_opr_2_lhs_rhs(MATH_POW, is_base_of_natural_logarithm, and(is_cons, is_mul_2_rat_sym)));
const guardR = is_rat;

function cross(lhs: LHS, rhs: RHS): boolean {
    const m = lhs.rhs.lhs;
    const n = rhs;
    return m.isTwo() && n.isHalf();
}

/**
 * (power (power e (* 2 x)) 1/2) => (power e x)
 */
class Op extends Function2X<LHS, RHS> implements Operator<EXP> {
    readonly hash: string;
    constructor($: ExtensionEnv) {
        super('pow_2_pow_2_e_any_rat', MATH_POW, guardL, guardR, cross, $);
        this.hash = hash_binop_cons_atom(this.opr, MATH_POW, HASH_ANY);
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    transform2(opr: Sym, lhs: LHS, rhs: RHS, expr: EXP): [TFLAGS, U] {
        const $ = this.$;
        const x = lhs.rhs.rhs;
        const e = lhs.lhs;
        const retval = $.valueOf(items_to_cons(MATH_POW, e, x));
        return [TFLAG_DIFF, retval];
    }
}

export const pow_2_pow_2_e_any_rat = new Builder();
