import { assert_one_value_execute } from "./assert_one_value_execute";
import { assert } from "chai";
import { create_script_context } from "../index";

describe("real", function () {
    it("real(z)", function () {
        const lines: string[] = [
            `real(z)`
        ];
        const engine = create_script_context({
            dependencies: ['Imu'],
            useDefinitions: true
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(values.length, 1);
        assert.strictEqual(engine.renderAsInfix(values[0]), "z");
        engine.release();
    });
    it("real(z) when z is not real", function () {
        const lines: string[] = [
            `real(z)`
        ];
        const engine = create_script_context({
            assumes: {
                'z': { real: false }
            },
            dependencies: ['Imu'],
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(values.length, 1);
        assert.strictEqual(engine.renderAsInfix(values[0]), "real(z)");
        engine.release();
    });
    xit("real(i*z) when z is not real", function () {
        const lines: string[] = [
            `real(i*z)`
        ];
        const engine = create_script_context({
            assumes: {
                'z': { real: false }
            },
            dependencies: ['Imu'],
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(values.length, 1);
        assert.strictEqual(engine.renderAsInfix(values[0]), "-imag(z)");
        engine.release();
    });
    it("exp(x*i)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `real(exp(x*i))`
        ];
        const engine = create_script_context({
            dependencies: ['Imu']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(cos x)");
        assert.strictEqual(engine.renderAsInfix(values[0]), "cos(x)");
        engine.release();
    });
    it("real(x+i*y) => x, when variables are assumed to be real.", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `real(x+i*y)`
        ];
        const engine = create_script_context({
            dependencies: ['Imu']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsInfix(values[0]), "x");
        engine.release();
    });
    xit("real(x+i*y) => real(x)+real(i*y), when variables may be complex", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `real(x+i*y)`
        ];
        const engine = create_script_context({
            assumes: {
                'x': { real: false },
                'y': { real: false }
            },
            dependencies: ['Imu']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsInfix(values[0]), "real(x)+real(i*y)");
        engine.release();
    });
    xit("real(exp(i*x)) => cos(x)", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `real(exp(i*x))`
        ];
        const engine = create_script_context({
            dependencies: ['Imu']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(cos x)");
        assert.strictEqual(engine.renderAsInfix(values[0]), "cos(x)");
        engine.release();
    });
    xit("", function () {
        const lines: string[] = [
            `i=sqrt(-1)`,
            `real(1/(x+i*y))`
        ];
        const engine = create_script_context({
            useCaretForExponentiation: true
        });
        const actual = assert_one_value_execute(lines.join('\n'), engine);
        assert.strictEqual(engine.renderAsInfix(actual), "x/(x^2+y^2)");
        engine.release();
    });
});
