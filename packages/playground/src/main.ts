import { createApp, h } from "vue";
import { RouterProvide } from "vue3-navigation";
import  {createRouter,createWebHistory} from "vue-router"
import App from "./App.vue";


const crateRouter = createRouter({
  history:createWebHistory(),
  routes:[
    {
      path:"/o1",
      name:"o1",
      component:()=>import("./o1.vue")
    },
    {
      path:"/o2",
      name:"o2",
      component:()=>import("./o2.vue")
    },
    {
      path:"/o3",
      name:"o3",
      component:()=>import("./o3.vue")
    }
  ]
})

const app =  createApp({
  render() {
    return h(RouterProvide, null, {
      default:()=>h(App)
    });
  },
});

app.use(crateRouter);
app.mount("#app");
