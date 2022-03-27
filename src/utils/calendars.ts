import {Week, WeekCalendar} from "../domain";
import {add, addDays, addYears, compareAsc, getWeek, getYear, isSunday, nextDay} from "date-fns";
import {getEndOfDay, getStartOfDay} from "./date";

export function createCalendarYearsWithWeeks(dateOfBirth: Date, lifespanInYears: number): WeekCalendar {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    const yearOfBirth = getYear(dateOfBirth)
    const yearOfDeath = getYear(dateOfDeath)

    let date = dateOfBirth
    let weekInLife = 1
    let currentWeek = getWeek(date)
    let currentYear = yearOfBirth;

    let week: Week = {
        numInYear: currentWeek,
        numInLife: weekInLife,
        starts: date,
        ends: nextDay(date, 0),
    }
    const calendar: WeekCalendar = [{
        year: yearOfBirth,
        weeks: [week],
    }]

    while (date.toString() !== dateOfDeath.toString()) {
        // console.log(date, dateOfDeath)
        const nextDate = add(date, {days: 1})
        const weekOfNextDate = getWeek(nextDate)

        const lastYear = calendar[calendar.length - 1]

        if (weekOfNextDate !== currentWeek) {
            currentWeek = weekOfNextDate
            weekInLife++
            week = {
                starts: nextDate,
                ends: addDays(nextDate, 6),
                numInLife: weekInLife,
                numInYear: currentWeek
            }

            if (currentWeek !== 1) {
                lastYear.weeks.push(week)
            } else {
                currentYear++
                calendar.push({
                    year: currentYear,
                    weeks: [week]
                })
            }
        }
        date = nextDate
    }

    return calendar
}

export function createLifeYearsWithWeeks(dateOfBirth: Date, lifespanInYears: number): WeekCalendar {
    let weekStartDay = getStartOfDay(dateOfBirth)

    let weekInLife = 1
    const calendar: WeekCalendar = []
    let nextYear = 1
    let nextBday = addYears(dateOfBirth, 1)

    for (let year = 1; year <= lifespanInYears; year++) {
        calendar.push({
            year: nextYear++,
            weeks: []
        })

        for (let i = 1; i <= 53; i++) {
            const nextSunday = isSunday(weekStartDay) // if week starts on Sunday (it might happen after bDay), it is 1 day long
                ? weekStartDay
                : nextDay(weekStartDay, 0)

            let endDate = compareAsc(nextSunday, nextBday) === 1
                ? nextBday
                : nextSunday

            calendar[calendar.length - 1].weeks.push({
                numInYear: i,
                numInLife: weekInLife++,
                starts: getStartOfDay(weekStartDay),
                ends: getEndOfDay(endDate),
            })

            weekStartDay = addDays(endDate, 1)
        }
        nextBday = addYears(nextBday, 1)
    }

    return calendar
}