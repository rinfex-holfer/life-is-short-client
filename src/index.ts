import {createApp} from "vue";
import app from "./app.vue";
import {createRouter, createWebHistory} from "vue-router";
import MainPage from "./components/main-page/main-page.vue";
import Calendar from "./components/calendar/calendar.vue";
import LifeCalendar from "./components/calendar/life.vue";
import YearCalendar from "./components/calendar/year.vue";
import MonthCalendar from "./components/calendar/month.vue";
import WeekCalendar from "./components/calendar/week.vue";
import {appRoutes} from "./routes";

const routes = [
    { path: appRoutes.MAIN, component: MainPage },
    {
        path: appRoutes.CALENDAR,
        component: Calendar,
        children: [
            { path: '', component: LifeCalendar },
            { path: 'year', component: YearCalendar },
            { path: 'month', component: MonthCalendar },
            { path: 'week', component: WeekCalendar },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

createApp(app)
    .use(router)
    .mount('#app')