<template>
    <div>
     	<head-top></head-top>
        <el-row style="margin-top: 20px;">
  			<el-col :span="14" :offset="4">
  				<header class="form_header">添加教具</header>
	  			<el-form :model="toylist" ref="toylist" label-width="110px" class="form">
		  			<el-row class="category_select">
                        <el-form-item label="教具名称" prop="toyName">
                            <el-input placeholder="请输入名称" v-model="toylist.toyName"></el-input>
                        </el-form-item>
						 <el-form-item label="教具类型id" prop="typeId">
                            <el-input placeholder="请输入类型名称" v-model="toylist.typeId"></el-input>
                        </el-form-item>
						<el-form-item label="教具类型" prop="categoryForm">
			  				<el-select v-model="categoryForm.categorySelect" style="width:100%;">
							    <el-option
							      	v-for="item in categoryForm.categoryList"
							      	:key="item.id"
							      	:label="item.label"
							      	:value="item.typename">
							    </el-option>
						  	</el-select>
						</el-form-item>
						<el-form-item label="数量" prop="toyNum">
                            <el-input placeholder="请输入数量" v-model="toylist.toyNum"></el-input>
                        </el-form-item>
					</el-row>
					
                    <el-form-item>
                        <el-button type="primary" @click="submitToylist('toylist')">提交</el-button>
                    </el-form-item>
	  			</el-form>
            </el-col>
  		</el-row>
    </div>
</template>

<script>
 	import headTop from '@/components/headTop'
    import {addToy, getTypeList} from '@/api/getData'
    import {baseUrl, baseImgPath} from '@/config/env'
    export default {
    	data(){
    		return {
    			baseUrl,
    			baseImgPath,
				categoryForm: {
    				categoryList: [],
    				categorySelect: '',

    			},
    			toylist: {
    				toyName: '',
					typeId: '',
                    
                    toyNum: ''
    			}
    		}
    	},
    	components: {
    		headTop,
    	},
    	created(){

    	},
		mounted(){
			this.getTypes();
		},
    	computed: {
    	},
    	methods: {
		    submitToylist(toylist) {
				this.$refs[toylist].validate(async (valid) => {
					if (valid) {
						try{
                            const params = {
                                toyName: this.toylist.toyName,
								typeId: this.toylist.typeId,
                                typename: this.toylist.typename,
                                toyNum: this.toylist.toyNum
                            }
                            console.log(params)
							const result = await addToy(params);
							if (result.status == 1) {
								this.toylist.toyName = '';
								this.toylist.typeId = '';
								this.toylist.typename = '';
								this.toylist.toyNum = '';
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
			},
			async getTypes(){
                const Types = await getTypeList({pageNum: 1, pageSize: 30});
                this.tableData = [];
                //console.log('@@@',Types)
                this.categoryForm.categoryList = Types.data;
				//console.log(this.categoryForm.categoryList);
            },		
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
