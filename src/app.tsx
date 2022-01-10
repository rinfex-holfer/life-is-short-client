import React from 'react';
import {
    BrowserRouter as Router,
    Route,
    Link
} from "react-router-dom";
import { RecoilRoot } from 'recoil';
import {routes} from "./routes";
import {MainPage} from "./components/main-page/main-page";

export const App = () => {

    return <RecoilRoot>
        <Router>
            <div>
                <ul>
                    <li><Link to={routes.ROOT}>main page</Link></li>
                    <li><Link to={routes.PAGE_1}>page 1</Link></li>
                    <li><Link to={routes.PAGE_2}>page 2</Link></li>
                </ul>

                <Route path={routes.ROOT} exact={true}>
                    <MainPage />
                </Route>

                <Route path={routes.PAGE_1}>
                    <Page1 />
                </Route>

                <Route path={routes.PAGE_2}>
                    <Page2 />
                </Route>
            </div>
        </Router>
    </RecoilRoot>
}

const Page1 = () => <div>page 1 content</div>
const Page2 = () => <div>page 2 content</div>
