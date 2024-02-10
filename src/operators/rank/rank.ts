import { create_int, is_tensor, zero } from "math-expression-atoms";
import { Cons } from "math-expression-tree";
import { head, rest, value_of } from "../../eigenmath/eigenmath";
import { ProgramStack } from "../../eigenmath/ProgramStack";
import { ExtensionEnv } from "../../env/ExtensionEnv";
import { StackU } from "../../env/StackU";

function rank($: ProgramStack): void {
    const value = $.pop();
    try {
        if (is_tensor(value)) {
            $.push(create_int(value.rank));
        }
        else {
            $.push(zero);
        }
    }
    finally {
        value.release();
    }
}

export function Eval_rank(expr: Cons, env: ExtensionEnv) {
    const $ = new StackU(); // ()
    $.push(expr);           // (expr)
    rest($);                // (argList)
    head($);                // (arg)
    value_of(env, env, $);  // (value)
    rank($);                // (rank)
    return $.pop();         // ()
}
