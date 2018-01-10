<template>
  <div class="order">
    <div class="userInfoDiv">
      <img :src="'static/img/'+userInfo.sex+'.png'">
      <div class="userDiv"> 账户：
        <span class="username">{{userInfo.userName}}</span>
      </div>
      <div class="userDiv">余额：
        <span class="balance">{{userInfo.balance}}元</span>
      </div>
    </div>
    <div class="promptDiv">
      <div class="prompt">就餐时间：下一个工作日中午</div>
      <div class="prompt">点餐时间：早 {{systemParam.startTime}}点 至 晚 {{systemParam.endTime}}点</div>
    </div>
    <div class="admire" v-show="isAdmire">金额不足，请先充值</div>
    <div class="admire" v-show="showNoUser">没有点餐账户，请联系管理员添加</div>
    <div class="menuDiv">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <span>菜品明细：</span>
          <i class="el-icon-arrow-down isShowMenuButton" @click="isShowMenu=!isShowMenu"></i>
        </div>
        <el-collapse-transition>
          <div v-show="isShowMenu">
            <div class="dish" v-for="(dish,index) in menuList" :key="index">{{dish.name}}</div>
          </div>
        </el-collapse-transition>
      </el-card>
    </div>
    <div class="todayOrderList">
      <mt-cell title="今日点餐情况："></mt-cell>
      <mt-cell v-for="(order,index) in orderList" :key="index" :title="order.orderName" v-if="order.orderType>0" :label="order.createDate">
        <span v-if="order.isCancle" style="color: red" class="buttonText">已退订</span>
        <span v-else style="color: blue" class="buttonText" @click="cancel(order.id)">退订</span>
      </mt-cell>
      <span class="space"></span>
    </div>
    <mt-button v-show="!isAdmire&&!showNoUser&&isOrderOrNot" class="saveButton" type="primary" size="large" @click.native="commit">点餐</mt-button>
    <mt-popup v-model="dialoglunchType" popup-transition="popup-fade" style="width: 80%;">
      <mt-radio title="点餐类别" align="right" v-model="lunchType" :options="lunchTypeOptions">
      </mt-radio>
      <div class="mint-msgbox-btns" style="border-top: 1px solid #ddd;">
        <button class="mint-msgbox-btn mint-msgbox-cancel" style="" @click="dialoglunchType = false">取消</button>
        <button class="mint-msgbox-btn mint-msgbox-confirm" @click="commitAction()">确定点餐</button>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import * as AnalysisRequestParam from "@/utils/AnalysisRequestParam";
export default {
  name: "Order",
  directives: {},
  components: {},
  data() {
    return {
      isAdmire: false,
      showNoUser: true,
      isOrderOrNot: false,
      isShowMenu: true,
      dialoglunchType: false,
      orderTimes: 0,
      lunchType: "c",
      lunchTypeATimes: 0,
      lunchTypeOptions: [
        {
          label: "a餐",
          value: "1",
          disabled: true
        },
        {
          label: "b餐",
          value: "2",
          disabled: true
        },
        {
          label: "c餐",
          value: "3"
        }
      ],
      disabledLunch: [],
      moneyA: 0,
      moneyB: 0,
      moneyC: 0
    };
  },
  props: {},
  computed: {
    code() {
      return this.$store.state.init.code;
    },
    systemParam() {
      return this.$store.state.init.systemParam;
    },
    userInfo() {
      return this.$store.state.init.userInfo;
    },
    menuList() {
      return this.$store.state.init.menuList;
    },
    orderList() {
      return this.$store.state.order.orderList;
    }
  },
  watch: {
    orderList(list) {
      let vm = this;

      if (vm.systemParam != null) {
        vm.updatelunchTypeATimes();
      }
      if (vm.userInfo != null) {
        vm.updateIsAdmire();
      }
    },
    systemParam(systemParam) {
      let vm = this;
      if (!systemParam.isOrderOrNot) {
        MessageBox.alert("点餐程序已关闭", "提示");
        vm.isOrderOrNot = false;
      } else {
        vm.isOrderOrNot = true;
      }
      vm.moneyA = systemParam.lunch[0].money;
      vm.moneyB = systemParam.lunch[1].money;
      vm.moneyC = systemParam.lunch[2].money;
      vm.disabledLunch = [];
      vm.disabledLunch.push({
        label: systemParam.lunch[0].label,
        value: systemParam.lunch[0].value,
        money: vm.moneyA,
        disabled: true
      });
      vm.disabledLunch.push({
        label: systemParam.lunch[1].label,
        value: systemParam.lunch[1].value,
        money: vm.moneyB,
        disabled: true
      });
      vm.disabledLunch.push({
        label: systemParam.lunch[2].label,
        value: systemParam.lunch[2].value,
        money: vm.moneyC,
        disabled: true
      });
      if (vm.orderList != null) {
        vm.updatelunchTypeATimes();
      }
    },
    userInfo(userInfo) {
      let vm = this;
      vm.showNoUser = false;
      if (vm.orderList != null) {
        vm.updateIsAdmire();
        vm.updatelunchTypeATimes();
      }
    }
  },
  methods: {
    updateIsAdmire() {
      let vm = this;
      let balance = vm.userInfo.balance;
      if (
        (vm.userInfo.userType == "a" &&
          ((vm.lunchTypeATimes == 0 && balance < vm.moneyA) ||
            (vm.lunchTypeATimes > 0 &&
              balance < vm.moneyB &&
              balance < vm.moneyC))) ||
        (vm.userInfo.userType == "b" &&
          balance < vm.moneyB &&
          balance < vm.moneyC) ||
        (vm.userInfo.userType == "c" && balance < vm.moneyC)
      ) {
        vm.isAdmire = true;
      } else {
        vm.isAdmire = false;
      }
    },
    updatelunchTypeATimes() {
      let vm = this;
      vm.orderTimes = 0;
      vm.lunchTypeATimes = 0;
      for (let i = 0; i < vm.orderTimes; i++) {
        if (vm.orderList[i].orderType > 0) {
          vm.orderTimes++;
        }
        if (vm.orderList[i].orderType == vm.systemParam.lunch[0].value) {
          vm.lunchTypeATimes++;
        }
      }
    },
    cancel(orderId) {
      let vm = this;
      if (!vm.checkDate()) {
        MessageBox.alert(
          "只能在 " +
            vm.systemParam.startTime +
            " 至 " +
            vm.systemParam.endTime +
            " 间退餐",
          "提示"
        );
        return;
      }
      MessageBox.confirm("确定取消订餐?").then(action => {
        vm.$store.commit("cancle", { code: vm.code, Id: orderId });
        vm.requestToday(500);
      });
    },
    checkDate() {
      let vm = this;
      var current = new Date(); //当前时间
      var hour = current.getHours();
      if (hour >= vm.systemParam.endTime || hour < vm.systemParam.startTime) {
        return false;
      }
      return true;
    },
    commit() {
      let vm = this;
      if (!vm.checkDate()) {
        MessageBox.alert(
          "只能在 " +
            vm.systemParam.startTime +
            " 至 " +
            vm.systemParam.endTime +
            " 间点餐",
          "提示"
        );
        return;
      }
      if (vm.orderTimes > 0) {
        MessageBox.confirm("今日已点餐" + vm.orderTimes + "次,是否继续点餐?")
          .then(action => {
            vm.setDialoglunchType();
          })
          .catch(error => {});
      } else {
        vm.setDialoglunchType();
      }
    },
    setDialoglunchType() {
      let vm = this;
      vm.dialoglunchType = true;
      vm.lunchTypeOptions = [];
      let balance = vm.userInfo.balance;
      if (
        vm.lunchTypeATimes >= 1 ||
        vm.userInfo.userType != "1" ||
        balance < vm.moneyA
      ) {
        vm.lunchTypeOptions.push(vm.disabledLunch[0]);
      } else {
        vm.lunchTypeOptions.push(vm.systemParam.lunch[0]);
      }
      if (vm.userInfo.userType == "3" || balance < vm.moneyB) {
        //c 类用户 或者不足b餐的金额
        vm.lunchTypeOptions.push(vm.disabledLunch[1]);
      } else {
        vm.lunchTypeOptions.push(vm.systemParam.lunch[1]);
      }
      if (balance < vm.moneyC) {
        vm.lunchTypeOptions.push(vm.disabledLunch[2]);
      } else {
        vm.lunchTypeOptions.push(vm.systemParam.lunch[2]);
      }
    },
    commitAction() {
      let vm = this;
      vm.dialoglunchType = false;
      vm.$store.commit("order", { code: vm.code, orderType: vm.lunchType });
      vm.requestToday(500);
    },
    requestToday(times) {
      let vm = this;
      setTimeout(() => {
        vm.$store.commit("getUserInfo", { code: vm.code });
      }, times);
      setTimeout(() => {
        let today = new Date().toLocaleDateString();
        vm.$store.commit("getOrderList", {
          name: "null",
          code: vm.code,
          startDate: today,
          endDate: today,
          orderType: 0,
          changeType: 2,
          page: 0,
          isCancle: 1
        });
      }, 2 * times);
    }
  },
  beforeCreate() {},
  created() {},
  destroyed() {},
  mounted() {
    Indicator.open({
      text: "加载中...",
      spinnerType: "fading-circle"
    });
    let vm = this;
    vm.$store.commit("getSystemParam", { code: vm.code });
    vm.requestToday(500);
    setTimeout(() => {
      vm.$store.commit("getMeunList", { code: vm.code });
      Indicator.close();
    }, 1500);
  }
};
</script>
<style lang="css" scoped>
.order {
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
.promptDiv {
  text-align: center;
  margin: 5px 0;
  position: relative;
}
.prompt {
  margin: 3px 0;
}
.admire {
  text-align: center;
  font-size: 16px;
  color: red;
  margin: 5px;
}
/* 菜品列表 */
.clearfix {
  font-size: 20px;
  margin: 5px 10px;
}
.dish {
  position: relative;
  left: 5vw;
  margin: 2.5px 0;
  width: 29%;
  display: inline-table;
}
.isShowMenuButton {
  float: right;
}
.saveButton {
  position: fixed;
  bottom: 0;
  min-height: 60px;
  border-radius: 0px;
}
.space {
  width: 100%;
  height: 60px;
  position: absolute;
}
.buttonText {
  cursor: pointer;
}
</style>