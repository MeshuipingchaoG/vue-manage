import fetch from '@/config/fetch'

/**
 * 登陆
 */
export const login = data => fetch('/admin/login', data, 'POST');

/**
 * 退出
 */
export const signout = () => fetch('/admin/signout');

/**
 * 获取用户信息
 */
export const getAdminInfo = () => fetch('/admin/info');

/**
 * api请求量
 */
export const apiCount = date => fetch('/statis/api/' + date + '/count');

/**
 * 所有api请求量
 */
export const apiAllCount = () => fetch('/statis/api/count');


/**
 * 所有api请求信息
 */
export const apiAllRecord = () => fetch('/statis/api/all');

/**
 * 用户注册量
 */
export const userCount = date => fetch('/statis/user/' + date + '/count');

/**
 * 某一天订单数量
 */
export const orderCount = date => fetch('/statis/order/' + date + '/count');

/**
 * 获取申请单
 */
export const getApplyList = data => fetch('/v1/personal/myApprove', data)

/**
 * 获取用户列表
 */
export const getUserList = data => fetch('/v1/users/list', data);

/**
 * 获取用户数量
 */
export const getUserCount = data => fetch('/v1/users/count', data);

/**
 * 添加用户
 * @param data
 */
export const addUser = data => fetch('/v1/users/add', data, 'POST');

/**
 * 删除用户
 */
export const deleteUser = user_id => fetch('/v1/users/delete/' + user_id, {}, 'DELETE')

/**
 * 修改用户信息
 */
 export const updateUser = data => fetch('/v1/users/update' , data, 'POST')
/**
 * 获取教具类型列表
 */
export const getTypeList = data => fetch('/v1/types/list', data)

/**
 * 获取教具类型数量
 */
export const getTypeCount = data => fetch('/v1/types/count', data)

/**
 * 添加教具类型
 */
export const addType = data => fetch('/v1/types/addType', data, 'POST')

/**
 * 删除教具类型
 */
 export const deleteType = type_id => fetch('/v1/types/delete/' + type_id, {}, 'DELETE');

 /**
  * 修改教具类型
  */
 export const updateType = data => fetch('/v1/types/update', data, 'POST')

 /**
  * 修改教具信息
  */
 export const updateToy = data => fetch('/v1/toys/update', data, 'POST')

 /**
  * 借教具
  */
 export const borrow = data => fetch('/v1/toys/borrowToy', data, 'POST')

 /**
  * 归还教具
  */
 export const returnToy = data => fetch('/v1/record/returnToy', data, 'POST')
 
 /**
  * 借教具列表
  */
 export const getAllRecord = data => fetch('/v1/record/getAllRecord', data)

 /**
  * 借教具的总数
  */
export const getRecordCount = data => fetch('/v1/record/count', data)

/**
 * 获取教具列表
 */
export const getToyList = data => fetch('/v1/toys/findList', data)

/**
 * 获取教具数量
 */
export const getToyCount = data =>fetch('/v1/toys/count', data)

/**
 * 添加教具
 */
export const addToy = data => fetch('/v1/toys/addToy', data, 'POST')

/**
 * 删除教具
 */
export const deleteToy = toy_id => fetch('/v1/users/delete/' + toy_id, {}, 'DELETE')


/**
 * 获取订单列表
 */

export const getOrderList = data => fetch('/bos/orders', data);

/**
 * 获取订单数量
 */

export const getOrderCount = data => fetch('/bos/orders/count', data);

/**
 * 获取用户信息
 */

export const getUserInfo = user_id => fetch('/v1/user/' + user_id);

/**
 * 获取地址信息
 */

export const getAddressById = address_id => fetch('/v1/addresse/' + address_id);

/**
 * 获取用户分布信息
 */

export const getUserCity = () => fetch('/v1/user/city/count');


/**
 * 我的申请
 */
export const getApplyRecordList = data => fetch('/personal/myApprove', data);

/**
 * 我的申请条数
 */
export const getApplyRecordCount = data => fetch('/personal/apply/count', data);

/**
 * 待我审批
 */
export const getWaitApproveList = data => fetch('/personal/waitApprove', data);

/**
 * 待我审批条数
 */
export const getWaitApproveCount = data => fetch('/personal/waitApprove/count', data);

/**
 * pass
 * @param data
 */
export const pass = data => fetch('/approve/pass', data);

/**
 * 驳回
 * @param data
 */
export const reject = data => fetch('/approve/reject', data);

/**
 * 首页统计--新增租借申请数
 * @param data
 */
export const applyCount = data => fetch('/home/applyCount/' + data);

