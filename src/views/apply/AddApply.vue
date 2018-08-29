<template>
  <el-tabs v-model="activeName" @tab-click="handleClick" style="margin: 15px;">
    <el-tab-pane label="产品信息" name="first">
      <product></product>
    </el-tab-pane>
    <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
    <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
    <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
  </el-tabs>
</template>
<script>
  import Apply from './Apply'
  import ProductApply from './ProductApply'
  export default {
    components:{
      'apply':Apply,
      'product':ProductApply,
    },
    data() {
      return {
        activeName: 'second'
      };
    },
    methods: {
      handleClick(tab, event) {
        console.log(tab, event);
      }
    }
  };
</script>
