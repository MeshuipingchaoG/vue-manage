<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
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
                    width="100">
                </el-table-column>
                <el-table-column
                  property="typename"
                  label="类型名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  property="toyName"
                  label="教具名称"
                  width="150">
                </el-table-column>
                <el-table-column
                  property="toyNum"
                  label="库存"
                  width="150">
                </el-table-column>
               <!--  <el-table-column
                  property="picture"
                  label="图片信息"
                  width="150">
                </el-table-column> -->
                    <el-table-column label="操作"  width="200">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="handleBorrow(scope.$index, scope.row)">借教具</el-button>
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
        <el-dialog title="借教具" v-model="dialogFormVisible">
            <el-form :model="selectTable">
                     <el-form-item label="id" label-width="100px">
                        <el-input v-model="selectTable.id" auto-complete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="教具名称" label-width="100px">
                        <el-input v-model="selectTable.toyName" auto-complete="off"></el-input>
                    </el-form-item>
                    
                    <el-form-item label="数量" label-width="100px">
                        <el-input v-model="selectTable.toyNum"></el-input>
                    </el-form-item>
                    <el-form-item label="借出数量" label-width="100px">
                        <el-input placeholder="请输入借的数量" v-model="selectTable.btoyNum"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateToyList">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getToyList, getToyCount, borrow} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                btoyNum:'',
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                restaurant_id: null,
                expendRow: [],
                dialogFormVisible: false,
                selectTable:{},
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            this.initData();
        },
        mounted(){

        },
        methods: {
            async initData(){
                try{
                    const countData = await getToyCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getToys();
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
                this.getToys()
            },
            async getToys(){
                const Toys = await getToyList({pageNum: this.currentPage, pageSize: this.limit});
                this.tableData = [];
                Toys.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.typename = item.typename;
                    tableData.toyName = item.toyName;
                    tableData.toyNum = item.toyNum;
                    tableData.picture = item.picture;
                    this.tableData.push(tableData);
                })
            },
            handleBorrow(index, row){
                console.log("czw", index, row)
                this.selectTable = row;
                this.dialogFormVisible = true;
            },
           async updateToyList(){
                this.dialogFormVisible = false;
                console.log('借出', this.btoyNum,this.selectTable)
                
                try{
                    const res = await borrow(this.selectTable)
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '更新信息成功'
                        });
                        this.getToyList();
                    }else{
                        this.$message({
                            type: 'error',
                            message: res.message
                        });
                    }
                }catch(err){
                    console.log('更新信息失败', err);
                }
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
    .demo-table-expand {
	    font-size: 0;
	}
	.demo-table-expand label {
	    width: 90px;
	    color: #99a9bf;
	}
	.demo-table-expand .el-form-item {
	    margin-right: 0;
	    margin-bottom: 0;
	    width: 50%;
	}
</style>
