import { Request } from "express";

export function getNow(req: Request): Date {
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
