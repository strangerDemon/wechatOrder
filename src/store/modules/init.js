import { asmx } from "@/utils";
import Router from "@/router";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  code: "",
  isAdmin: false,
  //系统参数
  systemParam: {
    startTime: "", //点餐起始时间
    endTime: "", //点餐终止时间
    isOrderOrNot:true,//时候可以点餐
    lunch: [] //午餐类别
  },
  //用户信息
  userInfo: {
    userName: "用户名",
    userType: "1", // 用户类型 c，b，c
    sex: "1", // 1 男 0 女
    balance: 0
  },
  //菜品列表//第二天吃的菜单
  menuList: [],
  //换购列表
  redemptionList: []
};

/**
 * Getters
 * @type {Object}
 */
const getters = {};

/**
 * Mutations
 * @type {Object}
 */
const mutations = {
  getSystemParam(state, info) {
    asmx.post("getSystemParam", info).then(function(resp) {
      state.systemParam = resp;
    });
  },
  getUserInfo(state, info) {
    asmx.post("getUserInfo", info).then(function(resp) {
      // if (!resp) {
      //   Router.push({
      //     name: "NoUser"
      //   });
      // }
      if(resp){
        state.userInfo = resp;
      }
    });
  },
  getMeunList(state, info) {
    asmx.post("getMeunList", info).then(function(resp) {
      state.menuList = resp;
    });
  },
  setPageUrlParam(state, info) {
    state.code = info.code;
    state.isAdmin = info.isAdmin;
  },
  getRedemptionList(state, info) {
    asmx.post("getChangeBuyList", info).then(function(resp) {
      state.redemptionList = resp;
    });
  }
};

/**
 * Actions
 * @type {Object}
 */
const actions = {};

// Export module
export default {
  state,
  getters,
  mutations,
  actions
};
