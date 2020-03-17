<template>
   <div class="main">
       <van-grid :border="true" :column-num="1" >
           <van-grid-item>
               <van-card
                       tag="秒杀"
                       price="2.00"
                       desc="描述信息描述信息描述信息描述信息"
                       title="商品标题描述信息描述信息描述信息"
                       thumb="https://img.yzcdn.cn/vant/apple-1.jpg"
                       origin-price="10.00"
               >
                   <div slot="footer">
                       <van-button size="mini">按钮</van-button>
                       <van-button size="mini">按钮</van-button>
                   </div>

               </van-card>
           </van-grid-item>
           <van-grid-item>
               <van-image src="https://img.yzcdn.cn/vant/apple-2.jpg" />
           </van-grid-item>
           <van-grid-item>
               <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
           </van-grid-item>
           <van-grid-item>
               <van-image src="https://img.yzcdn.cn/vant/apple-3.jpg" />
           </van-grid-item>
       </van-grid>
   </div>
</template>

<script>
    export default {
        name: "goods"
    }
</script>

<style lang="less" scoped>
    .main{
        .van-grid-item{
            height: 200px;
        }

    }

</style>