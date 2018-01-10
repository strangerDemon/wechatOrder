<template>
  <div class="OrderCertificate">
    <div class="userInfoDiv">
      <img :src="'static/img/'+userInfo.sex+'.png'">
      <div class="userDiv"> 账户：
        <span class="username">{{userInfo.userName}}</span>
      </div>
    </div>
    <div class="orderList">
      <span class="title">{{dateStr}}</span>
      <span class="title">就餐凭证</span>
      <span class="item" v-for="(lunch,index) in lunchTimes" v-if="lunch>0" :key="index">
        <span class="lunchName">{{lunchName[index]}}</span>
        <span class="lunchTimes">{{lunch}}份</span>
      </span>
    </div>
  </div>
</template>
<script>
import * as AnalysisRequestParam from "@/utils/AnalysisRequestParam";
const week = ["星期天", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
export default {
  name: "OrderCertificate",
  directives: {},
  components: {},
  data() {
    return {
      dateStr: "",
      lunchName: [],
      lunchTimes: []
    };
  },
  props: {},
  computed: {
    code() {
      return this.$store.state.init.code;
    },
    userInfo() {
      return this.$store.state.init.userInfo;
    },
    orderList() {
      return this.$store.state.order.orderList;
    }
  },
  watch: {
    orderList(orderList) {
      let vm = this;
      vm.lunchTimes = new Array(3).fill(0);
      vm.lunchName = new Array(3);
      orderList.forEach(element => {
        vm.lunchName[element.orderType - 1] = element.orderName;
        vm.lunchTimes[element.orderType - 1]++;
      });
    }
  },
  methods: {},
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    let vm = this;
    let today = new Date();
    vm.dateStr =
      today.getMonth() +
      1 +
      "月" +
      today.getDate() +
      "日  " +
      week[today.getDay()];
    vm.$store.commit("getUserInfo", { code: vm.code });
    let day = new Date();
    let yesterday = new Date(
      day.setTime(day.getTime() - 24 * 60 * 60 * 1000)
    ).toLocaleDateString();
    setTimeout(() => {
      vm.$store.commit("getOrderList", {
        name: "null",
        code: vm.code,
        startDate: yesterday,
        endDate: yesterday,
        orderType: 0,
        changeType: 2,
        page: 0,
        isCancle: 1
      });
      Indicator.close();
    }, 500);
  }
};
</script>
<style lang="css" scoped>
.OrderCertificate {
  position: absolute;
  height: 100%;
  width: 100%;
  font-size: 18px;
  scroll-behavior: auto;
}
.userInfoDiv {
  text-align: center;
  margin: 13px 8px 8px;
}
.userDiv {
  display: block;
  margin: 5px 0;
  position: relative;
}

.balance,
.username {
  font-family: fantasy;
}
.orderList{
  margin-top:10px;
}
.item {
  margin: 35px 10px;
  font-size: 40px;
  display: block;
}
.lunchTimes{
  float: right;
  margin-right: 25px;
}
.lunchName{
  margin-left:25px;
}
.title {
  font-size: 34px;
  text-align: center;
  display: block;
  margin: 10px;
}
</style>