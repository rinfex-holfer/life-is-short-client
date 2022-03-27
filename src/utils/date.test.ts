import {describe, expect, it} from "vitest";
import {getEndOfDay, getStartOfDay} from "./date";

describe("date changers", () => {
    it('get start of day', function () {
        const date = new Date(2000, 0, 1, 3, 32, 9)
        const startOfDaySample = new Date(2000, 0, 1, 0, 0, 0, 0)
        const startOfDay = getStartOfDay(date)
        expect(startOfDay.toString()).eq(startOfDaySample.toString())
    });

    it('get end of day', function () {
        const date = new Date(2000, 0, 1, 3, 32, 9)
        const endOfDaySample = new Date(2000, 0, 1, 23, 59, 59, 999)
        const endOfDay = getEndOfDay(date)
        expect(endOfDay.toString()).eq(endOfDaySample.toString())
    });
})