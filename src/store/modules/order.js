import { asmx } from "@/utils";
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
  //获取订单列表，时间、
  getOrderList(state, info) {
    asmx.post("doSearch", info).then(function(resp) {
      state.orderList = resp;
    });
  },
  order(state, info) {
    asmx.post("doOrder", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("点餐成功");
      } else {
        //MessageBox.alert("点餐失败");
      }
    });
  },
  cancle(state, info) {
    asmx.post("doCancle", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("取消点餐成功");
      } else {
        //MessageBox.alert("取消点餐失败");
      }
    });
  },
  doChangeBuy(state, info) {
    asmx.post("doChangeBuy", info).then(function(resp) {
      if (resp) {
        MessageBox.alert("换购成功");
      } else {
        //MessageBox.alert("换购失败");
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
