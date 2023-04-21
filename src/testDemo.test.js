import { sum } from "./testDemo";
describe("test index", () => {
    test("sum function", () => {
        expect(sum(1, 1)).toBe(2);
    });
});
