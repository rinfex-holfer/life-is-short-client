import {describe, expect, it} from "vitest";
import {createLifeYearsWithWeeks} from "./calendars";

const leapYear = 2000
const nonLeapYear = 2001

describe("life in weeks", () => {
    describe("starting with non-leap year", function() {
        const year = nonLeapYear
        const dateOfBirth = new Date(year, 0, 1)
        const yearInWeeks = createLifeYearsWithWeeks(dateOfBirth, 1)

        it('year contains 53 weeks', function () {
            expect(yearInWeeks[0].year).eq(year)
            expect(yearInWeeks[0].weeks).eq(53)
        });

        // it('last day of life - birthday', function () {
        //     expect(yearInWeeks.length).eq(2)
        //     expect(yearInWeeks[1].year).eq(year+1)
        //     expect(yearInWeeks[1].weeks.length).eq(1)
        //     expect(yearInWeeks[1].weeks[0].starts).eq(new Date(year+1, 0, 1))
        // });
    })
    //
    // it('each year in 100 years contains 53 weeks', function() {
    //     const dateOfBirth = new Date(leapYear, 0, 1)
    //     const yearInWeeks = createLifeYearsWithWeeks(dateOfBirth, 100)
    //     expect(yearInWeeks.length).eq(101)
    // })
})