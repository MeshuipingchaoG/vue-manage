<template>
	<div class="manage_page fillcontain">
		<el-row style="height: 100%;">
	  		<el-col :span="4"  style="min-height: 100%; background-color: #324057;">
				<el-menu :default-active="defaultActive" style="min-height: 100%;" theme="dark" router>
					<el-menu-item index="manage" ><i class="el-icon-menu"></i>首页</el-menu-item>
					<el-submenu index="2" v-if="adminInfo.role === 1">
						<template slot="title"><i class="el-icon-document"></i>教具列表</template>
						<el-menu-item index="toyList">教具列表</el-menu-item>
                        <el-menu-item index="addToy">添加教具</el-menu-item>
                    </el-submenu>
                    <el-submenu index="3" v-if="adminInfo.role === 1">
                        <template slot="title"><i class="el-icon-plus"></i>教具类型管理</template>
                        <el-menu-item index="typeList">教具类型列表</el-menu-item>
                        <el-menu-item index="addType">添加教具类型</el-menu-item>
					</el-submenu>
					<el-submenu index="4">
						<template slot="title"><i class="el-icon-star-on"></i>教具借还</template>
						<el-menu-item index="borrow">借教具</el-menu-item>
                        <el-menu-item index="recordList">借还记录</el-menu-item>
					</el-submenu>
					<el-submenu index="6">
						<template slot="title"><i class="el-icon-setting"></i>个人中心</template>
						<el-menu-item index="applyRecordList">我的申请</el-menu-item>
                        <el-menu-item index="approveRecordList" v-if="adminInfo.role === 1 || adminInfo.role === 2 ">待我审批</el-menu-item>
					</el-submenu>
					<el-submenu index="7" v-if="adminInfo.role === 1">
						<template slot="title"><i class="el-icon-warning"></i>用户管理</template>
                        <el-menu-item index="userList">用户列表</el-menu-item>
                        <el-menu-item index="addUser">添加用户</el-menu-item>
					</el-submenu>
				</el-menu>
			</el-col>
			<el-col :span="20" style="height: 100%;overflow: auto;">
				<keep-alive>
				    <router-view></router-view>
				</keep-alive>
			</el-col>
		</el-row>
  	</div>
</template>

<script>
	import {mapState} from 'vuex'
    export default {
		computed: {
			...mapState(['adminInfo']),
			defaultActive: function(){
				return this.$route.path.replace('/', '');

			}
		},
    }
</script>


<style lang="less" scoped>
	@import '../style/mixin';

</style>
