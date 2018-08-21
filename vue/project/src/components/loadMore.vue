<template>
        <div>
            <Cloadmore @loadBottom="loadBottom" @loadTop="loadTop" ref="listTopic">

                <!-- 放入要加载的数据     -->
            <Cloadmore>
        </div>
    </template>

    <script>
    import Cloadmore from 'loadmore.vue'
        export default {
            data () {
                return  {
                    loader: false
                }
            },
            created(){
                // ### 建议把网络请求进行封装   本人在做项目是发现loadbottom进入页面就会加载   
                //     不知是本人样式原因还是怎么   首页数据加载时中是页面卷去一点 。
                //     最后   请求数据成功后设置scrollTop解决
                this.$refs.listTopic.onBottomLoaded();
            
                setTimeout(function () {
                    document.querySelector('.page-loadmore-wrapper').scrollTop = 0;
                }, 0)
            },
        methods: {
                loadBottom() {  
                
                    let self = this;
                    
                    if(!this.loader){
                        return;
                    };
                    setTimeout(() => {
                    // 发送请求加载数据  数据请求成功设置为loader为 true
                        self.$refs.listTopic.onBottomLoaded();

                    }, 2000);
                },
                loadTop() {
                    let self = this;
                    setTimeout(() => {
                        // 发送请求加载数据  数据请求成功设置为loader为 true
                        self.$refs.listTopic.onTopLoaded();
                    }, 1500);
                },
            },
            components: {
                Cloadmore // 引入的组建
            }
        }
    </script>