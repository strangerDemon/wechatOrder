<template>
  <div class="Main">
    <order v-if="page=='order'"></order>
    <order-list v-if="page=='orderlist'"></order-list>
    <order-certificate v-if="page=='ordercertificate'"></order-certificate>
    <redemption v-if="page=='redemption'"></redemption>
    <no-user v-if="page=='nouser'"></no-user>
  </div>
</template>
<script>
import * as AnalysisRequestParam from "@/utils/AnalysisRequestParam";
import Order from "./orderLunch/Order.vue"
import OrderList from "./orderLunch/OrderList.vue"
import OrderCertificate from "./orderLunch/OrderCertificate.vue"
import Redemption from "./orderLunch/Redemption"
import NoUser from "./orderLunch/NoUser.vue"
export default {
  name: "Main",
  directives: {},
  components: {
    Order,OrderList,OrderCertificate,NoUser,Redemption
  },
  data() {
    return {
      page:"",
    };
  },
  props: {},
  computed: {},
  watch: {},
  methods: {},
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    let vm=this
    vm.page = AnalysisRequestParam.requestParam("page").toLowerCase();
    let code = AnalysisRequestParam.requestParam("code");
    let isAdmin = AnalysisRequestParam.requestParam("isAdmin") || false;
    this.$store.commit("setPageUrlParam", { code: code, isAdmin: isAdmin });
  }
};
</script>
<style lang="css" scoped>

</style>