import { is_cons_opr_eq_sym } from "../../predicates/is_cons_opr_eq_sym";
import { Sym } from "../../tree/sym/Sym";
import { Cons, U } from "../../tree/tree";
import { is_unaop } from "./is_unaop";
import { UCons } from "./UCons";

export function is_opr_1_any(opr: Sym): (expr: Cons) => expr is UCons<Sym, U> {
    return function (expr: Cons): expr is UCons<Sym, U> {
        return is_cons_opr_eq_sym(expr, opr) && is_unaop(expr);
    };
}