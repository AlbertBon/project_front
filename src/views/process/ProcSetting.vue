<template>
  <goo-flow :property="property" :json="jsondata" :remark="remark"></goo-flow>
</template>

<script>
  import GooFlow from '@/components/GooFlow/index.vue'

  // import $ from './utils/jquery.min.js'
  export default {
    components: {GooFlow},
    name: "proc",
    data() {
      return {
        property: {
          width: 1200,
          height: 540,
          toolBtns: ["start round mix", "end round", "task", "node", "chat", "state", "plug", "join", "fork", "complex mix"],
          haveHead: true,
          headLabel: true,
          headBtns: ["new", "open", "save", "undo", "redo", "reload"],//如果haveHead=true，则定义HEAD区的按钮
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
          plug: "附加插件",
          fork: "分支结点",
          join: "联合结点",
          complex: "复合结点",
          group: "组织划分框编辑开关"
        },
        jsondata: {
          "title": "newFlow_1",
          "nodes": {
            "demo_node_1": {
              "name": "开始",
              "left": 42,
              "top": 38,
              "type": "start round mix",
              "width": 26,
              "height": 26,
              "alt": true
            },
            "demo_node_2": {
              "name": "结束",
              "left": 797,
              "top": 42,
              "type": "end round mix",
              "width": 26,
              "height": 26,
              "alt": true
            },
            "demo_node_3": {
              "name": "入职申请",
              "left": 155,
              "top": 39,
              "type": "task",
              "width": 104,
              "height": 26,
              "marked": true,
              "alt": true
            },
            "demo_node_4": {
              "name": "人力审批",
              "left": 364,
              "top": 42,
              "type": "task",
              "width": 104,
              "height": 26,
              "alt": true
            },
            "demo_node_8": {
              "name": "工资判断",
              "left": 571,
              "top": 43,
              "type": "node",
              "width": 104,
              "height": 26,
              "alt": true
            },
            "demo_node_9": {
              "name": "经理终审",
              "left": 559,
              "top": 141,
              "type": "task",
              "width": 104,
              "height": 26,
              "alt": true
            }
          },
          "lines": {
            "demo_line_5": {"type": "sl", "from": "demo_node_3", "to": "demo_node_4", "name": "提交申请"},
            "demo_line_6": {"type": "sl", "from": "demo_node_1", "to": "demo_node_3", "name": ""},
            "demo_line_7": {"type": "tb", "M": 18.5, "from": "demo_node_4", "to": "demo_node_3", "name": "不通过"},
            "demo_line_10": {"type": "sl", "from": "demo_node_4", "to": "demo_node_8", "name": "通过"},
            "demo_line_11": {"type": "tb", "M": 157, "from": "demo_node_9", "to": "demo_node_4", "name": "不接受"},
            "demo_line_12": {"type": "sl", "from": "demo_node_8", "to": "demo_node_9", "name": "大于8000"},
            "demo_line_13": {"type": "sl", "from": "demo_node_8", "to": "demo_node_2", "name": "小于8000"},
            "demo_line_14": {"marked": true, "type": "sl", "from": "demo_node_9", "to": "demo_node_2", "name": "接受"}
          },
          "areas": {
            "1497581247380": {
              "name": "审议会",
              "left": 451,
              "top": 110,
              "color": "red",
              "width": 226,
              "height": 108,
              "alt": true
            }
          },
          "initNum": 16
        }
      }
    },
    created() {
      // this.xyz()
    },
    methods: {
      // xyz() {
      //   let demo = $.createGooFlow($("#demo"), this.property);
      //   demo.setNodeRemarks(this.remark);
      //   demo.loadData(this.jsondata);
      // }

    }
  }
</script>

<style>
  @import "./utils/GooFlow.css";
</style>
