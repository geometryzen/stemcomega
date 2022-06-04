import { is_rat } from "../rat/is_rat";
import { Rat } from "../../tree/rat/Rat";
import { Sym } from "../../tree/sym/Sym";
import { Cons, U } from "../../tree/tree";
import { BCons } from "../helpers/BCons";
import { is_pow_2_any_any } from "./is_pow_2_any_any";

export function is_pow_2_any_rat(expr: Cons): expr is BCons<Sym, U, Rat> {
    return is_pow_2_any_any(expr) && is_rat(expr.rhs);
}