import {Week, YearWeekLifeCalendar} from "../domain";
import {
    add,
    addDays,
    addYears,
    endOfDay,
    getWeek,
    getYear,
    isAfter,
    isSunday,
    nextDay,
    startOfDay,
    subDays
} from "date-fns";

export function createCalendarYearsWithWeeks(dateOfBirth: Date, lifespanInYears: number): YearWeekLifeCalendar {
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
    const calendar: YearWeekLifeCalendar = [{
        numInLife: yearOfBirth,
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
                    numInLife: currentYear,
                    weeks: [week]
                })
            }
        }
        date = nextDate
    }

    return calendar
}

export function createLifeYearsWithWeeks(dateOfBirth: Date, lifespanInYears: number): YearWeekLifeCalendar {
    let weekStartDay = startOfDay(dateOfBirth)

    let weekInLife = 1
    const calendar: YearWeekLifeCalendar = []
    let nextYear = 1
    let nextBday = addYears(dateOfBirth, 1)
    let dayBeforNextBday = subDays(nextBday, 1)

    for (let year = 1; year <= lifespanInYears; year++) {
        calendar.push({
            numInLife: nextYear++,
            weeks: []
        })

        for (let i = 1; i <= 53; i++) {
            const nextSunday = isSunday(weekStartDay) // if week starts on Sunday (it might happen after bDay), it is 1 day long
                ? weekStartDay
                : nextDay(weekStartDay, 0)

            let endDate = isAfter(nextSunday, dayBeforNextBday)
                ? dayBeforNextBday
                : nextSunday

            calendar[calendar.length - 1].weeks.push({
                numInYear: i,
                numInLife: weekInLife++,
                starts: startOfDay(weekStartDay),
                ends: endOfDay(endDate),
            })

            weekStartDay = addDays(endDate, 1)
        }
        nextBday = addYears(nextBday, 1)
        dayBeforNextBday = subDays(nextBday, 1)
    }

    return calendar
}