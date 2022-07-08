<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column type="index">
                </el-table-column>

                <el-table-column property="id" label="id">
                </el-table-column>

                <el-table-column property="processName" label="申请流程名称">
                </el-table-column>

<!--                <el-table-column property="toyId" label="教具id" width="350" hidden="true">
                </el-table-column>-->

                <el-table-column property="toyName" label="教具名称">
                </el-table-column>

                <el-table-column property="borrowNun" label="租借数量">
                </el-table-column>

                <el-table-column property="createdTime" label="申请时间" :formatter="formatter">
                </el-table-column>

<!--                <el-table-column property="applicant" label="申请人" width="100">
                </el-table-column>-->
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getApplyRecordList, getApplyRecordCount} from '@/api/getData'
    export default {
        data(){
            return {
                tableData: [],
                currentRow: null,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
            }
        },
    	components: {
    		headTop,
    	},
        created(){
            console.log("applyRecordList created");
            // this.initData();
        },
        mounted() {
            console.log("applyRecordList mounted")
        },
        activated() {
            console.log("applyRecordList activated")
            this.initData();
        },
        methods: {
            async initData(){
                try{
                    const countData = await getApplyRecordCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        this.$message({
                            type: 'error',
                            message: countData.msg
                        });
                        throw new Error('getApplyRecordCount获取数据失败');
                    }
                    this.getApplyRecordList();
                }catch(err){
                    console.log('获取数据失败', err);
                }
            },
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log("handleCurrentChange")
                this.currentPage = val;
                this.offset = (val - 1) * this.limit;
                this.getApplyRecordList()
            },
            async getApplyRecordList(){
                const res = await getApplyRecordList({pageNum: this.currentPage, pageSize: this.limit});
                this.tableData = [];
                console.log(res);
                if (res.data === null) {
                    return;
                }
                res.data.forEach(item => {
                    const tableData = item;
                    // tableData.id = item.id;
                    // tableData.processName = item.processName;
                    // tableData.applicant = item.applicant;
                    // tableData.createdTime = item.createdTime;
                    this.tableData.push(tableData);
                })
            },
            formatter(row, column) {
                const date = new Date(row[column.property]);
                return date.getFullYear() + '年' +
                    date.getMonth() + '月' +
                    date.getDate() + '日 '
            }
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
    .table_container{
        padding: 20px;
    }
</style>
