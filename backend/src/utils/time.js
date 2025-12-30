"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNow = getNow;
function getNow(req) {
    if (process.env.TEST_MODE === "1") {
        const testNow = req.header("x-test-now-ms");
        if (testNow) {
            const ms = Number(testNow);
            if (!Number.isNaN(ms)) {
                return new Date(ms);
            }
        }
    }
    return new Date();
}
