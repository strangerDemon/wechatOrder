<template>
  <div class="Redemption">
    <div v-show="!isShowResult">
      <div class="userInfoDiv">
        <img :src="'static/img/'+userInfo.sex+'.png'">
        <div class="userDiv"> 账户：
          <span class="username">{{userInfo.userName}}</span>
        </div>
        <div class="userDiv">余额：
          <span class="balance">{{userInfo.balance}}元</span>
        </div>
      </div>
      <div class="admire">请现场与工作人员操作</div>
      <div class="admire" v-show="!showCommit">没有点餐账户，请联系管理员添加</div>
      <div class="param">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>换购类型（多选）</span>
            <i class="el-icon-arrow-down isShowButton" @click="isShowRedemption=!isShowRedemption"></i>
          </div>
          <el-collapse-transition>
            <div v-show="isShowRedemption">
              <mt-checklist title="" align="right" v-model="redemption" :options="redemptionList">
              </mt-checklist>
            </div>
          </el-collapse-transition>
        </el-card>
        <mt-field class="clearfix" label="金额" :placeholder="'成交金额[0~'+userInfo.balance+'元]'" type="number" onKeypress="return (/[\d]/.test(String.fromCharCode(event.keyCode)))" v-model="money"></mt-field>
      </div>
      <mt-button v-show="showCommit" class="saveButton" type="primary" size="large" @click.native="commit">确定</mt-button>
    </div>
    <div class="result" v-show="isShowResult">
      <div class="redemptionDetails">
        <h2 class="titles">换购详细单</h2>
        <span class="title">换购详细：</span>
        <ul>
          <li class="item" v-for="(item,index) in redemptionName" :key="index">{{item}}</li>
        </ul>
        <span class="title">换购金额：</span>
        <span class="money">{{money}}元</span>
      </div>
      <mt-button class="saveButton" size="large" type="primary" @click.native="returnRedemption">返回继续换购</mt-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Redemption",
    directives: {},
    components: {},
    data() {
      return {
        isShowRedemption: true,
        redemption: [],
        redemptionName: [],
        money: 0,
        isShowResult: false,
        showCommit: false
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
      redemptionList() {
        return this.$store.state.init.redemptionList;
      }
    },
    watch: {
      userInfo(userInfo) {
        this.showCommit = true;
      }
    },
    methods: {
      commit() {
        let vm = this;
        if (vm.money > vm.userInfo.balance) {
          MessageBox.alert("成交金额不能大于" + vm.userInfo.balance, "警告");
          return;
        } else if (vm.redemption.length == 0) {
          MessageBox.alert("请选择换购物品", "警告");
          return;
        } else {
          vm.$store.commit("doChangeBuy", {
            code: vm.code,
            value: vm.redemption.toString(),
            money: vm.money
          });
          vm.redemptionList.forEach(element => {
            if (vm.redemption.includes(element.value)) {
              vm.redemptionName.push(element.label);
            }
          });
          vm.isShowResult = true;
        }
      },
      returnRedemption() {
        let vm = this;
        vm.money = 0;
        vm.redemption = [];
        vm.redemptionName = [];
        vm.requestUserInfo();
        vm.isShowResult = false;
      },
      requestUserInfo() {
        let vm = this;
        vm.$store.commit("getUserInfo", {
          code: vm.code
        });
      }
    },
    beforeCreate() {},
    created() {},
    destroyed() {},
    mounted() {
      let vm = this;
      Indicator.open({
        text: "加载中...",
        spinnerType: "fading-circle"
      });
      vm.$store.commit("getRedemptionList", {
        code: vm.code,
        success: function() {
          Indicator.close();
          vm.requestUserInfo();
        },
        error: function() {
          Indicator.close();
        }
      });
    }
  };
</script>

<style lang="css" scoped>
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
  .admire {
    text-align: center;
    font-size: 16px;
    color: red;
    margin: 5px;
  }
  .param {
    padding-bottom: 75px;
  }
  .saveButton {
    position: fixed;
    bottom: 0;
    min-height: 60px;
    border-radius: 0px;
  }
  .clearfix {
    font-size: 20px;
    margin: 5px 10px;
  }
  .isShowButton {
    float: right;
  }
  .moneyInput {
    display: inline-block;
    width: 80%;
  }
  .result {
    position: absolute;
    width: 100%;
    font-size: 18px;
    padding-bottom: 75px;
  }
  .redemptionDetails {
    margin: 10px;
  }
  .titles {
    text-align: center;
  }
  .title {
    display: block;
    width: 100%;
    margin: 5px 10px;
  }
  .item {
    margin: 10px 10px;
  }
  .money {
    text-align: center;
    width: 100%;
    display: block;
    font-size: 24px;
    color: red;
  }
</style>
