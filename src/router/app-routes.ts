import MainPage from "../components/pages/page-main.vue";
import Calendar from "../components/calendar/calendar.vue";
import LifeCalendar from "../components/calendar/life-in-months.vue";
import YearCalendar from "../components/calendar/year.vue";
import MonthCalendar from "../components/month.vue";
import WeekCalendar from "../components/week.vue";

export const appRoutes = [
    { path: '/', component: MainPage },
    {
        path: '/calendar',
        component: Calendar,
        children: [
            { path: '', component: LifeCalendar },
            { path: 'year', component: YearCalendar },
            { path: 'month/:monthNum', component: MonthCalendar },
            { path: 'week/:weekNum', component: WeekCalendar },
        ]
    },
]