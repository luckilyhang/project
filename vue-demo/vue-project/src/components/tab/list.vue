<template>
  <div class="bd">

 
 <ul class="tab-left" style="float:left;width:30%" >
        <li
          v-for="(item,index) in goodslist"
          @click="fn(index)"
          :class="{cur:cur==index}"
          :key="index"
        >{{item.name}}</li>
      </ul>
      
    <section style="float:right;wdith:70%">
       <ul class="tab">
        <li
          v-for="(item,index) in tablist"
          @click="fn(index)"
          :class="{active:cur==index}"
          :key="index"
        >{{item.name}}</li>
      </ul>
      <ul>
        <li
          v-for="(item,index) in arrList"
          v-show="item.aa==cur"
          :key="index"
        >
        <p>{{item.name}}</p>
        <p>{{item.price}}</p>
        <p>{{item.place}}</p>
       
        </li>
      </ul>
    </section>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "./tabBar.vue";
export default {
  components: {
    tabBar
  },
  data() {
    return {
      cur: 0,
      goodslist: [
        {
          name: "进口护理",
          aa: 0
        },
        {
          name: "特殊用纸",
          aa: 1
        },
        {
          name: "口腔护理",
          aa: 2
        },
           {
          name: "家居家电",
          aa: 3
        },
        {
          name: "床上用品",
          aa: 4
        },
        {
          name: "运动套装",
          aa: 5
        }
      ],
         tablist: [
        {
          name: "进口护理",
          aa: 0
        },
        {
          name: "特殊用纸",
          aa: 1
        },
        {
          name: "口腔护理",
          aa: 2
        }
       
      ],
      arrList: [
        {
          name: "香蕉",
          price: 23,
          place: "河南",
          aa: 0
        },
        {
          name: "苹果",
          price: 10,
          place: "福建",
          aa: 1
        },
        {
          name: "梨",
          price: 17,
          place: "浙江",
          aa: 2
        }
      ]
    };
  },
  methods: {
    fn(index) {
      this.cur = index;
    }
  }
};
</script>
<style scoped>
* {
  list-style: none;
}
.bd{
 
}
.tab {
  display: flex;
  justify-content: space-between;
}
.active {
  border-bottom: 2px solid red;
}
.tab li{
    padding-bottom:5px;
}
.tab-left{

}
.tab-left li{
    height:50px;
    line-height:50px;
    background:#ccc;
    margin:5px 0;
}
section {
    width:68%;
  margin-top: 5px;
  background: rgb(228, 187, 187);
}
.cur{
     border-right: 2px solid red;
}

</style>


