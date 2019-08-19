import { httpUtils } from "@/utils";
import { MessageBox } from "mint-ui";
/**
 * Initial state
 * @type {Object}
 */
const state = {
  //订餐列表
  orderList: []
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
  //获取今日点餐情况
  getTodayOrder(state,info){
    httpUtils.post("getTodayOrder", info).then(function(resp) {
      state.orderList = resp;
      if(info.func!=undefined){
        info.func();
      }
    });
  },
  //获取今日就餐凭证
  getOrderCertificate(state,info){
    httpUtils.post("getOrderCertificate", info).then(function(resp) {
      state.orderList = resp;
      if(info.func!=undefined){
        info.func();
      }
    });
  },
  //获取订单列表，时间、
  getOrderList(state, info) {
    httpUtils.post("doSearch", info).then(function(resp) {
      state.orderList = resp;
      if(info.func!=undefined){
        info.func();
      }
    });
  },
  order(state, info) {
    httpUtils.post("doOrder", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("点餐成功");
        if(info.func!=undefined){
          info.func();
        }
      }
    });
  },
  cancel(state, info) {
    httpUtils.post("doCancel", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("取消点餐成功");
        if(info.func!=undefined){
          info.func();
        }
      }
    });
  },
  doChangeBuy(state, info) {
    httpUtils.post("doChangeBuy", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("换购成功");
        if(info.func!=undefined){
          info.func();
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
