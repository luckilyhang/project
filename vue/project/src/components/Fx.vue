<template>
    <div>
     <approve text="发现"></approve>
     <!-- 选择时间按钮s -->
<!-- <mt-button @click.native="openPicker">{{dateTime}}</mt-button> -->
    <div>
        出发日期:<input @click='openPicker' type="text"  v-model="dateTime">
    </div>
      <div>
        返回日期:<input @click="work" type="text"  v-model="cc">
    </div>
<!-- <mt-button @click.native="openPicker"></mt-button> -->
          <!--日期选择器-->
    <mt-datetime-picker
      type="date"
      ref="picker"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="aa"
      :startDate="startDate"
      >
    </mt-datetime-picker>
     <mt-datetime-picker
      type="date"
      ref="pic"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="dd"
      :startDate="startDate"
      >
    </mt-datetime-picker>
    <span>{{b}}</span>
    </div>
</template>
<script> 
import approve from './head'  
import moment from 'moment'
// import Event from './index.js'
export default {
      components:{  
       approve
    },
    data(){
       return {
      dateTime: '',
      cc:'',
      b:'我是',
      startDate: new Date()
       }
    },
    methods:{
    //     send(){
    //    Event.$emit("a-msg", this.b);

    //     },
    openPicker() {
    this.$refs.picker.open()
    },
     work() {
    this.$refs.pic.open()
    },
    aa(data) {
        console.log(data)
      let date = moment(data).format('YYYY.MM.DD')
      this.dateTime = date
    },
    dd(data) {
        // console.log(data)
      let date = moment(data).format('YYYY.MM.DD')
      this.cc = date
    }
}
}
</script>
<style>

</style>

