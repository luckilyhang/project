<template>
    <div>
        <!-- 头部 -->
          <approve text="首页"></approve>
          <!-- 轮播 -->
          <mt-swipe :auto="4000" class="slide">
          <mt-swipe-item><img src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3446150031,292444226&fm=15&gp=0.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=3589338267,3298896646&fm=15&gp=0.jpg" alt=""></mt-swipe-item>
          <mt-swipe-item><img src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=497516847,248827956&fm=15&gp=0.jpg" alt=""></mt-swipe-item>
          </mt-swipe>
          <!-- 上拉加载，下拉刷新 -->
          <div class="page-loadmore">
<div class="page-loadmore-wrapper" ref="wrapper" :style="{ height: wrapperHeight + 'px' }">
<mt-spinner v-show="list.length<1 && InitialLoading" color="#26a2ff"></mt-spinner>
<mt-loadmore :top-method="loadTop" @translate-change="translateChange" @top-status-change="handleTopChange"
        :bottom-method="loadBottom" @bottom-status-change="handleBottomChange" :bottom-all-loaded="allLoaded"
        :auto-fill="false" ref="loadmore">
<!-- :auto-fill="true" 时页面加载完毕时 默认执行loadBottom 值为false时 自己写一个加载 -->
<ul class="page-loadmore-list" v-if="list.length>0">
<li v-for="(item,index) in list" :key="index" class="page-loadmore-listitem" style="display:flex;justify-content:space-around;">
    <div>
<img :src="item.pic" alt="">
    </div>
    <!-- <div>
        <span style="font-size:.01rem;">
            {{item.title}}
        </span>
    </div> -->
    <div>
  <span style="font-size:.1rem;">{{item.date}}</span>
    </div>


</li>
</ul>
<div slot="top" class="mint-loadmore-top" style="text-align:center">
<span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">上拉刷新</span>
<mt-spinner v-show="topStatus == 'loading'" color="#26a2ff"></mt-spinner>
</div>
<div v-if="allLoaded" style="text-align:center;">没有更多数据了</div>
<div slot="bottom" class="mint-loadmore-bottom">
<span v-show="bottomStatus !== 'loading'" :class="{ 'is-rotate': bottomStatus === 'drop' }">加载更多</span>
<span v-show="bottomStatus === 'loading'">
<mt-spinner v-show="bottomStatus == 'loading'" color="#26a2ff"></mt-spinner>
</span>
</div>
</mt-loadmore>
</div>
</div>
    </div>
</template>

<script>
import approve from './head'
import axios from 'axios'  
export default {
    components:{
        approve
    },
    data(){
        return{
         page:1,//页码
size:5,//每页显示的个数
InitialLoading: true,//初始加载
list:[],//数据
allLoaded: false,//数据是否加载完毕
bottomStatus: '',//底部上拉加载状态
wrapperHeight: 0,//容器高度
topStatus: '',//顶部下拉加载状态
translate: 0,//
moveTranslate: 0,
        }
    },
    mounted(){
    
let windowWidth = document.documentElement.clientWidth;//获取屏幕高度
if(windowWidth>768){//这里根据自己的实际情况设置容器的高度
this.wrapperHeight = document.documentElement.clientHeight - 130;
}else{
this.wrapperHeight = document.documentElement.clientHeight - 90;
}
 axios.get('http://ons.me/tools/dropload/json.php', {
    params: {
     page:this.page,
     size:this.size
    }
  })
  .then((response)=> { 
     
      let _this=this;
      this.list= response.data;
     
  })
  .catch(function (error) {
    console.log(error);
  });
},
methods:{
handleBottomChange(status) {
this.moveTranslate = 1;
this.bottomStatus = status;
},
loadBottom() {

    // this.handleBottomChange("loading");//上拉时 改变状态码
 axios.get('http://ons.me/tools/dropload/json.php', {
    params: {
    page:this.page++,
     size:this.size
    }
  })
  .then((response)=> { 
      console.log()
      let _this=this;
      this.list= response.data;
      console.log(this.list)
      if(this.list.length>0){//最多下拉三次
         this.pageNum++;//上拉加载 每次数值加1
       }else{
      this.allLoaded = true;//模拟数据加载完毕 禁用上拉加载
      }
   this.handleBottomChange("loadingEnd");//数据加载完毕 修改状态码
   this.$refs.loadmore.onBottomLoaded();
     
  })
  .catch(function (error) {
    console.log(error);
  });
},
handleTopChange(status) {
this.moveTranslate = 1;
this.topStatus = status;
},
translateChange(translate) {
const translateNum = +translate;
this.translate = translateNum.toFixed(2);
this.moveTranslate = (1 + translateNum / 70).toFixed(2);
},
loadTop() {//下拉刷新 模拟数据请求这里为了方便使用一次性定时器
this.handleTopChange("loading");//下拉时 改变状态码
// this.pageNum = 1;
this.allLoaded = false;//下拉刷新时解除上拉加载的禁用
 axios.get('http://ons.me/tools/dropload/json.php', {
    params: {
    page:1,
     size:this.size
    }
  })
  .then((response)=> {
   this.page=1;
     let _this=this;
      this.list= response.data;
      console.log(this.list)
      this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
       this.$refs.loadmore.onTopLoaded();
  })
  .catch(function (error) {
    console.log(error);
  });



// setTimeout(() => {
// this.list = 12;//下拉刷新 数据初始化
// this.handleTopChange("loadingEnd")//数据加载完毕 修改状态码
// this.$refs.loadmore.onTopLoaded();
// }, 1500);
},
}
    }


</script>
<style>
.slide{
    margin-top:-20px;
    width:100%;
    height:7rem;
}
.slide img{
width:100%;
}
.mint-searchbar{
position:fixed;
top:2rem;
width:100%;
}
.mint-searchbar{
    background:transparent; 
}
.mint-searchbar-core{
    background:transparent;
}
.page-title,
.page-footer {
text-align: center;
position: absolute;
}
.page-title {
top: 0;
left: 0;
width: 100%;
height: 50px;
line-height: 50px;
}
.page-footer {
left: 0;
bottom: 0;
width: 100%;
height: 40px;
line-height: 40px;
}
.page-title+* {
margin-top: 50px;
}
@media (min-width: 768px){
.page-title {
height: 90px;
line-height: 90px;
}
.page-title+* {
margin-top: 90px;
}
}
.page-loadmore-listitem {
height:5rem;
line-height:5rem;
text-align: center
}

.page-loadmore-listitem {
border-top: 1px solid #eee
}

.page-loadmore-wrapper {
overflow: scroll
}
.page-loadmore-list {
list-style: none;
padding: 0;
margin: 0;
position: relative;
}
</style>

