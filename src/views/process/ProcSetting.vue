<template>
  <goo-flow
    ref="gooFlow"
    :property="property"
    :json="jsondata"
    :remark="remark"></goo-flow>
</template>

<script>
  import GooFlow from '@/components/GooFlow/index.vue'
  export default {
    components: {GooFlow},
    name: "proc",
    data() {
      return {
        property: {
          width: 1200,
          height: 540,
          toolBtns: ["98 round mix", "99 round mix", "01", "00", "04", "02"],
          haveHead: true,
          headLabel: true,
          headBtns: [ "save", "undo", "redo", "reload"],//如果haveHead=true，则定义HEAD区的按钮
          haveTool: true,
          haveGroup: true,
          useOperStack: true
        },
        remark: {
          cursor: "选择指针",
          direct: "结点连线",
          '98': "开始节点",
          '99': "结束结点",
          '01': "人工节点",
          '00': "自动结点",
          '04': "决策结点",
          '02': "状态结点",
          group: "组织划分框编辑开关"
        },
        jsondata: {
        },
        work:{}
      }
    },
    mounted() {
      this.gooFlowInit()
    },
    methods: {
      gooFlowInit(){
        let _this = this;
        //调用子组件生成方法并获取子组件生成的gooFlow
        _this.work = _this.$refs.gooFlow.createGooFlow();

        //新增node触发
        _this.work.onItemAdd = function(id,type,json){
          let subJson = Object.assign({},json);
          // subJson = json;
          if(type.indexOf("start")>=0){
            subJson.type = '98'//开始节点
          }else if(type.indexOf("end")){
            subJson.type = '99'//结束结点
          }else if(type.indexOf("node")){
            subJson.type = '00'//自动结点
          }else if(type.indexOf("task")){
            subJson.type = '01'//人工节点
          }else if(type.indexOf("state")){
            subJson.type = '02'//状态结点
          }else if(type.indexOf("chat")){
            subJson.type = '04'//决策结点
          }
          _this.postRequest("/procSetting/save",subJson).then(res => {
            if (res.data.code == '00') {
              _this.work.transNewId(id,res.data.data,type);
            }
          })
          console.log(_this.work.exportData())
          return true;
        }

        //保存按钮触发
        _this.work.onBtnSaveClick = function () {

        }

        //刷新按钮
        _this.work.onFreshClick = function () {
          console.log(_this.jsondata)
        }
      },
    }
  }
</script>

<style>
</style>
