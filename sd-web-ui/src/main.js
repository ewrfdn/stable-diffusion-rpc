import { createApp } from "vue";
import "./style.css";
import "ant-design-vue/dist/antd.css";
import Antd from "ant-design-vue";
import App from "./App.vue";
import store from "./store";
import 'viewerjs/dist/viewer.css'
import VueViewer from 'v-viewer'
const app = createApp(App);
app.use(VueViewer)
app.use(store);

app.use(Antd);

app.mount("#app");
