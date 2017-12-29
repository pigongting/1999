import moment from 'moment';
import update from 'immutability-helper';
import { notification } from 'antd';
import { changeDataType, changeListData, treeMenu } from '../utils/handleData';
import request from '../utils/request';

/* 退货列表 */
export function *fetchSrvOrderList(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = yield select(state => state[namespace].req);

  req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
  req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

  if (req.formFilters && req.formFilters.createTime && req.formFilters.createTime.value) {
    req.formFilters.st = { value: moment(req.formFilters.createTime.value[0]).format('YYYY-MM-DD') };
    req.formFilters.et = { value: moment(req.formFilters.createTime.value[1]).format('YYYY-MM-DD') };
  }

  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.srvOrderList }));

  const enumjson = JSON.parse(localStorage.getItem('enum'));

  data.map((item, index) => {
    const newItem = item;
    newItem.payType = enumjson['payment-type'][item.payType];
    newItem.orderStatusCode = enumjson['order-state'][item.orderStatusCode];
    return newItem;
  });

  const newdata = changeListData(data, [
    {
      field: 'createTime',
      target: 'timestamp2time',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  ]);

  yield put({ type: 'updateTable', payload: newdata });
  yield put({ type: 'updatePages', payload: headers });
}
