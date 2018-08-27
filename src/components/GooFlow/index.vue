<template>
  <div>
    <div id="work" ref="work" style="margin:10px"></div>
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
    },
    methods: {
      createGooFlow() {
        let _this = this;
        let work = $.createGooFlow($("#work"), this.property);
        work.setNodeRemarks(this.remark);
        work.loadData(this.json);
        return work;
      }


    }
  }
</script>

<style>
  @import "./utils/GooFlow.css";
</style>
