import React from 'react';
import update from 'immutability-helper';
import { setup, getinitstate, resetstate, commonFormTableReducers } from '../../reducers/commonFormTable';
import { fetchOrderCenConPagingSupplier, fetchDeleteRow } from '../../reducers/order';

const pagespace = 'orderven';
const pagepath = '/order/ven';
const tablefetch = 'fetchOrderCenConPagingSupplier';
const columns = [
  '卖家订单编号',
  '供应商',
  '订单日期',
  '商品名称',
  '规格型号',
  '单位',
  '数量',
  '单价',
  '金额',
  '运费',
  '结算金额',
  '交易状态',
  '订单状态',
  '操作',
];

const initstate = getinitstate({ columntags: columns });

const enumjson = JSON.parse(localStorage.getItem('enum'));

initstate.res.payType = [{ payTypeName: '全部', payType: '' }];

for (const key in enumjson['payment-type']) {
  if (key) {
    initstate.res.payType.push({
      payType: key,
      payTypeName: enumjson['payment-type'][key],
    });
  }
}

initstate.res.orderStatus = [];

for (const key in enumjson['order-state']) {
  if (key) {
    initstate.res.orderStatus.push({
      orderStatus: key,
      orderStatusName: enumjson['order-state'][key],
    });
  }
}

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: state => resetstate(state, initstate),
    ...commonFormTableReducers,
  },

  effects: {
    fetchOrderCenConPagingSupplier: (action, { call, put, select }) => fetchOrderCenConPagingSupplier(action, { call, put, select }, pagespace),
    fetchDeleteRow: (action, { call, put, select }) => fetchDeleteRow(action, { call, put, select }, pagespace),
  },

  subscriptions: { setup: ({ dispatch, history }) => setup({ dispatch, history }, pagepath, tablefetch) },

};
