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
            meta: ['??????', '????????????'],
        },{
			path: '/addType',
			component: addType,
			meta: ['????????????', '??????????????????'],
		},{
			path: '/addToy',
			component: addToy,
			meta: ['????????????', '????????????'],
		},{
			path: '/userList',
			component: userList,
			meta: ['????????????', '????????????'],
		},{
			path: '/toyList',
			component: toyList,
			meta: ['????????????', '????????????'],
		},{
			path: '/typeList',
			component: typeList,
			meta: ['????????????', '????????????'],
		},{
			path: '/borrow',
			component: borrow,
			meta: ['????????????', '?????????'],
		},{
			path: '/adminList',
			component: adminList,
			meta: ['????????????', '???????????????'],
		},{
			path: '/recordList',
			component: recordList,
			meta: ['????????????', '????????????'],
		},{
			path: '/newMember',
			component: newMember,
			meta: ['??????', '????????????'],
		},{
			path: '/uploadImg',
			component: uploadImg,
			meta: ['????????????', 'MarkDown'],
		},{
			path: '/vueEdit',
			component: vueEdit,
			meta: ['??????', '????????????'],
		},{
			path: '/myApply',
			component: myApply,
			meta: ['????????????', '????????????'],
		},{
			path: '/sendMessage',
			component: sendMessage,
			meta: ['??????', '????????????'],
		},{
			path: '/explain',
			component: explain,
			meta: ['??????', '??????'],
		},{
            path: '/applyRecordList',
            component: applyRecordList,
            meta: ['????????????', '????????????'],
        },{
            path: '/approveRecordList',
            component: approveRecordList,
            meta: ['????????????', '????????????'],
        }]
	}
]

export default new Router({
	routes,
	strict: process.env.NODE_ENV !== 'production',
})
