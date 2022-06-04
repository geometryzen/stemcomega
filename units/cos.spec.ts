import { assert } from "chai";
import { render_as_infix, render_as_sexpr } from "../src/print";
import { create_engine } from "../src/runtime/symengine";
import { assert_one_value_execute } from "./assert_one_value_execute";

describe("cos", function () {
    // TODO: This should factorize back to cos(a+b)
    it("cos(a+b)", function () {
        const lines: string[] = [
            `cos(a+b)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_infix(value, $), 'cos(a)*cos(b)-sin(a)*sin(b)');
    });
});

describe("cos", function () {
    it("cos(x)", function () {
        const lines: string[] = [
            `cos(x)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_sexpr(value, $), '(cos x)');
        assert.strictEqual(render_as_infix(value, $), 'cos(x)');
    });
    it("cos(-x)", function () {
        const lines: string[] = [
            `cos(-x)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_sexpr(value, $), '(cos x)');
        assert.strictEqual(render_as_infix(value, $), 'cos(x)');
    });
    it("cos(-x*y)", function () {
        const lines: string[] = [
            `cos(-x*y)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_sexpr(value, $), '(cos (* x y))');
        assert.strictEqual(render_as_infix(value, $), 'cos(x*y)');
    });
    it("cos(-x*y*z)", function () {
        const lines: string[] = [
            `cos(-x*y*z)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_sexpr(value, $), '(cos (* x y z))');
        assert.strictEqual(render_as_infix(value, $), 'cos(x*y*z)');
    });
    it("cos(a+b)", function () {
        const lines: string[] = [
            `cos(a+b)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_infix(value, $), 'cos(a)*cos(b)-sin(a)*sin(b)');
    });
    it("cos(b+a)", function () {
        const lines: string[] = [
            `cos(b+a)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_infix(value, $), 'cos(a)*cos(b)-sin(a)*sin(b)');
    });
    it("cos(a-b)", function () {
        const lines: string[] = [
            `cos(a-b)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_infix(value, $), 'cos(a)*cos(b)+sin(a)*sin(b)');
    });
    it("cos(b-a)", function () {
        const lines: string[] = [
            `cos(b-a)`
        ];
        const engine = create_engine({
            dependencies: []
        });
        const $ = engine.$;
        const value = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(render_as_infix(value, $), 'cos(a)*cos(b)+sin(a)*sin(b)');
    });
});
