<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">添加用户</header>
	  			<el-form :model="teacher" ref="teacher" label-width="110px" class="form">
		  			<el-row class="category_select">
                        <el-form-item label="用户名" prop="userName">
                            <el-input placeholder="请输入账号" v-model="teacher.userName"></el-input>
                        </el-form-item>
						 <el-form-item label="密码" prop="userPwd">
                            <el-input placeholder="请输入密码" v-model="teacher.userPwd" show-password></el-input>
                        </el-form-item>
						<el-form-item label="手机" prop="phone">
                            <el-input placeholder="请输入电话号码" v-model="teacher.phone"></el-input>
                        </el-form-item>
					</el-row>
                   
                    <el-form-item>
                        <el-button type="primary" @click="submitTeacher('teacher')">提交</el-button>
                    </el-form-item>
	  			</el-form>
            </el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {addUser} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
    			teacher: {
    				userName: '',
                    userPwd: '',
                    phone: ''
    			}
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){

    	},
    	computed: {
    	},
    	methods: {
		    submitTeacher(teacher) {
				this.$refs[teacher].validate(async (valid) => {
					if (valid) {
						try{
                            const params = {
                                userName: this.teacher.userName,
                                userPwd: this.teacher.userPwd,
                                phone: this.teacher.phone,
                                role: 0
                            }
                            console.log(params)
							const result = await addUser(params);
							if (result.status == 1) {
								this.teacher.userName = '';
								this.teacher.userPwd = '';
								this.teacher.phone = '';
								this.$message({
					            	type: 'success',
					            	message: '添加成功'
					          	});
							}
						}catch(err){
							console.log(err)
						}
					} else {
						this.$notify.error({
							title: '错误',
							message: '请检查输入是否正确',
							offset: 100
						});
						return false;
					}
				});
			}
		}
    }
</script>

<style lang="less">
	@import '../../style/mixin';
	.form{
		min-width: 400px;
		margin-bottom: 30px;
		&:hover{
			box-shadow: 0 0 8px 0 rgba(232,237,250,.6), 0 2px 4px 0 rgba(232,237,250,.5);
			border-radius: 6px;
			transition: all 400ms;
		}
	}
	.food_form{
		border: 1px solid #eaeefb;
		padding: 10px 10px 0;
	}
	.form_header{
		text-align: center;
		margin-bottom: 10px;
	}
	.category_select{
		border: 1px solid #eaeefb;
		padding: 10px 30px 10px 10px;
		border-top-right-radius: 6px;
		border-top-left-radius: 6px;
	}
	.add_category_row{
		height: 0;
		overflow: hidden;
		transition: all 400ms;
		background: #f9fafc;
	}
	.showEdit{
		height: 185px;
	}
	.add_category{
		background: #f9fafc;
		padding: 10px 30px 0px 10px;
		border: 1px solid #eaeefb;
		border-top: none;
	}
	.add_category_button{
		text-align: center;
		line-height: 40px;
		border-bottom-right-radius: 6px;
		border-bottom-left-radius: 6px;
		border: 1px solid #eaeefb;
		border-top: none;
		transition: all 400ms;
		&:hover{
			background: #f9fafc;
			span, .edit_icon{
				color: #20a0ff;
			}
		}
		span{
			.sc(14px, #999);
			transition: all 400ms;
		}
		.edit_icon{
			color: #ccc;
			transition: all 400ms;
		}
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
	.cell{
		text-align: center;
	}
	
</style>
