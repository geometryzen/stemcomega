import { assert } from "chai";
import { createScriptEngine } from "../src/runtime/symengine";

describe("hermite", function () {
    it("hermite(x,0)", function () {
        const lines: string[] = [
            `hermite(x,0)`
        ];
        const engine = createScriptEngine({
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "1");
        assert.strictEqual(engine.renderAsInfix(values[0]), "1");
        engine.release();
    });
    it("hermite(x,1)", function () {
        const lines: string[] = [
            `hermite(x,1)`
        ];
        const engine = createScriptEngine({
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(* 2 x)");
        assert.strictEqual(engine.renderAsInfix(values[0]), "2*x");
        engine.release();
    });
    it("hermite(x,2)", function () {
        const lines: string[] = [
            `hermite(x,2)`
        ];
        const engine = createScriptEngine({
            disable: ['factorize']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(+ (* 4 x x) -2)");
        assert.strictEqual(engine.renderAsInfix(values[0]), "4*x*x-2");
        engine.release();
    });
    it("hermite(x,3)", function () {
        const lines: string[] = [
            `hermite(x,3)`
        ];
        const engine = createScriptEngine({
            disable: ['factorize']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(+ (* 8 x x x) (* -12 x))");
        assert.strictEqual(engine.renderAsInfix(values[0]), "8*x*x*x-12*x");
        engine.release();
    });
    it("hermite(x,4)", function () {
        const lines: string[] = [
            `hermite(x,4)`
        ];
        const engine = createScriptEngine({
            disable: ['factorize']
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "(+ (* 16 x x x x) (* -48 x x) 12)");
        assert.strictEqual(engine.renderAsInfix(values[0]), "16*x*x*x*x-48*x*x+12");
        engine.release();
    });
});
