import Vue from "vue";
import Router from "vue-router";
import Main from "@/components/Main";
import Order from "@/components/orderLunch/Order";
import OrderList from "@/components/orderLunch/OrderList";
import OrderCertificate from "@/components/orderLunch/OrderCertificate";
import NoUser from "@/components/orderLunch/NoUser";
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Main",
      component: Main
    },
    {
      path: "/Order",
      name: "Order",
      component: Order
    },
    {
      path: "/OrderList",
      name: "OrderList",
      component: OrderList
    },
    {
      path: "/OrderCertificate",
      name: "OrderCertificate",
      component: OrderCertificate
    },
    {
      path: "/NoUser",
      name: "NoUser",
      component: NoUser
    }
  ]
});
