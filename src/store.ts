import {computed, Ref, ref, watchEffect} from "vue";
import {LifeWeek, User, YearWeekLifeCalendar} from "./domain";
import {createLifeYearsWithWeeks} from "./utils/calendars";
import {getYearsSpentNum} from "./utils/date";
import {isAfter} from "date-fns";
import {LangKey} from "./utils/locale";

export const currentUser = ref<User>({
    id: "qwerty",
    name: "Геннадий",
    dateOfBirth: "1990-11-26T23:00:00.000Z",
    // name: "Федор Федорович",
    // dateOfBirth: new Date(2000, 0, 1),
    expectedLifespan: 70,
    locale: LangKey.RU,
})

export const currentTime = ref<Date>(new Date())

export const lifeInWeeks = computed(() => {
    const birthDate = new Date(currentUser.value.dateOfBirth);
    return createLifeYearsWithWeeks(birthDate, currentUser.value.expectedLifespan)
})

export const currLifeYear = computed(() => {
    return getYearsSpentNum(new Date(currentUser.value.dateOfBirth)) + 1
})

export const currentLifeWeek = computed<LifeWeek>(() => {
    const now = new Date()

    const week = lifeInWeeks.value[currLifeYear.value-1]
        .weeks
        .find(week => !isAfter(week.starts, now) && !isAfter(now, week.ends))

    if (!week) {
        console.error("no current life week")
        const lastYear = lifeInWeeks.value[lifeInWeeks.value.length - 1]
        return lastYear.weeks[lastYear.weeks.length - 1]
    }

    return week
})

export const currentLifeWeekNumber = computed(() => {
    return currentLifeWeek.value?.numInLife || 0
})