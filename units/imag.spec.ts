import { assert } from "chai";
import { createScriptEngine } from "../src/runtime/script_engine";

describe("imag", function () {
    it("imag(a+i*b)", function () {
        const lines: string[] = [
            `imag(a+i*b)`
        ];
        const engine = createScriptEngine({
            dependencies: ['Imu'],
            useDefinitions: true
        });
        const { values } = engine.executeScript(lines.join('\n'));
        assert.strictEqual(engine.renderAsSExpr(values[0]), "b");
        assert.strictEqual(engine.renderAsInfix(values[0]), "b");
        engine.release();
    });
});
