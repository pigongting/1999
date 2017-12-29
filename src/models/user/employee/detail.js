import { setup, getinitstate, resetstate, commonFormReducers } from '../../../reducers/commonForm';
import { fetchUserAdd, fetchUserToEdit, fetchUserEmployeeEdit } from '../../../reducers/user';
import { fetchRoleDistributeRole, updateRoleDistributeRole } from '../../../reducers/role';

const pagespace = 'useremployeedetail';
const pagepath = '/user/employee/detail';
const viewedrow = 'fetchUserToEdit';

const initstate = getinitstate();

const enumjson = JSON.parse(localStorage.getItem('enum'));

initstate.res.systemIds = [];

for (const key in enumjson['system-type']) {
  if (key) {
    initstate.res.systemIds.push({
      systemIds: key,
      systemName: enumjson['system-type'][key],
    });
  }
}

export default {

  namespace: pagespace,

  state: initstate,

  reducers: {
    resetstate: state => resetstate(state, initstate),
    ...commonFormReducers,
    updateRoleDistributeRole,
  },

  effects: {
    fetchUserAdd: (action, { call, put, select }) => fetchUserAdd(action, { call, put, select }, pagespace),
    fetchUserToEdit: (action, { call, put, select }) => fetchUserToEdit(action, { call, put, select }, pagespace),
    fetchUserEmployeeEdit: (action, { call, put, select }) => fetchUserEmployeeEdit(action, { call, put, select }, pagespace),
    fetchRoleDistributeRole: (action, { call, put, select }) => fetchRoleDistributeRole(action, { call, put, select }, pagespace),
  },

  subscriptions: { setup: ({ dispatch, history }) => setup({ dispatch, history }, pagepath, viewedrow) },

};
