<template>
    <div class="fillcontain">
        <head-top></head-top>
        <header class="admin_title">教具申请</header>
        <div class="admin_set">
            <el-table
                :data="tableData"
                border
                style="width: 100%">
                <el-table-column
                prop="id"
                label="ID"
                >
                </el-table-column>
                <el-table-column
                prop="name"
                label="申请单"
                >
                </el-table-column>
                <el-table-column
                prop="createdTime"
                label="申请时间"
                >
                </el-table-column>
                <el-table-column
                prop="userName"
                label="申请人">
                </el-table-column>
                
            </el-table>
        </div>
    </div>
</template>

<script>
	import headTop from '../components/headTop'
    import {getApplyList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
        data(){
            return {
                baseUrl,
                baseImgPath,
                tableData:[]
            }
        },
    	components: {
    		headTop,
    	},
        mounted(){
            this.getMyApply();
        },
        computed: {
           
        },
        
        methods: {
            async getMyApply(){
                const myApply = await getApplyList({pageNum:1, pageSize:20});
                this.tableData = [];
                console.log('@@@',myApply)
                MyApply.data.forEach(item => {
                    const tableData = {};
                    tableData.id = item.id;
                    tableData.name = item.name;
                    
                    tableData.createdTime = item.createdTime,
                    tableData.userName = item.userName,
                    
                    this.tableData.push(tableData);
                })    
            },
        },
    }
</script>

<style lang="less">
	@import '../style/mixin';
	.explain_text{
		margin-top: 20px;
		text-align: center;
		font-size: 20px;
		color: #333;
	}
    .admin_set{
        width: 60%;
        background-color: #F9FAFC;
        min-height: 400px;
        margin: 20px auto 0;
        border-radius: 10px;
        ul > li{
            padding: 20px;
            span{
                color: #666;
            }
        }
    }
    .admin_title{
        margin-top: 20px;
        .sc(24px, #666);
        text-align: center;
    }
    .avatar-uploader .el-upload {
        border: 1px dashed #d9d9d9;
        margin-top: 10px;
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
