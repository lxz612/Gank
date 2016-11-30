<template>
  <div class="start">
    <div class="logo">
      <img src="../assets/logo_vue.png">
      <img src="../assets/logo_gank.png">
    </div>
    <h1 v-text="msg"></h1>
    <p v-text="author"></p>
  </div>
</template>
<script>
  module.exports={
    name: 'start',
    data:function(){
      return {
        msg: 'Welcome to GankApp with Vue.js',
        author:'Author:lxz612'
      }
    },
    ready(){
      var _self=this;
      setTimeout(function(){
          _self.$route.router.go({ name: 'index'});
      },2000);
    }
  }
</script>
<style>
  /* 全局样式 */
  body,img{
    padding:0;
    margin:0;
  }
  body{
    font-family: "Helvetica Neue", Helvetica, STHeiTi, sans-serif;
  }

  /* start.vue样式 */
  .start {
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform:translate(-50%,-50%);
    width: 100%;
    color: #2c3e50;
    text-align: center;  
    padding: 10px;
  }

  .start .logo img{
    width:100px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
  }
</style>
