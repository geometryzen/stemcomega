import { is_rat } from "../rat/is_rat";
import { Rat } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, is_cons } from "../../tree/tree";
import { BCons } from "../helpers/BCons";
import { is_outer_2_sym_sym } from "../outer/is_outer_2_sym_sym";
import { is_mul_2_any_any } from "./is_mul_2_any_any";

export function is_mul_2_rat_outer_2_sym_sym(expr: Cons): expr is BCons<Sym, Rat, BCons<Sym, Sym, Sym>> {
    return is_mul_2_any_any(expr) && is_rat(expr.lhs) && is_cons(expr.rhs) && is_outer_2_sym_sym(expr.rhs);
}