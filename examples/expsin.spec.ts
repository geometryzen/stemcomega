import { check } from "./check";

describe("expsin", function () {
    it("001", function () {
        check("expsin(z)", "1/2*i*exp(-i*z)-1/2*i*exp(i*z)");
    });
});
