import {Router} from "vue-router";

let appRouter: Router | null = null

// TODO это кал, конечно, надо переписать
export function setAppRouter(router: Router) {
    appRouter = router
}

export function getAppRouter(): Router {
    if (!appRouter) throw Error('trying to use router before initialization')
    return appRouter
}