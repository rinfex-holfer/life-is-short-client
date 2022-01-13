import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import { QueryClient, QueryClientProvider } from 'react-query'
import {routes} from "./routes";
import {MainPage} from "./components/main-page/main-page";
import {CalendarWeek, CalendarMonth, CalendarYear} from "./components/calendar/calendar";

const queryClient = new QueryClient()

export const App = () => {
    return <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <Router>
                <div>
                    <ul>
                        <li><Link to={routes.MAIN}>главная</Link></li>
                        <li><Link to={routes.CALENDAR_WEEK}>неделя</Link></li>
                        <li><Link to={routes.CALENDAR_MONTH}>месяц</Link></li>
                        <li><Link to={routes.CALENDAR_YEAR}>год</Link></li>
                    </ul>

                    <Route path={routes.MAIN} exact={true}>
                        <MainPage />
                    </Route>

                    <Route path={routes.CALENDAR_WEEK} component={CalendarWeek} />
                    <Route path={routes.CALENDAR_MONTH} component={CalendarMonth} />
                    <Route path={routes.CALENDAR_YEAR} component={CalendarYear} />
                </div>
            </Router>
        </QueryClientProvider>
    </RecoilRoot>
}
