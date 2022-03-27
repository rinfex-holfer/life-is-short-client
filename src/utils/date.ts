import {
    add,
    differenceInYears,
    format,
    formatDistanceToNowStrict,
    setHours,
    setMilliseconds,
    setMinutes,
    setSeconds,
} from 'date-fns'
import {getLocale} from "./locale";

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

export function getYearsSpentNum(dateOfBirth: Date): number {
    return differenceInYears(new Date(), dateOfBirth)
}

export function numF(date: Date) {
    return format(date, 'dd.MM.yyyy')
}

export function getStartOfDay(day: Date): Date {
    day = setHours(day, 0)
    day = setMinutes(day, 0)
    day = setSeconds(day, 0)
    day = setMilliseconds(day, 1)
    return day;
}

export function getEndOfDay(day: Date): Date {
    day = setHours(day, 23)
    day = setMinutes(day, 59)
    day = setSeconds(day, 59)
    day = setMilliseconds(day, 999)
    return day;
}

