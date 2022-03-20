import {
    add, addDays, addYears, compareAsc, differenceInCalendarDays, differenceInCalendarWeeks, format,
    formatDistanceToNowStrict, getDayOfYear,
    getISODay,
    getISOWeek,
    getISOWeeksInYear, getWeek,
    getWeekOfMonth,
    getWeeksInMonth, getYear, nextDay
} from 'date-fns'
import {getLocale} from "./locale";
import {Day, Week, WeekCalendar} from "../domain";

export function getYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getProductiveYearsLeft(dateOfBirth: Date, lifespanInYears: number): string {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears - 15})
    return formatDistanceToNowStrict(dateOfDeath, {unit: "year", locale: getLocale()})
}

export function getYearsSpent(dateOfBirth: Date): string {
    return formatDistanceToNowStrict(dateOfBirth, {unit: "year", locale: getLocale()})
}

function f(date: Date) {
    return format(date, 'dd.MM.yyyy')
}

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
        starts: f(date),
        ends: f(nextDay(date, 0)),
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
                starts: f(nextDate),
                ends: f(addDays(nextDate, 6)),
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
    let weekStartDay = dateOfBirth
    let weekInLife = 1
    const calendar: WeekCalendar = []
    let nextYear = 1
    let nextBday = addYears(dateOfBirth, 1)
    console.log(nextBday)

    for (let year = 1; year <= lifespanInYears; year++) {
        calendar.push({
            year: nextYear++,
            weeks: []
        })

        for (let i = 1; i <= 53; i++) {
            const nextSunday = nextDay(weekStartDay, 0)

            let endDate = compareAsc(nextSunday, nextBday) === 1
                ? nextBday
                : nextSunday


            calendar[calendar.length - 1].weeks.push({
                numInYear: i,
                numInLife: weekInLife++,
                starts: f(weekStartDay),
                ends: f(endDate),
            })

            weekStartDay = addDays(endDate, 1)
        }
        nextBday = addYears(nextBday, 1)
    }

    return calendar
}

export function getLifeInWeeks(dateOfBirth: Date, lifespanInYears: number) {
    const dateOfDeath = add(dateOfBirth, {years: lifespanInYears})
    return differenceInCalendarWeeks(dateOfDeath, dateOfBirth)
}

export function getCurrentLifeWeek(dateOfBirth: Date): number {
    const now = new Date()
    return differenceInCalendarWeeks(now, dateOfBirth)
}