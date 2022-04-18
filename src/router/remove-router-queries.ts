import {RouteLocationNormalized} from "vue-router";

export function removeRouterQueries(to: RouteLocationNormalized, keysToRemove: string[]) {
    const newQuery = {...to.query}

    keysToRemove.forEach(key => delete newQuery[key])

    return {query: newQuery}
}