<template>
  <div id="noticeBox">
    <h1 class="title">{{ data.noticeName }}</h1>
    <div class="container" v-html="data.noticeContent"></div>
    <div class="dataTime">{{data.publishTime}}</div>
  </div>
</template>

<script>
export default {
  name: 'noticeBox',
  props: {
    data: {
      type: Object
    }
  }
};
</script>

<style>
.title{
    text-align: center;
}
.container {
    line-height: 28px;
    letter-spacing: 0.5px;
    margin-bottom: 30px;
    text-align: justify;
    word-break: break-all;
    padding: 10px;

}
.dataTime{
    position: absolute;
    bottom: 20px;
    right: 40px;
}
</style>
