<template>
  <goo-flow
    ref="gooFlow"
    :property="property"
    :cur-node="curNode"
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
          width: 1000,
          height: 540,
          toolBtns: ["start round mix", "end round mix", "task", "node", "chat", "state"],
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
        },
        jsondata: {
          nodes:{},
          title:"流程",
          lines:{}
        },
        work:{},
        curNode:{

        },
      }
    },
    mounted() {
      this.dataInit()
    },
    methods: {
      //初始化方法
      dataInit(){
        let _this = this;
        //获取节点信息
        _this.postRequest("/procSetting/list",{keyMap:{"equal_formTypeId":"1"}}).then(res => {
          if (res.data.code == '00') {
            let list = res.data.data.list;
            for(let i = 0;i<list.length;i++){
              let node = Object.assign({},list[i])
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
            //获取连线
            _this.postRequest("/procDecision/list",{keyMap:{"equal_formTypeId":"1"}}).then(res => {
              if (res.data.code == '00') {
                let list = res.data.data.list;
                for(let i = 0;i<list.length;i++){
                  let line = Object.assign({},list[i])
                  line.from = list[i].nodeId;
                  line.to = list[i].nextNodeId;
                  line.name = list[i].name;
                  line.type = list[i].type;
                  _this.jsondata.lines[list[i].decisionId] = line;
                }
                console.log(_this.jsondata)
                this.gooFlowInit(_this.jsondata)
              }
            })
          }
        })

      },
      //初始化工作区方法
      gooFlowInit(json){
        let _this = this;
        //调用子组件生成方法并获取子组件生成的gooFlow
        _this.work = _this.$refs.gooFlow.createGooFlow(json);

        //新增node触发
        _this.work.onItemAdd = function(id,type,json){
          console.log(type)
          console.log(json)
          if(type == 'node'){//如果是节点
            let subJson = {};
            subJson.nodeTop = json.top;
            subJson.nodeName = json.name;
            subJson.nodeLeft = json.left;
            subJson.nodeWidth = 26;
            subJson.nodeHeight = 26;
            if(json.type.indexOf("start")>=0){
              subJson.nodeType = '98'//开始节点
            }else if(json.type.indexOf("end")>=0){
              subJson.nodeType = '99'//结束结点
            }else if(json.type.indexOf("node")>=0){
              subJson.nodeType = '00'//自动结点
            }else if(json.type.indexOf("task")>=0){
              subJson.nodeType = '01'//人工节点
            }else if(json.type.indexOf("state")>=0){
              subJson.nodeType = '02'//状态结点
            }else if(json.type.indexOf("chat")>=0){
              subJson.nodeType = '04'//决策结点
            }
            //保存节点
            _this.postRequest("/procSetting/save",subJson).then(res => {
              if (res.data.code == '00') {
                _this.work.transNewId(id,res.data.data,type);
              }
            })
          }else if(type == 'line'){
            let subJson = {};
            subJson.nodeId = json.from;
            subJson.nextNodeId = json.to;
            subJson.name = json.name;
            subJson.type = 'line';
            //保存连线
            _this.postRequest("/procDecision/save",subJson).then(res => {
              if (res.data.code == '00') {
                // _this.work.transNewId(id,res.data.data,type);
              }
            })
          }
          console.log(_this.work.exportData())
          return true;
        }

        //选中节点按钮触发
        _this.work.onItemFocus = function (id,type) {
          if(type == 'node'){
            _this.curNode = _this.work.$nodeData[id];
          }else if(type == 'line'){
            _this.curNode = _this.work.$lineData[id];
            _this.curNode.isLine = true;
          }

          return true;
        }

        //取消选中节点触发
        _this.work.onItemBlur = function (id,type) {
          if(type == 'node'){
            _this.work.$nodeData[id] = _this.curNode;
          }else if(type == 'line'){
            _this.work.$lineData[id] = _this.curNode;
          }
          _this.curNode = {};
          return true;
        }

        //保存按钮触发
        _this.work.onBtnSaveClick = function () {
          let subJson = _this.work.exportData();
          let nodes = []
          let lines = []
          for(let node in subJson.nodes){
            subJson.nodes[node].nodeName = subJson.nodes[node].name;
            subJson.nodes[node].nodeTop = subJson.nodes[node].top;
            subJson.nodes[node].nodeLeft = subJson.nodes[node].left;
            subJson.nodes[node].nodeWidth = subJson.nodes[node].width;
            subJson.nodes[node].nodeHeight = subJson.nodes[node].height;
            nodes.push(subJson.nodes[node])
          }
          //保存节点
          _this.postRequest("/procSetting/updateBatch",nodes).then(res => {
            if (res.data.code == '00') {
              for(let line in subJson.lines){
                subJson.lines[line].decisionId = line;
                subJson.lines[line].nodeId = subJson.lines[line].from;
                subJson.lines[line].nextNodeId = subJson.lines[line].to;
                lines.push(subJson.lines[line])
              }
              _this.postRequest("/procDecision/updateBatch",lines).then(res => {
                if (res.data.code == '00') {
                  _this.$message.success("保存成功");
                }
              })
            }
          })
        }

        //删除节点触发
        _this.work.onItemDel = function (id,type) {
          if(type == 'node'){
            _this.getRequest("/procSetting/delete?key="+id).then(res => {
              if (res.data.code == '00') {
              }
            })
          }else if(type == 'line'){
            _this.getRequest("/procDecision/delete?key="+id).then(res => {
              if (res.data.code == '00') {
              }
            })
          }
          _this.curNode = {};
          return true;
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
