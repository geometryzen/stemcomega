import { assert } from "chai";
import { create_engine, is_cons, nil, render_as_infix, render_as_sexpr } from "../index";
import { assert_one_value_execute } from "./assert_one_value_execute";

describe("sanity", function () {
    it("is_cons(nil) evaluates to false even though nil is implemented as a Cons", function () {
        assert.isFalse(is_cons(nil));
    });
    it("engine", function () {
        const lines: string[] = [
            `float(i)`
        ];
        const engine = create_engine({
            dependencies: ['Flt', 'Imu'],
            useCaretForExponentiation: true,
            useDefinitions: true
        });
        const $ = engine.$;
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_sexpr(actual, $), "i");
        assert.strictEqual(render_as_infix(actual, $), "i");
        engine.release();
    });
});
