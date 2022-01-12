import React from 'react';

import CSS from './main-page.module.css'
import {LifeCounter} from "../life-counter/life-counter";

export const MainPage = () => {
    return <div className={CSS.container}>
        <LifeCounter />
    </div>
}