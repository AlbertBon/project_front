<template>
  <div>
    <div id="demo" style="margin:10px"></div>
    <input id="submit" type="button" value='导出结果' onclick="Export()"/>
    <textarea id="result" row="6"></textarea>
  </div>
</template>

<script>
  import GooFlow from './utils/GooFlow.js'
  import $ from './utils/jquery.min.js'
  import
    export default {
        name: "index.vue"
    }
</script>

<style scoped>
@import "utils/GooFlow.css";
</style>
