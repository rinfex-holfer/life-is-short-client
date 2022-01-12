import React, {useEffect, useState} from 'react';

import CSS from './life-counter.module.css'
import {User} from "../../domain";
import {getProductiveYearsLeft, getYearsLeft, getYearsSpent} from "../../utils/date";
import {getUser} from "../../domain/api/user";
import {useQuery} from "react-query";

function loadUser(userId: string) {
    const {isSuccess, data} = useQuery(
        `load_user_${userId}`,
        () => getUser(userId)
    )

    return data;
}

export const LifeCounter = () => {
    const user = loadUser('temp_id')

    if (!user) return <div className={CSS.container}>...</div>;

    return <div className={CSS.container}>
        Прожито: {getYearsSpent(user.dateOfBirth)}
        <br/>
        Продуктивной жизни осталось: {getProductiveYearsLeft(user.dateOfBirth, user.expectedLifespan)}
        <br/>
        Жить осталось: {getYearsLeft(user.dateOfBirth, user.expectedLifespan)}
    </div>
}