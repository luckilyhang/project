import Vue from 'vue'
import Vuex from 'vuex'
import './public'
Vue.use(Vuex);
export const store = new Vuex.Store({
  state: {
    number: 1,
    me: 1,
    detail: [],
    money:0,
    token:true
  },
  mutations: {
    add(state, list) {
      let bOff = true;
      state.detail.forEach((item) => {
        if (item.id === list.id) {//如果数据重复，数量自增1
          item.count++;
          let att=0;
         for(let i=0;i<state.detail.length;i++){
           att+=state.detail[i].price*state.detail[i].count;
         }
         state.money=att
         localStorage.setItem('userInfo',JSON.stringify(state.detail));
          bOff = false 
        }
      }) 
      if (bOff) {//如果数据不重复，把数据添加到state.detail数组中
        let goodsData = list //设置letgoodsData新变量等于传过来的list
        Vue.set(goodsData, 'count', 1)//数据不重复时，设置变量为count为1
         state.detail.push(goodsData)//将数据添加到state.detail中
         let att=0;
         for(let i=0;i<state.detail.length;i++){
          att+=state.detail[i].price*state.detail[i].count;
        }
        localStorage.setItem('userInfo',JSON.stringify(state.detail));
        state.money=att
      } 
    },
    educe(state) {
      state.me--;
    },
    reduce(state, list) {
      let bOff = true;
      state.detail.forEach((item) => {
        if (item.id === list.id) {//如果数据重复，数量减1
          item.count=item.count>0?item.count-1:0;
          bOff = false 
          let att=0;
          for(let i=0;i<state.detail.length;i++){
           att+=state.detail[i].price*state.detail[i].count;
         }
         state.money=att
         console.log(state.detail)
        }
      }) 
      if (bOff) {//如果数据不重复，把数据添加到state.detail数组中
        let goodsData = list //设置letgoodsData新变量等于传过来的list
        Vue.set(goodsData, 'count', 1)//数据不重复时，设置变量为count为1
         state.detail.push(goodsData)//将数据添加到state.detail中
         let att=0;
         for(let i=0;i<state.detail.length;i++){
          att+=state.detail[i].price*state.detail[i].count;
        }
        state.money=att
  
        console.log(state.detail)
      } 
    },
    del(state,value){
        state.detail.splice(value,1);
        console.log(state.detail);
        let att=0;
        for(let i=0;i<state.detail.length;i++){
         att+=state.detail[i].price*state.detail[i].count;
       }
      //  localStorage.setItem('userInfo',JSON.stringify(state.detail));
       state.money=att

    }
  },
  actions: {
    increment({
      commit
    }) {
      commit('add');
    },
    apart({
      commit
    }) {
      commit('educe');
    }
  }
})
export default store
