<template>
  <div>
    <div id="work" ref="work" style="margin:10px;float: left;"></div>

    <div class="GooFlow_form" style="float:left;margin-left: 30px;">
      <el-form ref="form" size="mini" :model="curNode" label-position="left" label-width="70px"
               style='width: 400px; margin-top: 20px;padding:10px;border:1px solid #AAA;border-radius: 15px;'>
        <!--<el-form-item v-show="false" prop="nodeId">-->
        <!--<el-input v-model="curNode.nodeId"></el-input>-->
        <!--</el-form-item>-->

        <el-form-item :rules="{required:true,message:'名称不能为空',trigger:'blur'}" label="名称" prop="name">
          <el-input v-model="curNode.name"></el-input>
        </el-form-item>
        <template v-if="curNode.isNode">
          <el-form-item :rules="{required:true,message:'顶距离不能为空',trigger:'blur'}" label="顶距离" prop="top">
            <el-input v-model="curNode.top"></el-input>
          </el-form-item>
          <el-form-item :rules="{required:true,message:'左距离不能为空',trigger:'blur'}" label="左距离" prop="left">
            <el-input v-model="curNode.left"></el-input>
          </el-form-item>
          <el-form-item label="处理职位" prop="dealerPos">
            <el-input v-model="curNode.dealerPos"></el-input>
          </el-form-item>
          <el-form-item label="处理人" prop="dealer">
            <el-input v-model="curNode.dealer"></el-input>
          </el-form-item>
          <el-form-item label="提成基数" prop="benefitBase">
            <el-input v-model="curNode.benefitBase"></el-input>
          </el-form-item>
          <el-form-item label="处理类型" prop="dealType">
            <el-input v-model="curNode.dealType"></el-input>
          </el-form-item>
          <el-form-item label="处理阈值" prop="threshold">
            <el-input v-model="curNode.threshold"></el-input>
          </el-form-item>
          <el-form-item label="一票否决" prop="singleReject">
            <el-input v-model="curNode.singleReject"></el-input>
          </el-form-item>
          <el-form-item label="自动决策" prop="autoDesition">
            <el-input v-model="curNode.autoDesition"></el-input>
          </el-form-item>
          <el-form-item label="处理说明" prop="dealIntro">
            <el-input v-model="curNode.dealIntro"></el-input>
          </el-form-item>
          <el-form-item label="处理方法" prop="actionMethod">
            <el-input v-model="curNode.actionMethod"></el-input>
          </el-form-item>
        </template>
      </el-form>
    </div>
  </div>
</template>

<script>
  import GooFlow from './utils/GooFlow.js'

  export default {
    name: "GooFlow",
    props: {
      property: Object,
      remark: Object,
      curNode: Object
    },
    data() {
      return {
      }
    },
    mounted() {
    },
    methods: {
      createGooFlow(json) {
        let _this = this;
        let work = $.createGooFlow($("#work"), this.property);
        work.setNodeRemarks(this.remark);
        work.loadData(json);
        return work;
      }


    }
  }
</script>

<style>
  @import "./utils/GooFlow.css";
</style>
