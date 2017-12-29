import update from 'immutability-helper';
import { notification } from 'antd';
import { changeDataType, changeListData, treeMenu } from '../utils/handleData';
import request from '../utils/request';

/* 岗位列表 */
export function *fetchTableData(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = yield select(state => state[namespace].req);

  req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
  req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.roleList }));

  const enumjson = JSON.parse(localStorage.getItem('enum'));

  data.map((item, index) => {
    const newItem = item;
    newItem.systemId = enumjson['system-type'][item.systemId];
    newItem.roleType = enumjson['role-type'][item.roleType];
    return newItem;
  });

  yield put({ type: 'updateTable', payload: data });
  yield put({ type: 'updatePages', payload: headers });
}

/* 查看岗位信息 */
export function *fetchRoleDetail(action, { call, put, select }, namespace) {
  const { data } = yield call(() => request({ errormsg: '请求失败', ...action }, {}, { body: undefined, method: 'GET', Url: `${iface.roleDetail}/${action.payload}` }));
  const newdata = changeDataType(data, [
    {
      field: 'sort',
      target: 'number2string',
    },
    {
      field: 'systemId',
      target: 'number2arraystring',
    },
  ]);
  yield put({ type: 'updateFormReq', payload: newdata });
}

/* 新增岗位 */
export function *fetchRoleAdd(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '插入失败', ...action }, {}, { body: req, method: 'POST', Url: iface.roleAdd }));
  notification.success({ message: '插入成功', description: '新增岗位成功' });
  window.open('', '_self').close();
}

/* 修改岗位信息 */
export function *fetchRoleEdit(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '更新失败', ...action }, {}, { body: req, method: 'POST', Url: iface.roleEdit }));
  notification.success({ message: '更新成功', description: '修改岗位信息成功' });
  window.open('', '_self').close();
}

/* 公有权限设置 */
export function *fetchRolePublicList(action, { call, put, select }, namespace) {
  try {
    yield put({ type: 'resetTable' });

    const req = yield select(state => state[namespace].req);

    req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
    req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

    const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.rolePublicList }));

    const enumjson = JSON.parse(localStorage.getItem('enum'));

    data.map((item, index) => {
      const newItem = item;
      newItem.systemId = enumjson['system-type'][item.systemId];
      newItem.roleType = enumjson['role-type'][item.roleType];
      return newItem;
    });

    yield put({ type: 'updateTable', payload: data });
    yield put({ type: 'updatePages', payload: headers });
  } catch (e) {
    console.log(e);
  }
}

/* 新增公有岗位 */
export function *fetchRolePublicAdd(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '插入失败', ...action }, {}, { body: req, method: 'POST', Url: iface.rolePublicAdd }));
  notification.success({ message: '插入成功', description: '新增岗位成功' });
  window.open('', '_self').close();
}

/* 修改公有岗位信息 */
export function *fetchRolePublicEdit(action, { call, put, select }, namespace) {
  const req = yield select(state => state[namespace].req);
  const { data } = yield call(() => request({ errormsg: '更新失败', ...action }, {}, { body: req, method: 'POST', Url: iface.rolePublicEdit }));
  notification.success({ message: '更新成功', description: '修改岗位信息成功' });
  window.open('', '_self').close();
}

/* 默认权限设置 */
export function *fetchRoleDefaultList(action, { call, put, select }, namespace) {
  yield put({ type: 'resetTable' });

  const req = yield select(state => state[namespace].req);

  req.page.page = (action.payload && action.payload.page) ? action.payload.page : req.page.page;
  req.page.limit = (action.payload && action.payload.limit) ? action.payload.limit : req.page.limit;

  const { data, headers } = yield call(() => request({ errormsg: '表格数据请求失败', ...action }, {}, { body: req, method: 'GET', Url: iface.roleDefaultList }));

  const enumjson = JSON.parse(localStorage.getItem('enum'));

  data.map((item, index) => {
    const newItem = item;
    newItem.systemId = enumjson['system-type'][item.systemId];
    newItem.roleType = enumjson['role-type'][item.roleType];
    return newItem;
  });

  yield put({ type: 'updateTable', payload: data });
  yield put({ type: 'updatePages', payload: headers });
}

/* 分配角色 */
export function *fetchRoleDistributeRole(action, { call, put, select }, namespace) {
  const { data } = yield call(() => request({ errormsg: '请求失败', ...action }, {}, { body: undefined, method: 'GET', Url: iface.roleDistributeRole }));
  const roleIds = { roleIds: [] };
  const newdata = data.map((item, index) => {
    if (item.isChoice === true) { roleIds.roleIds.push(item.id); }
    return { label: item.name, value: item.id };
  });
  yield put({ type: 'updateFormReq', payload: roleIds });
  yield put({ type: 'updateRoleDistributeRole', payload: newdata });
}

// 更新分配角色
export function updateRoleDistributeRole(state, action) {
  return update(state, { res: { roleIds: { $set: action.payload } } });
}

/* 删除岗位 */
export function *fetchRoleDelete(action, { call, put, select }, namespace) {
  try {
    // 从表格中删除选中行
    const page = yield select(state => state[namespace].req.page);
    const dataSource = yield select(state => state[namespace].res.rows);
    const newSource = dataSource.filter((item) => {
      return action.payload.key !== item.key;
    });
    yield put({ type: 'updateTable', payload: newSource });
    yield put({
      type: 'updatePages',
      payload: {
        page: page.page,
        limit: page.limit,
        total: page.total - 1,
      },
    });

    const options = { fields: { roleId: { value: action.payload.id } } };
    const { data } = yield call(() => request({ errormsg: '删除失败', ...action }, {}, { body: options, method: 'POST', Url: iface.roleDelete }));
    notification.success({ message: '删除成功', description: '删除岗位成功' });
  } catch (e) {
    console.log(e);
  }
}
