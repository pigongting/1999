import update from 'immutability-helper';
import { notification } from 'antd';
import { changeDataType, changeListData, treeMenu } from '../utils/handleData';
import request from '../utils/request';

/* 登录 */
export function *fetchLogin(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);

  const { data } = yield call(() => request({ errormsg: '登录失败', ...action }, {}, { body: req, method: 'POST', Url: iface.login }));

  localStorage.setItem('moduleList', JSON.stringify(treeMenu(data.moduleList)));

  const { data: enumjson } = yield call(() => request({ errormsg: '获取枚举类型失败', ...action }, {}, { body: undefined, method: 'GET', Url: iface.enum }));

  localStorage.setItem('enum', JSON.stringify(enumjson));

  location.href = '/';
}

/* 用户列表 */
export function *fetchTableData(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = yield select(state => state[namespace].req);

  req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
  req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.userList }));

  const enumjson = JSON.parse(localStorage.getItem('enum'));

  data.map((item, index) => {
    const newItem = item;
    newItem.systemId = enumjson['system-type'][item.systemId];
    return newItem;
  });

  const newdata = changeListData(data, [
    {
      field: 'createTime',
      target: 'timestamp2time',
      format: 'YYYY-MM-DD',
    },
  ]);

  yield put({ type: 'updateTable', payload: newdata });
  yield put({ type: 'updatePages', payload: headers });
}

/* 修改用户 */
export function *fetchUserEdit(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '更新失败', ...action }, {}, { body: req, method: 'POST', Url: iface.userEdit }));
  notification.success({ message: '更新成功', description: '修改用户成功' });
}

/* 查看用户/员工信息 */
export function *fetchUserToEdit(action, { call, put, select }, namespace) {
  const options = { fields: { userId: { value: action.payload } } };
  const { data } = yield call(() => request({ errormsg: '请求失败', ...action }, {}, { body: options, method: 'GET', Url: iface.userToEdit }));

  const newdata = changeDataType(data, [
    {
      field: 'systemIds',
      target: 'arraynumber2arraystring',
    },
  ]);

  yield put({ type: 'updateFormReq', payload: newdata });
}

/* 员工列表 */
export function *fetchEmployeeList(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = yield select(state => state[namespace].req);

  req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
  req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.userEmployeeList }));

  const enumjson = JSON.parse(localStorage.getItem('enum'));

  data.map((item, index) => {
    const newItem = item;
    newItem.systemId = enumjson['system-type'][item.systemId];
    return newItem;
  });

  const newdata = changeListData(data, [
    {
      field: 'createTime',
      target: 'timestamp2time',
      format: 'YYYY-MM-DD',
    },
  ]);

  yield put({ type: 'updateTable', payload: newdata });
  yield put({ type: 'updatePages', payload: headers });
}

/* 新增员工 */
export function *fetchUserAdd(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '插入失败', ...action }, {}, { body: req, method: 'POST', Url: iface.userAdd }));
  notification.success({ message: '插入成功', description: '新增员工成功' });
}

/* 修改员工信息 */
export function *fetchUserEmployeeEdit(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '更新失败', ...action }, {}, { body: req, method: 'POST', Url: iface.userEmployeeEdit }));
  notification.success({ message: '更新成功', description: '修改员工信息成功' });
}

/* 修改密码 */
export function *fetchUserEditPwd(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '更新失败', ...action }, {}, { body: req, method: 'POST', Url: iface.userEditPwd }));
  notification.success({ message: '更新成功', description: '修改员工信息成功' });
}

/* 运费模板列表 */
export function *fetchFareList(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = { page: { page: 1, limit: 1000 } };
  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.fareList }));

  data.map((item, index) => {
    item.itemList.map((ele, i) => {
      const newEle = ele;
      const regionArray = [];

      if (newEle.shippingRegion) {
        JSON.parse(newEle.shippingRegion).map((obj, j) => {
          regionArray.push(obj.name);
          return obj;
        });
      }

      newEle.shippingRegion = (newEle.shippingRegion === '') ? '全国(除指定地区以外)' : regionArray.join('、');
      newEle.chargeType = (item.chargeType === 1) ? '按数量' : '按重量';
      newEle.freeAmount = (item.chargeType === 1) ? `满 ${newEle.freeAmount} 件包邮` : `满 ${newEle.freeAmount} kg包邮`;
      newEle.remark = item.remark;
      newEle.key = newEle.id;
      return newEle;
    });
    return item;
  });

  const newdata = changeListData(data, [
    {
      field: 'modifyTime',
      target: 'timestamp2time',
      format: 'YYYY-MM-DD HH:mm:ss',
    },
  ]);

  yield put({ type: 'updateTable', payload: newdata });
  yield put({ type: 'updatePages', payload: headers });
}
