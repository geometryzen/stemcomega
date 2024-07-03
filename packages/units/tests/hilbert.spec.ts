import { check } from "../src/check";

describe("hilbert", function () {
    it("001", function () {
        check("hilbert(0)", "[]");
        check("hilbert(1)", "[[1]]");
        check("hilbert(2)", "[[1,1/2],[1/2,1/3]]");
        check("hilbert(3)", "[[1,1/2,1/3],[1/2,1/3,1/4],[1/3,1/4,1/5]]");
        check("hilbert(4)", "[[1,1/2,1/3,1/4],[1/2,1/3,1/4,1/5],[1/3,1/4,1/5,1/6],[1/4,1/5,1/6,1/7]]");
        check("hilbert(5)", "[[1,1/2,1/3,1/4,1/5],[1/2,1/3,1/4,1/5,1/6],[1/3,1/4,1/5,1/6,1/7],[1/4,1/5,1/6,1/7,1/8],[1/5,1/6,1/7,1/8,1/9]]");
    });
});
