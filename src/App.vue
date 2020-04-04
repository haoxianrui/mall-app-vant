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
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    background: #f5f5f5;
  }
  #app{
    height: 100%;
  }
</style>
