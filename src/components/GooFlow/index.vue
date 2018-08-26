<template>
  <div>
    <div id="demo" ref="demo" style="margin:10px"></div>
    <input id="submit" type="button" value='导出结果' />
    <textarea id="result" row="6"></textarea>
  </div>
</template>

<script>
  import GooFlow from './utils/GooFlow.js'
  export default {
    name: "GooFlow",
    props:{
      property: Object,
      remark: Object,
      json: Object
    },
    data() {
      return {

      }
    },
    mounted() {
      this.createGooFlow()
    },
    methods: {
      createGooFlow() {
        let demo = $.createGooFlow($("#demo"), this.property);
        demo.setNodeRemarks(this.remark);
        demo.loadData(this.json);
      }

    }
  }
</script>

<style scoped>
  @import "./utils/GooFlow.css";
</style>
