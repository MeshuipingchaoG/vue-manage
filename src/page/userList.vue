<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row>
                <el-button type="primary" @click="addUser()">新增</el-button>
            </el-row>

            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                  type="index"
                  width="100">
                </el-table-column>
                <el-table-column
                    property="id"
                    label="id"
                    width="220">
                </el-table-column>
                <el-table-column
                  property="userName"
                  label="用户姓名"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="userPwd"
                  label="密码"
                  width="220">
                </el-table-column>
                <el-table-column
                  property="phone"
                  label="手机号"
                  width="200">
                </el-table-column>
                <el-table-column label="操作"  width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                        <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="Pagination" style="text-align: left;margin-top: 10px;">
                <el-pagination
                  @size-change="handleSizeChange"
                  @current-change="handleCurrentChange"
                  :current-page="currentPage"
                  :page-size="20"
                  layout="total, prev, pager, next"
                  :total="count">
                </el-pagination>
            </div>
        </div>
        <el-dialog title="修改用户信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="用户名" label-width="100px">
                        <el-input v-model="selectTable.userName" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" label-width="100px">
                        <el-input v-model="selectTable.userPwd"></el-input>
                    </el-form-item>
                    <el-form-item label="手机号" label-width="100px">
                        <el-input v-model="selectTable.phone"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateUser">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getUserList, getUserCount, deleteUser, updateUser} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                selectTable:{},
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                dialogFormVisible: false,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
           // this.initData();
        },
        activated(){
            console.log('@@@' )
             this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getUserCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getUsers();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.offset = (val - 1)*this.limit;
                this.getUsers()
            },
            async getUsers(){
                const Users = await getUserList({pageNum: this.currentPage, pageSize: this.limit});
                this.tableData = [];
                Users.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.userName = item.userName;
                    tableData.userPwd = item.userPwd;
                    tableData.phone = item.phone;
                    this.tableData.push(tableData);
                })
            },
            addUser() {
                this.$router.push("/addUser");
            },
            async handleDelete(index, row){
                console.log('鼠标点击用户的信息', index, row)
                 try{
                    const res = await deleteUser(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除用户成功'
                        });
                        this.tableData.splice(index, 1);
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('删除用户失败')
                }
            },
            handleEdit(index, row) {
                console.log('-----', row)
                this.selectTable = row;
                this.dialogFormVisible = true;

            },
            async updateUser(){
                this.dialogFormVisible = false;
                try{
                    console.log('11111',this.selectTable)
                    const res = await updateUser(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getUserList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新信息失败', err);
                }
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
