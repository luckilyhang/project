<template>
    <div>
        <h4 @click="fn">兄弟组件</h4>
        <ul>
            <li v-for="item in arrData">{{item.price}}</li>
        </ul>
    </div>
</template>

<script>
import Bus from "./../bus.js";
export default {
    data() {
        return {
            arrData: []
        };
    },
    methods: {
        fn() {
            // console.log(this.arrData);
            Bus.$on("val", function(data) {
                //  var vm = this;
                this.arrData = data;
                console.log(this.arrData);
            });
        }
    },
    created() {
        
    }
};
</script>

