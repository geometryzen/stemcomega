import { is_boo, is_flt, is_rat, is_str, is_sym, is_tensor } from "math-expression-atoms";
import { is_atom, is_cons, is_nil, U } from "math-expression-tree";
import { is_keyword } from "../clojurescript/atoms/Keyword";
import { is_map } from "../clojurescript/atoms/Map";
import { Visitor } from "./Visitor";

export function visit(expr: U, visitor: Visitor): void {
    if (is_cons(expr)) {
        visitor.beginCons(expr);
        try {
            for (const item of expr) {
                visit(item, visitor);
            }
        }
        finally {
            visitor.endCons(expr);
        }
    }
    else if (is_sym(expr)) {
        visitor.sym(expr);
    }
    else if (is_rat(expr)) {
        visitor.rat(expr);
    }
    else if (is_flt(expr)) {
        visitor.flt(expr);
    }
    else if (is_boo(expr)) {
        visitor.boo(expr);
    }
    else if (is_str(expr)) {
        visitor.str(expr);
    }
    else if (is_tensor(expr)) {
        visitor.beginTensor(expr);
        try {
            for (const elem of expr.elems) {
                visit(elem, visitor);
            }
        }
        finally {
            visitor.endTensor(expr);
        }
    }
    else if (is_map(expr)) {
        visitor.beginMap(expr);
        try {
            for (const entry of expr.entries) {
                visit(entry[0], visitor);
                visit(entry[1], visitor);
            }
        }
        finally {
            visitor.endMap(expr);
        }
    }
    else if (is_keyword(expr)) {
        visitor.keyword(expr);
    }
    else if (is_atom(expr)) {
        throw new Error(`${expr}`);
        // visitor.atom(expr);
    }
    else if (is_nil(expr)) {
        visitor.nil(expr);
    }
}