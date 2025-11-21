import { createApp } from "vue";
import App from "./App.vue";
import useUxpHotReload from "./useUxpHotReload";
import router from "./router";

useUxpHotReload();

const app = createApp(App);

app.use(router);
app.mount("main");