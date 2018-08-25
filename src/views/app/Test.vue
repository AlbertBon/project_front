<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input style="width: 200px;" v-model="listParams.keyMap.equal_testId" class="filter-item" placeholder="序号">
      </el-input>
      <el-date-picker style="width: 200px;" v-model="listParams.keyMap.greater_gmtCreate" type="datetime"
                      class="filter-item" placeholder="起始时间" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>  -
      <el-date-picker style="width: 200px;" v-model="listParams.keyMap.less_gmtCreate" type="datetime"
                      class="filter-item" placeholder="结束时间" value-format="yyyy-MM-dd HH:mm:ss">
      </el-date-picker>
      <el-button class="filter-item" @click="getList" style="margin-left: 10px;" type="primary" icon="el-icon-search">
        搜索
      </el-button>
      <el-button @click="handleCreate" class="filter-item" style="margin-left: 10px;" type="primary" icon="el-icon-edit">
        新增
      </el-button>
    </div>


    <el-table :data="pageInfo.list" v-loading="listLoading" element-loading-text="给我一点时间" border fit
              highlight-current-row
              style="width: 100%">
      <el-table-column align="center" label="序号" width="65">
        <template slot-scope="scope">
          <span>{{scope.row.testId}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="GmtCreate">
        <template slot-scope="scope">
          <span>{{scope.row.gmtCreate | parseTime('{y}-{m}-{d} {h}:{i}:{s}')}}</span>
        </template>
      </el-table-column>
      <el-table-column width="160px" align="center" label="TestName">
        <template slot-scope="scope">
          <span>{{scope.row.testName}}</span>
        </template>
      </el-table-column>
      <el-table-column align="center" label="操作" width="230" class-name="small-padding fixed-width">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="handleUpdate(scope.row.testId)">修改</el-button>
          <el-button type="danger" size="mini" @click="handleDel(scope.row.testId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>


    <pagination
      :pageSizes="pageSizes"
      :pageSize="listParams.pageSize"
      :pageCount="pageInfo.total"
      @handleSizeChange="handleSizeChange"
      @handleCurrentChange="handleCurrentChange"></pagination>


    <el-dialog :title="dialogTitle" :visible.sync="dialogFormVisible">
      <el-form ref="testForm" :rules="rules" :model="testParams" label-position="left" label-width="100px"
               style='width: 400px; margin-left:50px;'>
        <el-form-item v-show="false" prop="testId">
          <el-input v-model="testParams.testId"></el-input>
        </el-form-item>
        <el-form-item v-show="false" label="TestId" prop="TestId">
          <el-input v-model="testParams.testId"></el-input>
        </el-form-item>
        <el-form-item label="TestName" prop="TestName">
          <el-input v-model="testParams.testName"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取消</el-button>
        <el-button v-if="dialogTitle=='新增'" type="primary" @click="createTest">新增</el-button>
        <el-button v-else-if="dialogTitle=='修改'" type="primary" @click="updateTest">修改</el-button>
      </div>
    </el-dialog>


  </div>
</template>


<script>
  import Pagination from '@/components/Pagination'

  export default {
    components: {
      Pagination
    },
    data() {
      return {
        //列表部分
        listLoading: true,
        listParams: {
          pageSize: 5,
          pageNum: 1,
          keyMap:{},
          orderBy:''
        },
        pageSizes: [5, 10, 30, 50],
        pageInfo: {
          list: []
        },
        //增删改部分
        dialogFormVisible: false,
        dialogTitle: '',
        testParams: {
        },
        rules:{
        }
      };
    },
    created() {
      this.getList();
    },
    methods: {
      //分页调用方法
      handleSizeChange(size) {
        this.listParams.pageSize = size;
        this.getList();
      },
      handleCurrentChange(currentPage) {
        this.listParams.pageNum = currentPage;
        this.getList();
      },
      //获取列表方法
      getList() {
        let _this = this;
        this.listLoading = true;
        this.postRequest('/test/list', this.listParams).then(res => {
          _this.listLoading = false;
          if (res.data.code == '00') {
            this.pageInfo = res.data.data;
          }
        })
      },
      //点击新增按钮触发方法
      handleCreate() {
        if (this.$refs['testForm']!==undefined) {
          this.$refs['testForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '新增';
      },
      //新增提交方法
      createTest() {
        this.$refs['testForm'].validate((valid=> {
          if (valid) {
            this.postRequest('/test/save', this.testParams).then(res => {
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
      handleUpdate(testId) {
        if (this.$refs['testForm']!==undefined) {
          this.$refs['testForm'].resetFields();
        }
        this.dialogFormVisible = true;
        this.dialogTitle = '修改';
        this.getRequest('/test/get?key='+testId).then(res => {
          if (res.data.code == '00') {
            this.testParams = res.data.data;
          }
        })
      },
      //修改提交方法
      updateTest(){
        this.$refs['testForm'].validate((valid=>{
          if(valid){
            this.postRequest('/test/update', this.testParams).then(res => {
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
      handleDel(testId) {
        this.$confirm('是否删除该用户', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.getRequest('/test/delete?key='+testId).then(res => {
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


