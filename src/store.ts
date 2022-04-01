import {computed, Ref, ref, watchEffect} from "vue";
import {User, YearWeekLifeCalendar} from "./domain";
import {createLifeYearsWithWeeks} from "./utils/calendars";
import {getYearsSpentNum} from "./utils/date";
import {isAfter} from "date-fns";

export const currentUser = ref<User | undefined>(undefined)

export const currentTime = ref<Date>(new Date())

export const lifeInWeeks = computed(() => {
    if (!currentUser.value) return [] as YearWeekLifeCalendar
    return createLifeYearsWithWeeks(currentUser.value.dateOfBirth, currentUser.value.expectedLifespan)
})

export const currLifeYear = computed(() => {
    const user = currentUser.value
    if (!user) return 0
    return getYearsSpentNum(user.dateOfBirth) + 1
})

export const currentLifeWeek = computed(() => {
    const user = currentUser.value
    if (!user) return null
    const now = new Date()

    const week = lifeInWeeks.value[currLifeYear.value-1]
        .weeks
        .find(week => !isAfter(week.starts, now) && !isAfter(now, week.ends))

    if (!week) return null

    return week
})