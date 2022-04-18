import {createApp} from "vue";
import app from "./app.vue";
import {createRouter, createWebHistory} from "vue-router";
import {appRoutes} from "./router/app-routes";
import {setAppRouter} from "./router/app-router";

const router = createRouter({
    history: createWebHistory(),
    routes: appRoutes
})

setAppRouter(router)

createApp(app)
    .use(router)
    .mount('#app')