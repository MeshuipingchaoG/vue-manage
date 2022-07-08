<template>
    <div class="fillcontain">
        <head-top></head-top>
        <div class="table_container">
            <el-table
                :data="tableData"
                highlight-current-row
                style="width: 100%">
                <el-table-column
                    property="id"
                    label="ID">
                </el-table-column>
                <el-table-column
                  property="toyId"
                  label="教具ID">
                </el-table-column>
                <!-- <el-table-column
                  property="userId"
                  label="教师ID">
                </el-table-column> -->
                <el-table-column
                  property="userName"
                  label="教师姓名">
                </el-table-column>
                <el-table-column
                  property="toyName"
                  label="教具名称">
                </el-table-column>
                <el-table-column
                  property="btoyNum"
                  label="借出数量">
                </el-table-column>
                <el-table-column
                  property="bdate"
                  label="借出时间" :formatter="formatter">
                </el-table-column>
                <el-table-column
                  property="rdate"
                  label="归还时间" :formatter="formatter">
                </el-table-column>
                <el-table-column
                  property="state" 
                  label="状态" :formatter="stateFormatter">
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        size="mini"
                        @click="returnToy(scope.row)"
                        :disabled = "scope.row.state !== 1">归还</el-button>
                    </template>
                </el-table-column>
            </el-table>
           
        </div>
    </div>
</template>

<script>
    import headTop from '../components/headTop'
    import {baseUrl, baseImgPath} from '@/config/env'
    import {getAllRecord, getRecordCount, returnToy} from '@/api/getData'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                offset: 0,
                limit: 20,
                count: 0,
                currentPage: 1,
                tableData: [],
            }
        },
        created(){
            this.initData();
        },
    	components: {
    		headTop,
    	},
        methods: {
            async initData(){
                try{
                    const countData = await getRecordCount();
                    if (countData.status == 1) {
                        this.count = countData.count;
                    }else{
                        throw new Error('获取数据失败');
                    }
                    this.getRecords();
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
                this.getRecords()
            },
            async getRecords(){
                const Toys = await getAllRecord({pageNum: this.currentPage, pageSize: this.limit});
                this.tableData = [];
                Toys.data.forEach(item => {
                    const tableData = item;
                    this.tableData.push(tableData);
                })
            },
            formatter(row, column) {
                const date = new Date(row[column.property]);
                return date.getFullYear() + '年' +
                    date.getMonth() + '月' +
                    date.getDate() + '日 '
            },
            stateFormatter(row, column){
               
                const state = row[column.property];
                if(state === 0){
                    return '租借中';
                }
                if(state === 1){
                    return '租借成功';
                }
                if(state === 2){
                    return '已归还';
                }
                if(state === 3){
                    return '租借失败';
                }
                return '租借失败';
            },
            async returnToy(row){
                console.log('归还',row)
                try{
                    const res = await returnToy(row);
                    if (res.status == 1) {
                        this.$message({
                            type: 'success',
                            message: '归还教具成功'
                        });
                    }else{
                        throw new Error(res.message)
                    }
                }catch(err){
                    this.$message({
                        type: 'error',
                        message: err.message
                    });
                    console.log('归还教具失败',err)
                }
                    this.$router.go(0)
                //this.getAllRecord();
            }
            
        }
           
    }
</script>

<style lang="less">
	@import '../style/mixin';
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
    .table_container{
        padding: 20px;
    }
    .Pagination{
        display: flex;
        justify-content: flex-start;
        margin-top: 8px;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
        border-color: #20a0ff;
    }
    .avatar-uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 120px;
        height: 120px;
        line-height: 120px;
        text-align: center;
    }
    .avatar {
        width: 120px;
        height: 120px;
        display: block;
    }
</style>
