import React from 'react';
import PageFrame from './routes/PageFrame';

// const env = 'production';
const env = 'development';

function registerModel(app, model) {
  if (app && !(app._models.filter(m => m.namespace === model.namespace).length === 1)) {
    app.model(model);
  }
}

function Routes(locale, app) {
  return [
    {
      // 登录
      path: `/${locale}/login`,
      getIndexRoute(nextState, cb) {
        if (process.env.NODE_ENV === env) {
          import(/* webpackChunkName: "Login" */ './routes/Login')
          .then((data) => {
            registerModel(app, require('./models/login'));
            cb(null, { component: data });
          })
          .catch(err => console.log('Failed to load Login', err));
        } else {
          registerModel(app, require('./models/login'));
          cb(null, { component: require('./routes/Login') });
        }
      },
    },
    {
      path: `/${locale}/index`,
      component: PageFrame,
      getIndexRoute(nextState, cb) {
        // 首页
        if (process.env.NODE_ENV === env) {
          import(/* webpackChunkName: "Index" */ './routes/Index')
          .then((data) => {
            registerModel(app, require('./models/index'));
            cb(null, { component: data });
          })
          .catch(err => console.log('Failed to load Index', err));
        } else {
          registerModel(app, require('./models/index'));
          cb(null, { component: require('./routes/Index') });
        }
      },
      childRoutes: [
        {
          // 我的
          path: `/${locale}/mine`,
          getComponent(nextState, cb) {
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "Mine" */ './routes/Mine')
              .then((data) => {
                registerModel(app, require('./models/mine'));
                cb(null, data);
              })
              .catch(err => console.log('Failed to load Mine', err));
            } else {
              registerModel(app, require('./models/mine'));
              cb(null, require('./routes/Mine'));
            }
          },
        },
        {
          path: `/${locale}/role`,
          getIndexRoute(nextState, cb) {
            // 岗位管理
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "role/index" */ './routes/role/index')
              .then((data) => {
                registerModel(app, require('./models/role/index'));
                cb(null, { component: data });
              })
              .catch(err => console.log('Failed to load role/index', err));
            } else {
              registerModel(app, require('./models/role/index'));
              cb(null, { component: require('./routes/role/index') });
            }
          },
          childRoutes: [
            {
              // 添加/编辑/查看岗位
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "role/detail" */ './routes/role/detail')
                  .then((data) => {
                    registerModel(app, require('./models/role/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load role/detail', err));
                } else {
                  registerModel(app, require('./models/role/detail'));
                  cb(null, require('./routes/role/detail'));
                }
              },
            },
            {
              path: 'public',
              getIndexRoute(nextState, cb) {
                // 公有权限设置
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "role/public/index" */ './routes/role/public/index')
                  .then((data) => {
                    registerModel(app, require('./models/role/public/index'));
                    cb(null, { component: data });
                  })
                  .catch(err => console.log('Failed to load role/public/index', err));
                } else {
                  registerModel(app, require('./models/role/public/index'));
                  cb(null, { component: require('./routes/role/public/index') });
                }
              },
              childRoutes: [
                {
                  // 新增/查看/编辑公有权限
                  path: 'detail',
                  getComponent(nextState, cb) {
                    if (process.env.NODE_ENV === env) {
                      import(/* webpackChunkName: "role/public/detail" */ './routes/role/public/detail')
                      .then((data) => {
                        registerModel(app, require('./models/role/public/detail'));
                        cb(null, data);
                      })
                      .catch(err => console.log('Failed to load role/public/detail', err));
                    } else {
                      registerModel(app, require('./models/role/public/detail'));
                      cb(null, require('./routes/role/public/detail'));
                    }
                  },
                },
              ],
            },
            {
              path: 'default',
              getIndexRoute(nextState, cb) {
                // 默认权限设置
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "role/default/index" */ './routes/role/default/index')
                  .then((data) => {
                    registerModel(app, require('./models/role/default/index'));
                    cb(null, { component: data });
                  })
                  .catch(err => console.log('Failed to load role/default/index', err));
                } else {
                  registerModel(app, require('./models/role/default/index'));
                  cb(null, { component: require('./routes/role/default/index') });
                }
              },
            },
          ],
        },
        {
          // 权限管理
          path: `/${locale}/permission`,
          getIndexRoute(nextState, cb) {
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "permission/index" */ './routes/permission/index')
              .then((data) => {
                registerModel(app, require('./models/permission/index'));
                cb(null, { component: data });
              })
              .catch(err => console.log('Failed to load permission/index', err));
            } else {
              registerModel(app, require('./models/permission/index'));
              cb(null, { component: require('./routes/permission/index') });
            }
          },
          childRoutes: [
            {
              // 新增/查看/编辑权限
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "permission/detail" */ './routes/permission/detail')
                  .then((data) => {
                    registerModel(app, require('./models/permission/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load permission/detail', err));
                } else {
                  registerModel(app, require('./models/permission/detail'));
                  cb(null, require('./routes/permission/detail'));
                }
              },
            },
          ],
        },
        {
          // 模块管理
          path: `/${locale}/module`,
          getIndexRoute(nextState, cb) {
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "module/index" */ './routes/module/index')
              .then((data) => {
                registerModel(app, require('./models/module/index'));
                cb(null, { component: data });
              })
              .catch(err => console.log('Failed to load module/index', err));
            } else {
              registerModel(app, require('./models/module/index'));
              cb(null, { component: require('./routes/module/index') });
            }
          },
          childRoutes: [
            {
              // 新增/查看/编辑模块
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "module/detail" */ './routes/module/detail')
                  .then((data) => {
                    registerModel(app, require('./models/module/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load module/detail', err));
                } else {
                  registerModel(app, require('./models/module/detail'));
                  cb(null, require('./routes/module/detail'));
                }
              },
            },
          ],
        },
        {
          // 用户列表
          path: `/${locale}/user`,
          getIndexRoute(nextState, cb) {
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "user/index" */ './routes/user/index')
              .then((data) => {
                registerModel(app, require('./models/user/index'));
                cb(null, { component: data });
              })
              .catch(err => console.log('Failed to load user/index', err));
            } else {
              registerModel(app, require('./models/user/index'));
              cb(null, { component: require('./routes/user/index') });
            }
          },
          childRoutes: [
            {
              // 查看/编辑用户信息
              path: 'detail',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "user/detail" */ './routes/user/detail')
                  .then((data) => {
                    registerModel(app, require('./models/user/detail'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load user/detail', err));
                } else {
                  registerModel(app, require('./models/user/detail'));
                  cb(null, require('./routes/user/detail'));
                }
              },
            },
            {
              // 修改密码
              path: 'editPwd',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "user/editPwd" */ './routes/user/editPwd')
                  .then((data) => {
                    registerModel(app, require('./models/user/editPwd'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load user/editPwd', err));
                } else {
                  registerModel(app, require('./models/user/editPwd'));
                  cb(null, require('./routes/user/editPwd'));
                }
              },
            },
            {
              // 运费模板列表
              path: 'fare',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "user/fare/index" */ './routes/user/fare/index')
                  .then((data) => {
                    registerModel(app, require('./models/user/fare/index'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load user/fare/index', err));
                } else {
                  registerModel(app, require('./models/user/fare/index'));
                  cb(null, require('./routes/user/fare/index'));
                }
              },
            },
            {
              // 员工管理
              path: 'employee',
              getIndexRoute(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "user/employee/index" */ './routes/user/employee/index')
                  .then((data) => {
                    registerModel(app, require('./models/user/employee/index'));
                    cb(null, { component: data });
                  })
                  .catch(err => console.log('Failed to load user/employee/index', err));
                } else {
                  registerModel(app, require('./models/user/employee/index'));
                  cb(null, { component: require('./routes/user/employee/index') });
                }
              },
              childRoutes: [
                {
                  // 添加/查看/编辑员工
                  path: 'detail',
                  getComponent(nextState, cb) {
                    if (process.env.NODE_ENV === env) {
                      import(/* webpackChunkName: "user/employee/detail" */ './routes/user/employee/detail')
                      .then((data) => {
                        registerModel(app, require('./models/user/employee/detail'));
                        cb(null, data);
                      })
                      .catch(err => console.log('Failed to load user/employee/detail', err));
                    } else {
                      registerModel(app, require('./models/user/employee/detail'));
                      cb(null, require('./routes/user/employee/detail'));
                    }
                  },
                },
                {
                  // 修改密码
                  path: 'editPwd',
                  getComponent(nextState, cb) {
                    if (process.env.NODE_ENV === env) {
                      import(/* webpackChunkName: "user/employee/editPwd" */ './routes/user/employee/editPwd')
                      .then((data) => {
                        registerModel(app, require('./models/user/employee/editPwd'));
                        cb(null, data);
                      })
                      .catch(err => console.log('Failed to load user/employee/editPwd', err));
                    } else {
                      registerModel(app, require('./models/user/employee/editPwd'));
                      cb(null, require('./routes/user/employee/editPwd'));
                    }
                  },
                },
              ],
            },
          ],
        },
        {
          // 订单
          path: `/${locale}/order`,
          childRoutes: [
            {
              // 总代理订单
              path: 'dis',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "order/dis" */ './routes/order/dis')
                  .then((data) => {
                    registerModel(app, require('./models/order/dis'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load order/dis', err));
                } else {
                  registerModel(app, require('./models/order/dis'));
                  cb(null, require('./routes/order/dis'));
                }
              },
            },
            {
              // 供应商订单
              path: 'ven',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "order/ven" */ './routes/order/ven')
                  .then((data) => {
                    registerModel(app, require('./models/order/ven'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load order/ven', err));
                } else {
                  registerModel(app, require('./models/order/ven'));
                  cb(null, require('./routes/order/ven'));
                }
              },
            },
            {
              // 供应商订单
              path: 'abnormal',
              getComponent(nextState, cb) {
                if (process.env.NODE_ENV === env) {
                  import(/* webpackChunkName: "order/abnormal" */ './routes/order/abnormal')
                  .then((data) => {
                    registerModel(app, require('./models/order/abnormal'));
                    cb(null, data);
                  })
                  .catch(err => console.log('Failed to load order/abnormal', err));
                } else {
                  registerModel(app, require('./models/order/abnormal'));
                  cb(null, require('./routes/order/abnormal'));
                }
              },
            },
          ],
        },
        {
          // 用户列表
          path: `/${locale}/srvOrder`,
          getIndexRoute(nextState, cb) {
            if (process.env.NODE_ENV === env) {
              import(/* webpackChunkName: "srvOrder/index" */ './routes/srvOrder/index')
              .then((data) => {
                registerModel(app, require('./models/srvOrder/index'));
                cb(null, { component: data });
              })
              .catch(err => console.log('Failed to load srvOrder/index', err));
            } else {
              registerModel(app, require('./models/srvOrder/index'));
              cb(null, { component: require('./routes/srvOrder/index') });
            }
          },
        },
      ],
    },
  ];
}

export default Routes;
