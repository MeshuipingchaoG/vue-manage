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

                <el-table-column property="processName" label="申请流程名称" >
                </el-table-column>

<!--                <el-table-column property="toyId" label="教具id" width="350" hidden="true">
                </el-table-column>-->

                <el-table-column property="toyName" label="教具名称" >
                </el-table-column>

                <el-table-column property="borrowNun" label="租借数量" >
                </el-table-column>

                <el-table-column property="createdTime" label="申请时间" :formatter="formatter">
                </el-table-column>

                <el-table-column property="applicantName" label="申请人" >
                </el-table-column>

                <el-table-column property="approveStatus" label="审核状态" :formatter="approveStatusFormatter">
                </el-table-column>

                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="mini" @click="pass(scope.row)">同意</el-button>
                        <el-button size="mini" type="danger" @click="reject(scope.row)">驳回</el-button>
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
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {getWaitApproveList, getWaitApproveCount, pass, reject} from '@/api/getData'
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
                    const countData = await getWaitApproveCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        this.$message({
                            type: 'error',
                            message: countData.msg
                        });
                        throw new Error('getApplyRecordCount获取数据失败');
                    }
                    this.getWaitApproveList();
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
                this.getWaitApproveList()
            },
            async getWaitApproveList(){
                const res = await getWaitApproveList({pageNum: this.currentPage, pageSize: this.limit});
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
                const date = new Date(row[column.property])
                return date.getFullYear() + '年' +
                    (date.getMonth() + 1) + '月' +
                    date.getDate() + '日 '
            },
            approveStatusFormatter(row, column) {
                const status = row[column.property];
                console.log(status, 0 === status);
                if (0 === status) {
                    return "未审核";
                } else if (1 === status) {
                    return "审核通过";
                } else if (2 === status) {
                    return "审核驳回";
                }
            },
            async pass(row) {
                console.log(row);
                if (0 != row.approveStatus) {
                    this.$message({
                        type: 'warning',
                        message: '已经审核过，不允许该操作'
                    });
                    return;
                }
                let param = {
                    'applyId': row.applyId,
                    'approveId': row.id
                }
                const res = await pass(param);
                if (res!= null && res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
                }
            },
            async reject(row) {
                console.log(row);
                if (0 != row.approveStatus) {
                    this.$message({
                        type: 'warning',
                        message: '已经审核过，不允许该操作'
                    });
                    return;
                }
                let param = {
                    'applyId': row.applyId,
                    'approveId': row.id
                }
                const res = await reject(param);
                if (res!= null && res.status == 1) {
                    this.$message({
                        type: 'success',
                        message: '操作成功'
                    });
                } else {
                    this.$message({
                        type: 'error',
                        message: res.msg
                    });
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
</style>
