
import { assert } from "chai";
import { is_rat } from "math-expression-atoms";
import { is_nil, U } from "math-expression-tree";
import { create_engine, ExprEngine } from "../src/api/index";
import { Interpreter } from '../src/clojurescript/runtime/Interpreter';

describe("runtime", function () {
    it("+", function () {
        const lines: string[] = [
            `(program (+ 1 2 3 4 5))`
        ];
        const sourceText = lines.join('\n');
        const engine: ExprEngine = create_engine({ useClojureScript: true });
        const { trees, errors } = engine.parse(sourceText, {});
        assert.strictEqual(errors.length, 0);
        const values: U[] = [];
        for (const tree of trees) {
            const runner = new Interpreter(tree);
            runner.run();
            const stack = runner.getStateStack();
            assert.strictEqual(stack.length, 1);
            const value = stack[stack.length - 1].value;
            /*
            const value = engine.evaluate(tree);
            */
            if (!is_nil(value)) {
                values.push(value);
            }
        }
        assert.strictEqual(values.length, 1);
        assert.strictEqual(engine.renderAsString(values[0], { format: 'Infix' }), "15");
        assert.strictEqual(is_rat(values[0]), true);
        engine.release();
    });
    it("*", function () {
        const lines: string[] = [
            `(program (* 1 2 3 4 5))`
        ];
        const sourceText = lines.join('\n');
        const engine: ExprEngine = create_engine({ useClojureScript: true });
        const { trees, errors } = engine.parse(sourceText, {});
        assert.strictEqual(errors.length, 0);
        const values: U[] = [];
        for (const tree of trees) {
            const runner = new Interpreter(tree);
            runner.run();
            const stack = runner.getStateStack();
            assert.strictEqual(stack.length, 1);
            const value = stack[stack.length - 1].value;
            /*
            const value = engine.evaluate(tree);
            */
            if (!is_nil(value)) {
                values.push(value);
            }
        }
        assert.strictEqual(values.length, 1);
        assert.strictEqual(engine.renderAsString(values[0], { format: 'Infix' }), "120");
        assert.strictEqual(is_rat(values[0]), true);
        engine.release();
    });
});