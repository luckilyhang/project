<script>
					              var pageindex=1;//显示第几页
                                   var pagesize=10;//一页显示几个
                                        var parmRecord= {//点击选择辅助信息所需参数
                                            pageindex:pageindex,
                                            pagesize:pagesize
                                        }
										  function loadTable(parmRecord,table,laypage){//封装加载表格的函数
											     var title = [ //定义表头  
                                                    {
                                                        type: 'radio',
                                                        fixed: 'left'
                                                    }, {
                                                        field: 'code',
                                                        title: '编号',
                                                        align: 'left',
                                                        width: 280
                                                    }, {
                                                        field: 'name',
                                                        title: '名称',
                                                        align: 'left',
                                                        width: 280
                                                    }
                                                ]
                                        table.render({
                                            height:600,//table高度
                                            elem: '#test10',//要渲染的节点
                                            page: false,//是否分页
                                            async:false,//是否异步
                                            method:"post",//请求方式
                                            where:parmRecord,//入参
                                            url: url + "PZ/FZHS/Info", //数据接口
                                            contentType: 'application/json',//请求数据类型
                                            headers:{"Authorization":localStorage.getItem('token')},//token
                                            request: {
                                                pageName:"pageindex", //页码的参数名称，默认：page
                                                limitName: 'pagesize' //每页数据量的参数名，默认：limit
                                            },
                                            response: {
                                                statusName: 'success' //数据状态的字段名称，默认：code
                                                , statusCode:0 //成功的状态码，默认：0
                                                , msgName: 'msg' //状态信息的字段名称，默认：msg
                                                , countName: 'totalcount' //数据总数的字段名称，默认：count
                                                , dataName: 'data' //数据列表的字段名称，默认：data
                                            },
                                            parseData: function (res) {//数据返回页面未渲染之前操作
                                                console.log(res);
                                                if(res.data.dt.length>0){
                                                    res.data.dt[0].LAY_CHECKED = true //默认选中单选框操作
                                                }
                                                if (res.success != 0) {
                                                    layer.msg("获取数据失败");
                                                    return;
                                                }
                                                var data = res.data.dt; //获取后台的数组
                                                total = res.data.totalcount;//获取总条数
                                                return {
                                                    data: data, //返回数据
                                                    totalcount: total,//总条数
                                                    msg: res.msg,//返回报错讯息
                                                    success: res.success //是否成功
                                                };
                                            },
                                            cols: [title],
                                            done: function (res, curr, count) {//渲染页面后的操作
                                               $('#fzhs').css('overflow-y',"hidden"); //在layer弹框下，关闭弹框竖向滚动条
                                                //如果是异步请求数据方式，res即为你接口返回的信息。
                                                //如果是直接赋值的方式，res即为：{data: [], count: 99} data为当前页数据、count为数据总长度
                                                laypage.render({ //分页组件
                                                    elem: 'test10'
                                                    , count: count //对应done函数里边的参数
                                                    , curr:parmRecord.pageindex //参数所定义的 page第几页
                                                    , limit: 10 //一页显示几个
                                                    , layout: ['prev', 'page', 'next', 'skip', 'count']
                                                    , jump: function (obj, first) {
                                                        console.log(obj);
                                                        if (!first) { //如果不是第一页进行的操作
                                                            parmRecord.pageindex = obj.curr; //把当前第几页重新赋值
                                                            parmRecord.pagesize = obj.limit; //把当前一页显示几个重新赋值
                                                            loadTable(parmRecord,table,laypage); //重新加载表格的函数 第一个是所需参数，第二个为table实例，第三个为分页组件
                                                        }
                                                    }
                                                });
                                                $('.layui-laypage').css({"position":"absolute",'bottom':0,"right":0,"left":0,"background":"#fff","z-index":1000}); //不知什么原因，分页组件渲染之后在表格顶部，这份代码是把分页放到表格之后的操作
                                            }
                                        }); 
										  }
										
	                                


</script>
