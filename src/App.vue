<template>
  <div id="app">
    <router-view ></router-view>
  </div>
</template>

<script>
  window.onload = function () {
    document.addEventListener('touchstart', function (event) {
      if (event.touches.length > 1) {
        event.preventDefault()
      }
    })
    document.addEventListener('gesturestart', function (event) {
      event.preventDefault()
    })
  }
</script>


<style lang="less">
  *{margin: 0;padding: 0;}
  html,body{
    background: #fff;
    width: 100%;
    overflow-x: hidden;
  }
  #app {
    font-family: "Helvetica Neue",Helvetica,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 0;
  }
  @media only screen and (min-width: 768px) {
    body{background: #f6f6f6;}
    #app{width: 640px;margin: 0 auto;}
  }
</style>
