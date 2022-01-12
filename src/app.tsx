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
import {Calendar} from "./components/calendar/calendar";

const queryClient = new QueryClient()

export const App = () => {
    return <RecoilRoot>
        <QueryClientProvider client={queryClient}>
            <Router>
                <div>
                    <ul>
                        <li><Link to={routes.MAIN}>main page</Link></li>
                        <li><Link to={routes.CALENDAR}>calendar</Link></li>
                    </ul>

                    <Route path={routes.MAIN} exact={true}>
                        <MainPage />
                    </Route>

                    <Route path={routes.CALENDAR}>
                        <Calendar />
                    </Route>
                </div>
            </Router>
        </QueryClientProvider>
    </RecoilRoot>
}
