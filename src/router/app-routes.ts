import MainPage from "../components/main-page/main-page.vue";
import Calendar from "../components/calendar/calendar.vue";
import LifeCalendar from "../components/calendar/life.vue";
import YearCalendar from "../components/calendar/year.vue";
import MonthCalendar from "../components/calendar/month.vue";
import WeekCalendar from "../components/calendar/week.vue";

export const appRoutes = [
    { path: '/', component: MainPage },
    {
        path: '/calendar',
        component: Calendar,
        children: [
            { path: '', component: LifeCalendar },
            { path: 'year', component: YearCalendar },
            { path: 'month', component: MonthCalendar },
            { path: 'week/:weekNum', component: WeekCalendar },
        ]
    },
]