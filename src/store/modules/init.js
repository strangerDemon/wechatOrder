import {
  httpUtils
} from "@/utils";
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
    isOrderOrNot: true, //时候可以点餐
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
    httpUtils.post("getSystemParam", info).then(function (resp) {
      if (resp) {
        state.systemParam = resp;
        if (info.success != undefined) {
          info.success();
        }
      } else {
        if (info.error != undefined) {
          info.error();
        }
      }
    });
  },
  getUserInfo(state, info) {
    httpUtils.post("getUserInfo", info).then(function (resp) {
      if (resp) {
        state.userInfo = resp;
        if (info.success != undefined) {
          info.success();
        }
      } else {
        if (info.error != undefined) {
          info.error();
        }
      }
    });
  },
  getMenuList(state, info) {
    httpUtils.post("getMenuList", info).then(function (resp) {
      state.menuList = resp;
      if (info.func != undefined) {
        info.func();
      }
    });
  },
  setPageUrlParam(state, info) {
    state.code = info.code;
    state.isAdmin = info.isAdmin;
  },
  getRedemptionList(state, info) {
    httpUtils.post("getChangeBuyList", info).then(function (resp) {
      if (resp) {
        state.redemptionList = resp;
        if (info.success != undefined) {
          info.success();
        }
      } else {
        if (info.error != undefined) {
          info.error();
        }
      }
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
