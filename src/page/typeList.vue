<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row>
                <el-button type="primary" @click="addType()">新增</el-button>
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
                  property="typename"
                  label="类型名称"
                  width="220">
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
                    <el-form-item label="id" label-width="100px">
                        <el-input v-model="selectTable.id" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教具类型" label-width="100px">
                        <el-input v-model="selectTable.typename"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateType">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getTypeList, getTypeCount, deleteType, updateType} from '@/api/getData'
     export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 10,
                count: 0,
                currentPage: 1,
                selectTable:{},
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
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getTypeCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getTypes();
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
                this.getTypes()
            },
            async getTypes(){
                const Types = await getTypeList({pageNum: this.currentPage, pageSize: this.limit});
                this.tableData = [];
                console.log('@@@',Types)
                Types.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.typename = item.typename;
                    this.tableData.push(tableData);
                })    
            },
            addType() {
                this.$router.push("/addType");
            },
            async handleDelete(index, row){
                console.log("@@@@@", index, row)
                try{
                    const res = await deleteType(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除教具类型成功'
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
                    console.log('删除教具类型失败')
                }
                
            },
            handleEdit(index, row) {
                console.log('-----', row)
                this.selectTable = row;
                this.dialogFormVisible = true;
              
            },
            async updateType(){
                this.dialogFormVisible = false;
                try{
                    console.log('11111',this.selectTable)
                    const res = await updateType(this.selectTable)
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