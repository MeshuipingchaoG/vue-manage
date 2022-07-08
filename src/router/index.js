import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const login = r => require.ensure([], () => r(require('@/page/login')), 'login');
const manage = r => require.ensure([], () => r(require('@/page/manage')), 'manage');
const addUser = r => require.ensure([], () => r(require('@/page/user/addUser')), 'addUser');
const home = r => require.ensure([], () => r(require('@/page/home')), 'home');
const addType = r => require.ensure([], () => r(require('@/page/toyType/addType')), 'addType');
const addToy = r => require.ensure([], () => r(require('@/page/toy/addToy')), 'addToy');
const userList = r => require.ensure([], () => r(require('@/page/userList')), 'userList');
const toyList = r => require.ensure([], () => r(require('@/page/toyList')), 'toyList');
const typeList = r => require.ensure([], () => r(require('@/page/typeList')), 'typeList');
const borrow = r => require.ensure([], () => r(require('@/page/borrow')), 'borrow');
const adminList = r => require.ensure([], () => r(require('@/page/adminList')), 'adminList');
const recordList = r => require.ensure([], () => r(require('@/page/recordList')), 'recordList');
const newMember = r => require.ensure([], () => r(require('@/page/newMember')), 'newMember');
const uploadImg = r => require.ensure([], () => r(require('@/page/uploadImg')), 'uploadImg');
const vueEdit = r => require.ensure([], () => r(require('@/page/vueEdit')), 'vueEdit');
const myApply = r => require.ensure([], () => r(require('@/page/myApply')), 'myApply');
const sendMessage = r => require.ensure([], () => r(require('@/page/sendMessage')), 'sendMessage');
const applyRecordList = r => require.ensure([], () => r(require('@/page/applyRecordList')), 'applyRecordList');
const approveRecordList = r => require.ensure([], () => r(require('@/page/approveRecordList')), 'approveRecordList');
const explain = r => require.ensure([], () => r(require('@/page/explain')), 'explain');

const routes = [
	{
		path: '/',
		component: login
	},
	{
		path: '/manage',
		component: manage,
		name: '',
		children: [{
			path: '',
			component: home,
			meta: [],
		},{
            path: '/addUser',
            component: addUser,
            meta: ['用户', '添加用户'],
        },{
			path: '/addType',
			component: addType,
			meta: ['添加数据', '添加教具类型'],
		},{
			path: '/addToy',
			component: addToy,
			meta: ['添加数据', '添加教具'],
		},{
			path: '/userList',
			component: userList,
			meta: ['数据管理', '用户列表'],
		},{
			path: '/toyList',
			component: toyList,
			meta: ['数据管理', '教具列表'],
		},{
			path: '/typeList',
			component: typeList,
			meta: ['数据管理', '类型列表'],
		},{
			path: '/borrow',
			component: borrow,
			meta: ['教具借还', '借教具'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['数据管理', '管理员列表'],
		},{
			path: '/recordList',
			component: recordList,
			meta: ['教具借还', '借还记录'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['图表', '用户数据'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['文本编辑', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['编辑', '文本编辑'],
		},{
			path: '/myApply',
			component: myApply,
			meta: ['个人中心', '我的申请'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['设置', '发送通知'],
		},{
			path: '/explain',
			component: explain,
			meta: ['说明', '说明'],
		},{
            path: '/applyRecordList',
            component: applyRecordList,
            meta: ['个人中心', '我的申请'],
        },{
            path: '/approveRecordList',
            component: approveRecordList,
            meta: ['个人中心', '待我审批'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
