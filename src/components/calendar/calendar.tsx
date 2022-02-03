import {getDate, getDay, getDaysInMonth, getISOWeek, getISOWeeksInYear, getWeekYear} from "date-fns";
import React from "react";
import CSS from './calendar.module.css'
import classNames from "classnames";

export function CalendarWeek() {
    const day = getDay(Date.now())
    return <div className={CSS.container}>
        {Array.from({length: 7}, (_, i) =>
            <span
                className={classNames(CSS.item, {
                    [CSS.itemSpent]: i < day,
                    [CSS.itemActive]: i === day
                })}
            >
                {i}
            </span>
        )}
    </div>
}

export function CalendarMonth() {
    const now = Date.now()
    const daysInMonth = getDaysInMonth(now)
    const dayOfMonth = getDate(now)
    return <div className={CSS.container}>
        {Array.from({length: daysInMonth}, (_, i) =>
            <span
                className={classNames(CSS.item, {
                    [CSS.itemSpent]: i < dayOfMonth,
                    [CSS.itemActive]: i === dayOfMonth
                })}
            >
                {i}
            </span>
        )}
    </div>
}

export function CalendarYear() {
    const now = Date.now()
    const weeksInYear = getISOWeeksInYear(now)
    const week = getISOWeek(now)

    return <div className={CSS.container}>
        {Array.from({length: weeksInYear}, (_, i) =>
            <span
                className={classNames(CSS.item, {
                    [CSS.itemSpent]: i < week,
                    [CSS.itemActive]: i === week
                })}
            >
                {i}
            </span>
        )}
    </div>
}

export function WeeksOfLife() {
    const now = Date.now()

}