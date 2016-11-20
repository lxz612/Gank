<template>
  <div id="start">
    <div class="logo">
      <img src="../assets/logo_vue.png">
      <img src="../assets/logo_gank.png">
    </div>
    <h1 v-text="msg"></h1>
    <p v-text="author"></p>
  </div>
</template>
<script>
  export default {
    name: 'start',
    data () {
      return {
        msg: 'Welcome to GankApp with Vue.js',
        author:'by lxz612'
      }
    },
    ready(){
      setTimeout(() => {
          this.$route.router.go({ name: 'index'});
      },2000);
    }
  }
</script>
<style>
  #app{
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
  #start {
    color: #2c3e50;
    text-align: center;  
    padding: 10px;
  }

  #start .logo{
    margin-top: 150px;
  }

  #start .logo img{
    width:100px;
    height: 100px;
    margin: 10px;
    border-radius: 5px;
  }
</style>
