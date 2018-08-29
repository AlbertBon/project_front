<template>
  <div>
    <el-form ref="applyForm" :rules="rules" :model="applyParams" label-position="left" label-width="100px"
             style='' size="small">
      <el-row gutter="30" class="cur-row">
        <el-col :span="6">
          <el-form-item v-show="false" prop="applyId">
            <el-input v-model="applyParams.applyId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ChanceId" prop="chanceId">
            <el-input v-model="applyParams.chanceId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="EnterpriceId" prop="enterpriceId">
            <el-input v-model="applyParams.enterpriceId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="ProductId" prop="productId">
            <el-input v-model="applyParams.productId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="NodeId" prop="nodeId">
            <el-input v-model="applyParams.nodeId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">

        </el-col>
      </el-row>




    </el-form>
  </div>

</template>

<script>
  export default {
    name: "product-apply",
    data() {
      return {
        //增删改部分
        dialogFormVisible: false,
        dialogTitle: '',
        applyParams: {},
        rules: {}
      }
    },
    created() {
    },
    methods: {
      //新增提交方法
      createApply() {
        this.$refs['applyForm'].validate((valid=> {
          if (valid) {
            this.postRequest('/apply/save', this.applyParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('新增成功');
                this.getList();
              }
            })
          }
        }))
      },
      //点击修改按钮触发方法
      handleUpdate(applyId) {
        if (this.$refs['applyForm']!==undefined) {
          this.$refs['applyForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '修改';
        this.getRequest('/apply/get?key='+applyId).then(res => {
          if (res.data.code == '00') {
            this.applyParams = res.data.data;
          }
        })
      },
      //修改提交方法
      updateApply(){
        this.$refs['applyForm'].validate((valid=>{
          if(valid){
            this.postRequest('/apply/update', this.applyParams).then(res => {
              if (res.data.code == '00') {
                this.dialogFormVisible = false;
                this.$message.success('修改成功');
                this.getList();
              }
            })
          }
        }))
      },
      //点击删除触发方法
      handleDel(applyId) {
        this.$confirm('是否删除该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/apply/delete?key='+applyId).then(res => {
            if (res.data.code == '00') {
              this.$message.success('删除成功');
              this.getList();
            }
          })
        }).catch(() => {
          this.$message.info('已取消删除');
        });
      },
    }
  }
</script>

<style scoped>
  /*.cur-row{*/
    /*border: 1px solid #AAA;*/
  /*}*/
</style>
