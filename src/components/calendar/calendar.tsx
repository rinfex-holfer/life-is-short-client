import {getDay} from "date-fns";
import React from "react";

export function Calendar() {
    const now = Date.now()
    const day = getDay(now)
    return <div>
        {Array.from({length: 7}, (_, i) => i === day ? <strong>{i}</strong> : <span>{i}</span>)}
    </div>
}