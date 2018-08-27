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
          toolBtns: ["start round mix", "end round mix", "task", "node", "chat", "state", "complex mix"],
          haveHead: true,
          headLabel: true,
          headBtns: ["save"],//如果haveHead=true，则定义HEAD区的按钮
          haveTool: true,
          haveGroup: true,
          useOperStack: true
        },
        remark: {
          cursor: "选择指针",
          direct: "结点连线",
          start: "入口结点",
          end: "结束结点",
          task: "任务结点",
          node: "自动结点",
          chat: "决策结点",
          state: "状态结点",
          group: "组织划分框编辑开关"
        },
        jsondata: {
          nodes:{},
          title:"流程",
          lines:{}
        },
        work:{}
      }
    },
    mounted() {
      this.dataInit()

    },
    methods: {
      dataInit(){
        let _this = this;
        //获取节点信息
        _this.postRequest("/procSetting/list",{keyMap:{"equal_formTypeId":"1"}}).then(res => {
          if (res.data.code == '00') {
            let list = res.data.data.list;
            for(let i = 0;i<list.length;i++){
              let node = {}
              node.top = list[i].nodeTop;
              node.name = list[i].nodeName;
              node.left = list[i].nodeLeft;
              node.width = 26;
              node.height = 26;
              node.alt = true;
              if(list[i].nodeType=='98'){
                node.type = 'start round mix'//开始节点
              }else if(list[i].nodeType=='99'){
                node.type = 'end round mix'//结束结点
              }else if(list[i].nodeType=='00'){
                node.type = '00'//自动结点
              }else if(list[i].nodeType=='01'){
                node.type = 'task'//人工节点
              }else if(list[i].nodeType=='02'){
                node.type = '02'//状态结点
              }else if(list[i].nodeType=='04'){
                node.type = '04'//决策结点
              }
              _this.jsondata.nodes[list[i].nodeId] = node;
            }
          }
        })
        //保存连线
        _this.postRequest("/procDecision/list",{keyMap:{"equal_formTypeId":"1"}}).then(res => {
          if (res.data.code == '00') {
            let list = res.data.data.list;
            for(let i = 0;i<list.length;i++){
              let line = {}
              line.from = list[i].nodeId;
              line.to = list[i].nextNodeId;
              line.name = list[i].name;
              _this.jsondata.lines[list[i].decisionId] = line;
            }
            this.gooFlowInit(_this.jsondata)
          }
        })
      },
      gooFlowInit(json){
        let _this = this;
        //调用子组件生成方法并获取子组件生成的gooFlow
        _this.work = _this.$refs.gooFlow.createGooFlow(json);

        //新增node触发
        _this.work.onItemAdd = function(id,type,json){
          console.log(type)
          console.log(json)
          if(type == 'node'){//如果是节点
            let subJson = Object.assign({},json);
            if(subJson.type.indexOf("start")>=0){
              subJson.type = '98'//开始节点
            }else if(subJson.type.indexOf("end")>=0){
              subJson.type = '99'//结束结点
            }else if(subJson.type.indexOf("node")>=0){
              subJson.type = '00'//自动结点
            }else if(subJson.type.indexOf("task")>=0){
              subJson.type = '01'//人工节点
            }else if(subJson.type.indexOf("state")>=0){
              subJson.type = '02'//状态结点
            }else if(subJson.type.indexOf("chat")>=0){
              subJson.type = '04'//决策结点
            }
            //保存节点
            _this.postRequest("/procSetting/save",subJson).then(res => {
              if (res.data.code == '00') {
                _this.work.transNewId(id,res.data.data,type);
              }
            })
          }else if(type == 'line'){
            //保存连线
            _this.postRequest("/procDecision/save",json).then(res => {
              if (res.data.code == '00') {

              }
            })
          }

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
