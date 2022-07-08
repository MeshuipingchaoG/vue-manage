<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-row>
                <el-button type="primary" @click="addToy()">增加教具</el-button>
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
                <!-- <el-table-column
                  property="picture"
                  label="图片信息"
                  width="150">
                </el-table-column> -->
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
        <el-dialog title="修改教具信息" v-model="dialogFormVisible">
                <el-form :model="selectTable">
                    <el-form-item label="教具名称" label-width="100px">
                        <el-input v-model="selectTable.toyName" auto-complete="off"></el-input>
                    </el-form-item>
                   <el-form-item label="教具类型" prop="categoryForm" label-width="100px">
			  				<el-select v-model="categoryForm.categorySelect" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.id"
							      	:label="item.label"
							      	:value="item.typename">
							    </el-option>
						  	</el-select>
						</el-form-item>
                    <el-form-item label="数量" label-width="100px">
                        <el-input v-model="selectTable.toyNum"></el-input>
                    </el-form-item>
                </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="updateToy">确 定</el-button>
              </div>
            </el-dialog>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getToyList, getToyCount, deleteToy, updateToy, getTypeList} from '@/api/getData'
    export default {
        data(){
            return {
                categoryForm: {
    				categoryList: [],
    				categorySelect: '',
                },
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
        mounted(){
			this.getTypes();
		},
        created(){
           
        },
        activated(){
             this.initData();
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
            addToy() {
                this.$router.push("/addToy");
            },
            async handleDelete(index, row){
                console.log('#####', index, row)
                try{
                    const res = await deleteToy(row.id);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '删除教具成功'
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
                    console.log('删除教具失败')
                }
            },
            handleEdit(index, row) {
                console.log('-----', row)
                this.selectTable = row;
                this.dialogFormVisible = true;
              
            },
            async getTypes(){
                const Types = await getTypeList({pageNum: 1, pageSize: 30});
                this.tableData = [];
                console.log('@@@',Types)
                this.categoryForm.categoryList = Types.data;
				console.log(this.categoryForm.categoryList);
            },		
            async updateToy(){
                this.dialogFormVisible = false;
                try{
                    console.log('2222',this.selectTable)
                    const res = await updateToy(this.selectTable)
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
