import { createApp } from "vue";
import App from "./App.vue";
import useUxpHotreload from "./useUxpHotreload";

useUxpHotreload();
createApp(App).mount("main");
