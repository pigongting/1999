// 本地
var apiPrefix = 'http://192.168.3.37:8002/';
var apiNexfix = '';

var apiPrefixLiuJie = 'http://192.168.3.46:8082/';
var apiNexfixLiuJie = '';

var apiPrefixDong = 'http://192.168.3.154:8002/';
var apiNexfixDong = '';

var apiPrefixGuoQi = 'http://192.168.3.137:8002/';
var apiNexfixGuoQi = '';

// 远程
// var apiPrefix = 'http://10.10.11.22:8081/';
// var apiNexfix = '';

// var apiPrefixLiuJie = 'http://10.10.11.22:8081/';
// var apiNexfixLiuJie = '';

// var apiPrefixDong = 'http://10.10.11.22:8081/';
// var apiNexfixDong = '';

// var apiPrefixGuoQi = 'http://10.10.11.22:8081/';
// var apiNexfixGuoQi = '';

// 模拟
var apiPrefixMock = '/api/v1/';
var apiNexfixMock = '';

window.iface = {
  // 枚举
  enum: `${apiPrefix}enum${apiNexfix}`,
  // 用户
  login: `${apiPrefix}login${apiNexfix}`, // 登录
  userList: `${apiPrefix}user/list${apiNexfix}`, // 用户列表
  userToEdit: `${apiPrefix}user/toEdit${apiNexfix}`, // 查看用户信息
  userEdit: `${apiPrefix}user/edit${apiNexfix}`, // 编辑用户信息
  userEmployeeList: `${apiPrefix}user/employee/list${apiNexfix}`, // 员工列表
  userAdd: `${apiPrefix}user/add${apiNexfix}`, // 添加员工
  userEditPwd: `${apiPrefix}user/editPwd${apiNexfix}`, // 修改密码
  userEmployeeEdit: `${apiPrefix}user/employee/edit${apiNexfix}`, // 编辑员工信息
  fareList: `${apiPrefixGuoQi}fare/list${apiNexfixGuoQi}`, // 运费模板列表
  // 角色(岗位)
  roleList: `${apiPrefix}role/list${apiNexfix}`, // 岗位列表
  roleDetail: `${apiPrefix}role/detail${apiNexfix}`, // 查看岗位
  roleAdd: `${apiPrefix}role/add${apiNexfix}`, // 添加岗位
  roleEdit: `${apiPrefix}role/edit${apiNexfix}`, // 修改岗位
  roleDelete: `${apiPrefix}role/delete${apiNexfix}`, // 删除岗位
  rolePublicList: `${apiPrefix}role/public/list${apiNexfix}`, // 公有权限设置
  rolePublicAdd: `${apiPrefix}role/public/add${apiNexfix}`, // 添加公有岗位
  rolePublicEdit: `${apiPrefix}role/public/edit${apiNexfix}`, // 修改公有岗位
  roleDefaultList: `${apiPrefix}role/default/list${apiNexfix}`, // 默认权限设置
  roleDistributeRole: `${apiPrefix}role/distributeRole${apiNexfix}`, // 分配角色
  // 权限
  permissionList: `${apiPrefix}permission/list${apiNexfix}`, // 权限管理
  permissionAdd: `${apiPrefix}permission/add${apiNexfix}`, // 新增权限
  permissionDetail: `${apiPrefix}permission/detail${apiNexfix}`, // 查看权限
  permissionEdit: `${apiPrefix}permission/edit${apiNexfix}`, // 修改权限
  permissionToSetButton: `${apiPrefix}permission/toSetButton${apiNexfix}`, // 获取设置按钮列表
  // 菜单(模块)
  moduleList: `${apiPrefix}module/list${apiNexfix}`, // 模块管理
  moduleAdd: `${apiPrefix}module/add${apiNexfix}`, // 新增模块
  moduleDetail: `${apiPrefix}module/detail${apiNexfix}`, // 查看模块
  moduleEdit: `${apiPrefix}module/edit${apiNexfix}`, // 编辑模块
  moduleParentAll: `${apiPrefix}module/parent/all${apiNexfix}`, // 上级名称列表
  modulesetButton: `${apiPrefix}module/setButton${apiNexfix}`, // 设置按钮
  // 订单
  orderCenConPagingAgency: `${apiPrefixDong}order/cenConPagingAgency${apiNexfixDong}`, // 总代理订单
  orderCenConPagingSupplier: `${apiPrefixDong}order/cenConPagingSupplier${apiNexfixDong}`, // 供应商订单
  orderCenConPagingAbnormalOrders: `${apiPrefixDong}order/cenConPagingAbnormalOrders${apiNexfixDong}`, // 异常订单
  // 退货
  srvOrderList: `${apiPrefixDong}srvOrder/list${apiNexfixDong}`, // 退货列表
  // 商品
  sellProductList: `${apiPrefixLiuJie}sell/product/list${apiNexfixLiuJie}`,
};
