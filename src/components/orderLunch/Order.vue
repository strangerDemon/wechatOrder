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
    <!--<div class="admire" v-show="isAdmire">金额不足，请先充值</div>-->
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
      <mt-cell v-for="(order,index) in orderList" :key="index" :title="order.orderName" v-show="order.orderType>0" :label="order.createDate">
        <span v-if="order.isCancel" style="color: red" class="buttonText">已退订</span>
        <span v-else style="color: blue" class="buttonText" @click="cancel(order.id)">退订</span>
      </mt-cell>
      <span class="space"></span>
    </div>
    <mt-button v-show="!showNoUser&&isOrderOrNot" class="saveButton" type="primary" size="large" @click.native="commit">点餐</mt-button>
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
        lunchTypeTimes: [],
        lunchTypeOptions: [{
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
          vm.updatelunchTypeTimes();
        }
        // if (vm.userInfo != null) {
        //   vm.updateIsAdmire();
        // }
      },
      systemParam(systemParam) {
        let vm = this;
        if (!systemParam.isOrderOrNot) {
          MessageBox.alert("点餐程序已关闭", "提示");
          vm.isOrderOrNot = false;
        } else {
          vm.isOrderOrNot = true;
        }
        if (vm.orderList != null) {
          vm.updatelunchTypeTimes();
        }
      },
      userInfo(userInfo) {
        let vm = this;
        vm.showNoUser = false;
        if (vm.orderList != null) {
          // vm.updateIsAdmire();
          vm.updatelunchTypeTimes();
        }
      }
    },
    methods: {
      updateIsAdmire() {
        let vm = this;
        let balance = vm.userInfo.balance;
      },
      updatelunchTypeTimes() {
        let vm = this;
        vm.orderTimes = 0;
        vm.lunchTypeTimes = new Array(vm.systemParam.lunch.length).fill(0);
        for (let i = 0; i < vm.orderList.length; i++) {
          if (vm.orderList[i].orderType > 0) {
            vm.orderTimes++;
          }
          for (let j = 0, length = vm.systemParam.lunch.length; j < length; j++) {
            if (vm.orderList[i].orderType == vm.systemParam.lunch[j].value) {
              vm.lunchTypeTimes[j]++;
            }
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
          vm.$store.commit("cancel", {
            code: vm.code,
            Id: orderId,
            func: function() {
              vm.requestToday(100);
            }
          });
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
        vm.lunchTypeOptions = [];
        vm.lunchType = "c";
        let balance = vm.userInfo.balance;
        let canOrder = false;
        for (let i = 0, length = vm.systemParam.lunch.length; i < length; i++) {
          if (
            vm.lunchTypeTimes[i] >= vm.systemParam.lunch[i].maxOrderTimes ||
            vm.userInfo.userType > vm.systemParam.lunch[i].value ||
            balance < vm.systemParam.lunch[i].money
          ) {
            vm.lunchTypeOptions.push({
              value: vm.systemParam.lunch[i].value,
              label: vm.systemParam.lunch[i].label,
              disabled: true
            });
          } else {
            vm.lunchTypeOptions.push(vm.systemParam.lunch[i]);
            canOrder = true;
          }
        }
        if (canOrder) {
          vm.dialoglunchType = true;
        } else {
          MessageBox.alert("无法点餐（点餐次数已满或金额不足）");
        }
      },
      commitAction() {
        let vm = this;
        vm.dialoglunchType = false;
        let isSelect = false;
        for (let i = 0, length = vm.systemParam.lunch.length; i < length; i++) {
          if (vm.systemParam.lunch[i].value == vm.lunchType) {
            isSelect = true;
          }
        }
        if (!isSelect) {
          MessageBox.alert("请选择订餐类别", "提示");
          return;
        }
        vm.$store.commit("order", {
          code: vm.code,
          orderType: vm.lunchType,
          func: function() {
            vm.requestToday(100);
          }
        });
      },
      requestToday(times) {
        let vm = this;
        setTimeout(function() {
          vm.$store.commit("getUserInfo", {
            code: vm.code,
            openId: "",
            success: function() {
              vm.$store.commit("getTodayOrder", {
                name: "null",
                code: vm.code
              });
            }
          });
        }, times);
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
      vm.$store.commit("getSystemParam", {
        code: vm.code,
        success: function() {
          vm.requestToday(500);
          vm.$store.commit("getMenuList", {
            code: vm.code
          });
          Indicator.close();
        },
        error:function(){
          Indicator.close();
        }
      });
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
