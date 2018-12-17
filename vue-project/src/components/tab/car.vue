<template>
  <div class="content">
    <ul id="cate-tab">
      <li
        v-for="(item,index) in cate"
        :key="index"
        @click="id=index"
        :class="{'active':id==index}"
      >
        {{item.des}}

      </li>
    </ul>
    <ul id="goods-list">
      <li
        v-for="(item,index) in arr"
        :key="index"
        v-show="id==index"
      >
        <ul id="gooddec">
          <li
            v-for="(obj,a) in item.part"
            :key="a"
          >
            <img
              :src="obj.img"
              alt=""
            >
            <div style="padding-right:10px;">
              <p>{{obj.name}}</p>
              <p>价格:{{obj.stock}}</p>
              <p>{{obj.sales}}付款</p>
              <p>数量:{{obj.count}}</p>
            </div>
            <i @click="fn(obj,a);add(list)">+</i><span class="save">{{obj.count}}</span>
            <i @click="fn(obj,a);reduce(list)">-</i>
          </li>
        </ul>
      </li>
    </ul>
    <tab-bar></tab-bar>
  </div>
</template>
<script>
import tabBar from "./tabBar.vue";
import { mapState, mapMutations } from "vuex";

export default {
  components: {
    tabBar
  },
  data() {
    return {
      id: 0,
      cate: [
        { id: 0, des: "推荐", part: "推" },
        { id: 1, des: "母婴", part: "母" },
        { id: 2, des: "鞋包饰品", part: "鞋包" },
        { id: 3, des: "食品", part: "食" },
        { id: 4, des: "居家百货", part: "居家" }
      ],
      arr: [
        {
          id: 0,
          part: [
            {
              id: 1001,
              name: "Beats EP头戴式耳机",
              price: 10,
              type: 4,
              stock: 128,
              del: "删除",
              sales: 1872,
              img:
                "http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg"
            },
            {
              id: 1002,
              name: "雀巢（Nestle）高钙成人奶粉",
              price: 11,
              del: "删除",
              type: 3,
              stock: 5,
              sales: 2374,
              img:
                "http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp"
            },
            {
              id: 1008,
              name: "DELSEY 男士双肩背包",
              price: 12,
              type: 2,
              del: "删除",
              stock: 18,
              sales: 69,
              ishot: true,
              img: "http://gw.alicdn.com/tps/LB1HL0mQVXXXXbzXVXXXXXXXXXX.png"
            },
            {
              id: 1009,
              name: "荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g",
              price: 89,
              type: 13,
              stock: 36,
              del: "删除",
              sales: 1895,
              img:
                "http://m.360buyimg.com/babel/s330x330_jfs/t4597/175/4364374663/125149/4fbbaf21/590d4f5aN0467dc26.jpg!q50.jpg.webp"
            }
          ]
        },
        {
          id: 1,
          part: [
            {
              id: 1001,
              name: "煎炒烹炸一锅多用",
              price: 558,
              type: 14,
              stock: 128,
              sales: 1872,
              del: "删除",
              img:
                "http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg"
            },
            {
              id: 1002,
              name: "ANNE KLEIN 潮流经典美式轻奢",
              price: 15,
              type: 3,
              stock: 5,
              del: "删除",
              sales: 2374,
              img:
                "http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp"
            }
          ]
        },
        {
          id: 2,
          part: [
            {
              id: 1001,
              name: "乐高EV3机器人积木玩具",
              price: 16,
              type: 4,
              stock: 128,
              del: "删除",
              sales: 1872,
              img:
                "http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg"
            },
            {
              id: 1002,
              name: "全球购 路易威登（Louis Vuitton）新款女士LV印花手袋 M41112",
              price: 17,
              type: 3,
              stock: 5,
              del: "删除",
              sales: 2374,
              img:
                "http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp"
            }
          ]
        },
        {
          id: 3,
          part: [
            {
              id: 1001,
              name: "Kindle Paperwhite3 黑色经典版电纸书",
              price: 558,
              type: 4,
              del: "删除",
              stock: 128,
              sales: 1872,
              img:
                "http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg"
            },
            {
              id: 1002,
              name: "DELSEY 男士双肩背包",
              price: 60,
              type: 3,
              stock: 5,
              del: "删除",
              sales: 2374,
              img:
                "http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp"
            }
          ]
        },
        {
          id: 4,
          part: [
            {
              id: 1001,
              name: "荷兰 天赋力 Herobaby 婴儿配方奶粉 4段 1岁以上700g",
              price: 558,
              type: 4,
              del: "删除",
              stock: 128,
              sales: 1872,
              img:
                "http://img11.360buyimg.com/n1/s528x528_jfs/t3109/194/2435573156/46587/e0e867ac/57e10978N87220944.jpg!q70.jpg"
            },
            {
              id: 1002,
              name:
                "【全球购】越南acecook河粉牛肉河粉特产 速食即食方便面粉丝 牛肉河粉米粉65克*5袋",
              price: 60,
              type: 3,
              stock: 5,
              del: "删除",
              sales: 2374,
              img:
                "http://m.360buyimg.com/babel/jfs/t5197/28/400249159/97561/304ce550/58ff0dbeN88884779.jpg!q50.jpg.webp"
            }
          ]
        }
      ],
      list: []
    };
  },
  methods: {
    ...mapMutations(["newDE", "add", "reduce"]),
    fn(obj, a) {
      this.list = obj;
    },
    ad(obj, a) {
      console.log(a);
    },
    ed(obj, a) {
      console.log(a);
    }
  },
  computed: {
    ...mapState(["detail", "number", "me"])
  },
  created() {
    // this.newDE();
    // console.log(this.detail);
  }
};
</script>
<style scoped>

#cate-tab {
  /* float:left; */
  display: flex;
  justify-content: space-between;
}
li {
  list-style: none;
}
#cate-tab li.active {
  background: #9a51ff;
}
#cate-tab {
  background: #5d4285;
  color: #fff;
}
#cate-tab li {
  width: 20%;
  height: 40px;
  line-height: 40px;
}
#gooddec li img {
  width: 40px;
  height: 40px;
}
#gooddec li {
  margin: 10px 10px;
  padding: 10px 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #fff;
}
.save {
  width: 32px;
  height: 22px;
  background-color: #7a45e5;
  font-size: 16px;
  line-height: 19px;
  text-align: center;
  color: #fff;
  border-radius: 12px;
  overflow: hidden;
}
</style>


