<%@ Page Language="C#" AutoEventWireup="true" CodeBehind="ExecuteSingleEdit.aspx.cs" Inherits="H5_WFY.View.ExecuteSingle.ExecuteSingleEdit" %>

<!DOCTYPE html>

<html id="html" xmlns="http://www.w3.org/1999/xhtml">
<head runat="server">
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta name="viewport" content=" initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <script src="../../Script/CommonJS/jquery-1.5.2.min.js"></script>
    <script src="../../Script/CommonJS/jquery.min.js"></script>
    <%-- 图片缩放和拖拽--%>
    <script src="../../Script/imgJS/alloy_finger.js"></script>
    <script src="../../Script/imgJS/to.js"></script>
    <script src="../../Script/imgJS/transform.js"></script>

    <link href="../../Style/CommonCss/MuiCss/mui.min.css" rel="stylesheet" />

    <style>
        .mui-table-view {
            margin-top:10px;
        }
        .mui-card {
            background-color:#EFEFF4;
        }
        .mui-navigate-right {
            background-color:white;
        }
        .mui-navigate-right {
            border-bottom:solid #A9A9A9 1px;
        }
        .mui-input-row label {
            display:inline-block;
            padding-left:0;
            padding-right:0;
            width:20%;
        }
        .mui-navigate-right {
            color:#6D2229;
        }
       .mui-collapse-content {
            padding-left:10px;
        }
       .mui-collapse-content .mui-input-row input {
         position:relative;
         left:-200px;
         width:100px;
         font-size:14px;
        }
       .label-left {
           width:100px;
        }
       .label-right{
         position:absolute;
       }
       .mui-collapse-content .mui-input-row .input-right {
         width:30%;
         position:static;
         margin-left:10px;
       }
       .mui-collapse-content .mui-input-row .input-left {
         position:absolute;
         left:80px;
         padding-right:0;
         padding-bottom:14px;
       }
       .mui-collapse-content .mui-input-row {
            position:initial;
            height:30px;
        }
        textarea {
            position:absolute;
            left:23%;
            font-size:14px;
        }
        .up-down {
            position:absolute;
            right:15px;
            top:15px;
        }
        .mya {
            background-color:white;
            border-bottom:solid #A9A9A9 1px;
        }
        b {
            color:#6D2229;
        }
        #SubList {
            border:none;
        }
        #hh {
            min-height:30px;
            max-height:50px;
        }
        #txtProName {
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap;
        }
        #mask {
            position:fixed;
            bottom:0;
            background-color:#585858;
            width:100%;
            height:44px;
            z-index:3000;
        }
        #select-commit {
            position:fixed;
            bottom:0;
            z-index:30000;
            width:100%;
            height:44px;
            background-color:#4c4c4c;
        }
        
        #select-commit span:last-child{
            float:right;
            color:white;
            width:30%;
            height:44px;
            line-height:44px;
            text-align:center;
            background-color:#1f6ec4;
            font-weight:900;
        }
        #attachment {
            position: fixed;
            left: 0;
            bottom: 44px;
        }
    </style>
    <title></title>
</head>
<body id="body" >
    <div id="fresh"></div>
   <%-- <img class="fresh"  style="display:none" src="../../Image/gif/fresh.gif" />--%>
    <%--<header class="mui-bar mui-bar-nav">
        <a class="mui-action-back mui-icon mui-icon-left-nav mui-pull-left"></a>
        <h1 class="mui-title">填写报销单</h1>
        <a href="#picture" class=" mui-btn mui-btn-link mui-pull-right mui-btn-blue " style="border: 0; background-color: initial; margin-left: 75%">选择</a>
    </header>--%>
    <header id="header" class="mui-bar mui-bar-nav" style="background-color:#7FBCFF;position:fixed;top:0;">
        <a id="back" style="display:inline-block;height:44px;width:18%;position:fixed;left:0px;padding-left:10px;">
            <img src="../../Image/BXCX/back.png" style="transform:scale(0.5,0.5);position:absolute;top:3.5px;"/><span style="height:44px;line-height:44px;position:absolute;left:30px;color:white;width:34px;">返回</span></a>
        <h1 class="mui-title" style="color:white;width:67%;position:absolute;left:18%">填写报销单</h1>
        <a id="done" href="javascript:void(0);" onclick="window.location.href='/Defalut.aspx?num='+Math.random()" style="color:white;position:absolute;top:10px;right:10px">首页</a>
    </header>
    <form id="form" class="" runat="server" >
        <div class="mui-content" style="border:solid #EFEFF4 5px;">
            <div class="mui-card" style="margin-top: 44px;">
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-collapse mui-active ">
                        <a class="mya" style="color:#6D2229" onclick="changImg(this)"><b>报销信息</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <div class="mui-collapse-content" id="bxList" style="padding-left:10px;padding-right:0;">
                            <div class="mui-input-row">
                                <label style="width:100px;">报销单号：</label>
                                <input class="input-left" type="text" id="txtSingleCode" readonly runat="server" style="color:#A9A9A9"/>
                                <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">报销人员：</label>
                                    <input class="input-right" type="text" id="txtRemainPsn" readonly runat="server" style="position:absolute;left:60px;top:-3px"/>
                                </div>
                            </div>
                            <div class="mui-input-row">
                                <label style="width:100px;">报销部门：</label>
                                <input class="input-left" type="text" id="txtRemainPsnDep" readonly runat="server" />
                                 <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">报销金额：</label>
                                    <input class="input-right" type="text" id="txtBurseMoney" readonly placeholder="" runat="server" style="position:absolute;left:60px;top:-3px;padding-right: 0px;width:35%;"/>
                                 </div>
                            </div>
                          
                            <div class="mui-input-row">
                                <label  style="width:100px;">报销时间：</label>
                                <input type="text" id="txtBurseDate" class="input-left" readonly runat="server" style="position:absolute;left:80px;width:60%;" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="hidRemainPsnID" readonly runat="server" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="hidRemainCode" readonly runat="server" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="hidRemainPsnDepID" readonly runat="server" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="UserID" readonly runat="server" />
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-collapse mui-active " id="ProjectContent">
                        <a class="mya" href="#" style="color:#6D2229" onclick="changImg(this)"><b>项目信息</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <div class="mui-collapse-content" id="ProjectList" style="padding-left:10px;padding-right:0;">
                            <div class="mui-input-row">
                                <label style="width:100px;">项目编号：</label>
                                <input type="text" id="txtProCode" class="input-left" placeholder="自动填写" readonly runat="server" style="text-overflow:clip;width:90%;"/>
                               <%-- <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">累计支出：</label>
                                    <input type="text" id="txtMoneyOut" class="input-right" readonly placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px"/>
                                </div>--%>
                            </div>
                            <div id="hh" class="mui-input-row">
                                <label style="width:100px;">项目名称：</label>
                                <input  id="txtProName" class="input-left" readonly placeholder="自动填写" style="position:absolute;padding-top:10px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;left:80px;right:0px;width:78%"></input>
                                <input type="hidden" id="ProName" class="input-left"/>
                                <%--<div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">经费结余：</label>
                                    <input type="text" id="txtMoneyBalance" class="input-right" readonly placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px"/>
                                </div>--%>
                            </div>

                            <div class="mui-input-row">
                               <label style="width:100px;">累计支出：</label>
                               <input type="text" id="txtMoneyOut" class="input-left" readonly placeholder="自动填写" runat="server" />
                               <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">经费结余：</label>
                                    <input type="text" id="txtMoneyBalance" class="input-right" readonly placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px;padding-right: 0px;"/>
                                </div>
                            </div>

                            <div class="mui-input-row" style="position:static;">
                                <label style="width:100px;">项目类型：</label>
                                <input type="text" id="txtProType" class="input-left" readonly placeholder="自动填写" runat="server" />
                                <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">待付金额：</label>
                                    <input type="text" id="txtMoneyToPay" readonly class="input-right" placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px;padding-right: 0px;"/>
                                </div>
                            </div>
                            <div class="mui-input-row">
                                <label style="width:100px;">项目预算：</label>
                                <input type="text" id="txtBudMoney" class="input-left" readonly placeholder="自动填写" runat="server" />
                                <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">借款金额：</label>
                                    <input type="text" id="txtMoneyToJK" readonly class="input-right" placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px;padding-right: 0px;"/>
                                </div>
                            </div>
                            <div class="mui-input-row">
                                <label style="width:100px;">累计拨入：</label>
                                <input type="text" id="txtMoneyIn" class="input-left" readonly placeholder="自动填写" runat="server" />
                                <div style="position:relative;left:50%;">
                                    <label class="label-right" style="width:70px;position:absolute;left:0;">可用余额：</label>
                                    <input type="text" id="txtMoneyCanUse" readonly class="input-right" placeholder="自动填写" runat="server" style="position:absolute;left:60px;top:-3px;padding-right: 0px;"/>
                                </div>
                            </div>
                            <%--<div class="mui-input-row" >
                                <label>摘要：</label>
                                <input type="text" id="Text1"  placeholder="填写摘要" runat="server" style="border-bottom:solid #A9A9A9 1px;height:22px;margin-top:5px;text-align:center;position:relative;top:0;"/>
                            </div>--%>
                           
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ZJID" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ZJName" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ProjectYear" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ProjectID" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ProjectDepID" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="ReDepID" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="txtDZFP"/>
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <input type="text" id="TS" />
                            </div>
                            <div class="mui-input-row" style="display: none">
                                <label>预算部门</label>
                                <input type="text" id="txtBudDep" runat="server" />
                            </div>
                        </div>
                    </li>
                </ul>
                <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-collapse-3 mui-active" style="border:none;padding-bottom: 8px;">
                        <a class="mya" href="#" style="color:#6D2229"><b>科目信息</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <ul class="mui-table-view" id="SubList" style="display: block;">
                            <li id="kemu" style="height: 40px;">
                                <div class="mui-input-row" style="height: 40px;">
                                    <label style="position:absolute;left:10px;width:82px;">科目：</label>
                                    <input type="text" class="input-left" placeholder="自动填写" readonly style="position:absolute;left:50px;padding-bottom:15px;font-size:14px;"/>
                                 </div>
                            </li>
                        </ul>
                    </li>
                </ul>
               <%-- <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-collapse mui-active" style="display: block" >
                        <a class="mya" href="#" style="color:#6D2229" onclick="changImg(this)"><b>附件信息</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <div class="mui-collapse-content">
                            <div id="" class="">

                            </div>
                        </div>
                    </li>
                </ul>--%>

                  <ul class="mui-table-view">
                    <li class="mui-table-view-cell mui-collapse mui-active" style="display: block" >
                        <a class="mya" href="#" style="color:#6D2229" onclick="changImg(this)"><b>附件信息</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <div class="mui-collapse-content">
                           <div class="div-inner2">
                                <a id="aimg"><img src="../../Image/attachment/add.png" /></a>
                                <div style="color:#A9A9A9">选择附件</div>
                                <div id="selected_files">
                                </div>
                           </div>
                        </div>
                     </li>
                  </ul>

               <%-- 附件存放的隐藏域--%>
                <div id="file_photo" style="display:none;">
                </div>
                <div id="file_local" style="display:none;">
                </div>

                <ul class="mui-table-view" runat="server">
                    <li class="mui-table-view-cell mui-collapse mui-active">
                        <a class="mya" href="#" onclick="changImg(this)"><b>添加备注</b><img class="up-down" src="../../Image/BXSP/jt-zk-up.png" /></a>
                        <div class="mui-collapse-content" style="padding-left:5px;">
                            <div style="margin: 10px 5px;position:relative;">
                                <label class="label-left">备注：</label>
                                <input id="txtBxReMark" class="" type="text" placeholder="添加备注" style="border-radius:initial;border:none;border-bottom:solid #A9A9A9 1px;float:right;width:88%;padding-top:0;padding-bottom:0;height:22px;position:absolute;left:40px;width:91%;" />
                            </div>
                        </div>
                    </li>
                 </ul>
                <%--<div class="mui-button-row">
                        <button class="mui-btn mui-btn-primary" id="btnSave" type="button" style="background-color:#9A2229;border:none;">保存并提交</button>
                </div>--%>

           <%-- </div>
        </div>--%>
   <%-- </form>--%>


    <div id="attachment" class="mui-popover mui-popover-action mui-popover-bottom">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a href="#" id="choosePhoto" >立即拍照</a>
            </li>
        </ul>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell">
                <a href="#attachment" style="color:#007AFF">取消</a>
            </li>
        </ul>
    </div>

    <div id="picture" class="mui-popover mui-popover-action mui-popover-bottom" style="position:fixed;left:0;bottom:40px;margin-top:0;margin-bottom:4px;background-color:white;height:20%;">
        <div id="notice" style="height:25px;background-color:#fef3ce;">
            <img src="../../Image/SingleEditImg/lb@2x.png" style="transform:scale(0.6,0.6);float:left;margin-top:1px;"/>
            <span style="display:inline-block;height:100%;line-height:29.4px;float:left;">请先选择预算项目</span>
            <img src="../../Image/SingleEditImg/收缩箭头拷贝@2x.png" style="height:100%;padding:5px 0 5px 0;margin-right:10px;transform:scale(0.8,0.8);float:right;"/>
        </div>
                <a href="#" id="choosePro" style="width:50%;height:80%;display:inline-block;float:left;border-right:solid #b5b5b5 2px;position:fixed;left:0;">
                    <img src="../../Image/SingleEditImg/hong1@2x.png" style="margin-top:15%;float:left;margin-left:5%;float:left;width:30%;"/>
                    <span style="width:55%;color:black;text-align:center;padding-top:0;left:30px;display:inline-block;float:left;font-size:20px;font-weight:900;margin:23% 0 23% 0;">预算项目</span> 
                </a>
                <a  href="#" id="chooseSub" style="width:50%;height:80%;display:inline-block;float:right;position:fixed;right:0;">   
                    <img src="../../Image/SingleEditImg/lv1@2x.png" style="margin-top:15%;margin-left:5%;float:left;width:30%;"/>
                    <span style="width:55%;color:black;text-align:center;padding-top:0;position:static;left:30px;display:inline-block;float:left;margin-top:20%;font-size:20px;font-weight:900;margin:23% 0 23% 0;">预算科目</span>
                </a>

    </div>

   
    <div id="select-commit"  style="position:fixed;left:0;height:44px;width:100%;">
        <a href="#picture" id="jfys" class="mui-btn mui-btn-link mui-pull-right mui-btn-blue" style="float:left;height:44px;line-height:44px;padding-top: 0px;padding-bottom: 0px;padding-left:0;padding-right:0;text-align:center;width:70%;color:white;font-weight:900;">
            <img src="../../Image/SingleEditImg/jfys@2x.png" style="float:left;transform:scale(0.8,0.8);margin-top:2px;margin-left: 80px;"/>
            <div style="float:left;margin-left:10px;">经费预算</div>
        </a>
        <span  id="btnSave" style="background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #408fe6), color-stop(1, #1f64c4));"><img src="../../Image/SingleEditImg/tj@2x.png" style="float:left;padding-left:20px;margin-top:2px;transform:scale(0.8,0.8)"/><span style="float:left;margin-left:4px;background-image: -webkit-gradient(linear, left top, left bottom, color-stop(0, #408fe6), color-stop(1, #1f64c4));">提交</span></span>
    </div>

       </div>
   </div>
</form>
    <%--<div id="photoMask" style="display:none" onclick="closePhoto()"></div>
    <img id="photoImg" src="" style="display:none" onclick="closePhoto()"/>--%>
    <div id="photoMask" class="imgBox" onclick="closePhoto()">
        <img id="photoImg" src="" onclick="closePhoto()" style="transform: perspective(500px) matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);" />
    </div>
   
    <div style="height: 40px"></div>

    <link href="CSS/App_Edit.css" rel="stylesheet" />
    <script src="../../Script/CommonJS/MuiJs/mui.min.js"></script>
    <script src="../../Script/CommonJS/RqCommonJs.js"></script>
    <script src="js/FunctionJs.js"></script>
    <script type="text/javascript">
        mui.init({
            swipeBack: true //启用右滑关闭功能
        });
        //mui('.mui-scroll-wrapper').scroll();
        //history.pushState(null, null, document.URL);
        //window.addEventListener("popstate", function () {  //回调函数中实现需要的功能
        //    if (sessionStorage.getItem("tempHtml")) {
        //        sessionStorage.removeItem("tempHtml");
        //    }
        //    location.replace('../../Defalut.aspx?num=' + Math.random() + '');  //在这里指定其返回的地址
        //}, false);
        var info = document.getElementById("info");
        mui('body').on('tap', '.mui-popover-action li>a', function () {
            var a = this,
				parent;
            //根据点击按钮，反推当前是哪个actionsheet
            for (parent = a.parentNode; parent != document.body; parent = parent.parentNode) {
                if (parent.classList.contains('mui-popover-action')) {
                    break;
                }
            }
            //关闭actionsheet
            mui('#' + parent.id).popover('toggle');
        })
    </script>
        <script type="text/javascript">
            //科目下拉
            var imgs = document.getElementsByClassName("mya");
            for (var i = 0; i < imgs.length; i++) {
                imgs[i].addEventListener("tap", function () {
                    if (this.lastElementChild.getAttribute("src") == "../../Image/BXSP/jt-zk-up.png") {
                        this.lastElementChild.setAttribute("src", "../../Image/BXSP/jt-zk.png");
                        if (this.innerText == "科目信息") {
                            document.getElementById("SubList").setAttribute("style", "display:none");
                            document.getElementById("kemu").setAttribute("style", "display:none");
                        }
                    } else {
                        this.lastElementChild.setAttribute("src", "../../Image/BXSP/jt-zk-up.png");
                        if (this.innerText == "科目信息") {
                            document.getElementById("SubList").setAttribute("style", "display:block");
                            document.getElementById("kemu").setAttribute("style", "");
                        }
                    }
                });
            }

            //返回键跳转
            document.getElementById("back").addEventListener("tap", function () {
                sessionStorage.setItem("tempHtml", "");//清除科目仓库
                window.top.location = "/Defalut.aspx?num=" + Math.random();

            });

            //上传附件
            document.getElementById("aimg").addEventListener("tap", function () {
                var length = document.getElementById("selected_files").children.length;
                if (length == 3) {
                    mui.toast("限传3张图片！");
                    return;
                }
                var file = $('<input type="file"  accept="image/*" onchange="selectLocal(this)" />');
                $("#file_photo").append(file);
                file.click();
            });

            //document.getElementById("choosePhoto").addEventListener("tap", function () {
            //    var file = $('<input type="file"  accept="image/*" onchange="selectLocal(this)" />');
            //    $("#file_photo").append(file);
            //    file.click();
            //});

            function selectLocal(obj) {
                var length = document.getElementById("selected_files").children.length;
                //if (length == 2) {
                //    document.getElementById("aimg").href = "123";
                //} else {
                //    document.getElementById("aimg").href = "#attachment";
                //}

                var file = obj.files[0];
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function (e) {
                    if (file.size > 512000) { //500K
                        dealImage(e.target.result, {
                            width: 500, quality: 1
                        }, function (base) {
                            $("#selected_files").append($('<div style="margin-left:10px;position:relative;height:40px"><img src="' + base + '"  onclick="showPhoto(this)" style="display:inline-block;line-height:30px;height:30px;margin-top:5px;"><span onclick="showPhoto(this)" style="display:inline-block;position:absolute;height:40px;line-height:40px;margin-left:10px;">' + "附件" + (length + 1) + '</span></img><input onclick="deleteFile(this)" type="button" value="删除" style="position:absolute;font-weight:900;transform:scale(0.8,0.8);font-size:15px;color:#7FBCFF;border:solid #7FBCFF 3px;border-radius:10px;float:right;position:absolute;right:0;" /></div>'));
                        });
                    } else {
                        $("#selected_files").append($('<div style="margin-left:10px;position:relative;height:40px"><img src="' + e.target.result + '"  onclick="showPhoto(this)" style="display:inline-block;line-height:30px;height:30px;margin-top:5px;"><span onclick="showPhoto(this)" style="display:inline-block;position:absolute;height:40px;line-height:40px;margin-left:10px;">' + "附件" + (length + 1) + '</span></img><input onclick="deleteFile(this)" type="button" value="删除" style="position:absolute;font-weight:900;transform:scale(0.8,0.8);font-size:15px;color:#7FBCFF;border:solid #7FBCFF 3px;border-radius:10px;float:right;position:absolute;right:0;" /></div>'));
                    }
                };
            }

            function showPhoto(obj) {
                document.getElementById("photoMask").setAttribute("style", "position:fixed;top:0;left:0;width:100%;height:100%;background-color:black;z-index:99998;");
                document.getElementById("photoImg").setAttribute("style", "position:fixed;top:0;left:0;z-index:99999;width:100%;height:100%;");
                if (obj.src) {
                    document.getElementById("photoImg").setAttribute("src", obj.src);
                } else {
                    document.getElementById("photoImg").setAttribute("src", obj.parentNode.firstElementChild.src);
                }
                document.getElementById("body").setAttribute("style", "overflow-y:hidden !important");
            }

            function closePhoto(obj) {
                document.getElementById("photoMask").setAttribute("style", "display:none");
                document.getElementById("photoImg").setAttribute("style", "display:none");
                document.getElementById("body").setAttribute("style", "");
            }

            function deleteFile(obj) {
                //先删除用户取消上传时空的input标签
                var childrens = document.getElementById("file_photo").children;
                var array = [];
                for (var i = 0; i < childrens.length; i++) {
                    if (!childrens[i].files[0]) {
                        array.push(childrens[i]);
                    }
                }
                for (var i = 0; i < array.length; i++) {
                    $(array[i]).remove();
                }

               //再删除选中要删除的input和img
                var length = document.getElementById("selected_files").children.length;
                //if (length == 2) {
                //    document.getElementById("aimg").href = "123";
                //} else {
                //    document.getElementById("aimg").href = "#attachment";
                //}
                var fileName = obj.parentNode.innerText;
                var n = parseInt(fileName.substring(fileName.length - 1, fileName.length));
                $(obj).parent().remove();
                var files = document.getElementById("file_photo").children;
                for (var i = 0; i < files.length; i++) {
                    if (i + 1 == n) {
                        $(files[i]).remove();
                    }
                }

                //图片被删除后重新命名
                var divfiles = document.getElementById("selected_files").children;
                for (var i = 0; i < divfiles.length; i++) {
                    divfiles[i].children[1].innerText = "附件" + (i + 1);
                }
            }


            //图片压缩
            function dealImage(path, obj, callback) {
                var img = new Image();
                img.src = path;
                img.onload = function () {
                    var that = this;
                    // 默认按比例压缩
                    var w = that.width,
                     h = that.height,
                     scale = w / h;
                    w = obj.width || w;
                    h = obj.height || (w / scale);
                    var quality = 0.7;  // 默认图片质量为0.7
                    //生成canvas
                    var canvas = document.createElement('canvas');
                    var ctx = canvas.getContext('2d');
                    // 创建属性节点
                    var anw = document.createAttribute("width");
                    anw.nodeValue = w;
                    var anh = document.createAttribute("height");
                    anh.nodeValue = h;
                    canvas.setAttributeNode(anw);
                    canvas.setAttributeNode(anh);

                    canvas.height = w;
                    canvas.width = h;
                    ctx.rotate(Math.PI / 2);
                    ctx.translate(0, -h);

                    ctx.drawImage(that, 0, 0, w, h);
                    // 图像质量
                    if (obj.quality && obj.quality <= 1 && obj.quality > 0) {
                        quality = obj.quality;
                    }
                    // quality值越小，所绘制出的图像越模糊
                    var base64 = canvas.toDataURL('image/jpeg', quality);
                    // 回调函数返回base64的值
                    callback(base64);
                }
            }


            //刷新时，若科目选择为0，则展示‘科目自动填写‘区域
            $(function () {
                var ul = document.getElementById("SubList");
                if (ul.childNodes.length == 0) {
                    var html = '';
                    html += '<li id="kemu" style="height: 40px;">'
                    html += '   <div class="mui-input-row" style="height: 40px;">'
                    html += '                 <label style="position:absolute;left:10px;width:82px;">科目：</label>'
                    html += '                 <input type="text" class="input-left" placeholder="自动填写" readonly="" style="position:absolute;left:50px;padding-bottom:15px;font-size:14px;">'
                    html += '              </div>'
                    html += '          </li>'
                    ul.innerHTML = html;
                }
            });

            //项目、科目筛选的上拉框
            document.getElementById("jfys").addEventListener("tap", function () {
                if (document.getElementById("txtProCode").value) {
                    document.getElementById("picture").style.height = "30%";
                    document.getElementById("notice").style.height = "12%";
                    var html = "";
                    html += ' <a href="#" id="choosePro" style="width:50%;height:88%;display:inline-block;float:left;border-right:solid #b5b5b5 2px;position:fixed;left:0;">'
                    html += ' <img src="../../Image/SingleEditImg/hong1@2x.png" style="height:20%;float:left;margin-top:5%;margin-bottom:5%;margin-left:20%;"/>'
                    html += ' <span style="float:left;margin-left:5%;margin-top:8%;font-size:20px;font-weight:900;color:black;">预算项目</span> '
                    html += ' <div id="proDetail" style="height:70%;overflow:hidden;overflow:scroll;width:100%;float:left;position:absolute;top:30%">'
                    html += '    <div style="color:black;height:100%">'
                    html += '         <div style="width:100%;padding-left:15%;padding-top:15%"><span>编号：</span><span id="txtProCode1"></span></div>'
                    html += '         <div style="width:100%;padding-left:15%;"><span>名称：</span><span id="txtProName1"></span></div>'
                    html += '         <div style="display:none;"><span>项目类型：</span><span id="txtProType1"></span></div>'
                    html += '         <div style="display:none;"><span>项目预算：</span><span id="txtBudMoney1"></span></div>'
                    html += '         <div style="display:none;"><span>累计拨入：</span><span id="txtMoneyIn1"></span></div>'
                    html += '         <div style="display:none;"><span>累计支出：</span><span id="txtMoneyOut1"></span></div>'
                    html += '         <div style="display:none;"><span>经费结余：</span><span id="txtMoneyBalance1"></span></div>'
                    html += '         <div style="display:none;"><span>可用余额：</span><span id="txtMoneyCanUse1"></span></div>'
                    html += '         <div style="display:none;"><span>待付金额：</span><span id="txtMoneyToPay1"></span></div>'
                    html += '         <div style="display:none;"><span>借款金额：</span><span id="txtMoneyToJK1"></span></div>'
                    html += '    </div>'
                    html += ' </div>'
                    html += ' </a>'
                    html += ' <a href="#" id="chooseSub" style="width:50%;height:80%;display:inline-block;float:right;position:fixed;right:0;">'
                    html += '    <img src="../../Image/SingleEditImg/lv1@2x.png" style="height:20%;float:left;margin-top:5%;margin-bottom:5%;margin-left:20%;transform:scale(1.1,1.1)"/>'
                    html += '    <span style="float:left;margin-left:5%;margin-top:8%;font-size:20px;font-weight:900;color:black;">预算科目</span> '
                    html += '    <div id="subDetail" style="height:80%;padding-top:20%;overflow:hidden;overflow:scroll;width:100%;float:left;position:absolute;top:30%;text-align:center;color:red">'
                    html += '     请选择科目！'
                    html += '    </div>'
                    html += '</a>'
                    $("#choosePro").remove();
                    $("#chooseSub").remove();
                    $("#picture").append(html);

                    document.getElementById("txtProCode1").innerText = document.getElementById("txtProCode").value;
                    document.getElementById("txtProName1").innerText = document.getElementById("txtProName").value;
                    //document.getElementById("txtProType1").innerText = document.getElementById("txtProType").value;
                    //document.getElementById("txtBudMoney1").innerText = document.getElementById("txtBudMoney").value;
                    //document.getElementById("txtMoneyIn1").innerText = document.getElementById("txtMoneyIn").value;
                    //document.getElementById("txtMoneyOut1").innerText = document.getElementById("txtMoneyOut").value;
                    //document.getElementById("txtMoneyBalance1").innerText = document.getElementById("txtMoneyBalance").value;
                    //document.getElementById("txtMoneyCanUse1").innerText = document.getElementById("txtMoneyCanUse").value;
                    //document.getElementById("txtMoneyToPay1").innerText = document.getElementById("txtMoneyToPay").value;
                    //document.getElementById("txtMoneyToJK1").innerText = document.getElementById("txtMoneyToJK").value;

                    var height1 = $("#subDetail").css("height");
                    if ($("#SubList").children().length > 0) {
                        if ($("#SubList").children().length == 1 && $("#SubList").children().first().attr("id") == "kemu" || $("#SubList").children().length == 0) {
                            return;
                        }
                        var html = '<div id="content2" style="margin-left:5%;color:black;height:100%">'
                        var length = $("#SubList").children().length;
                        for (var i = 0; i < length; i++) {
                            html += '<div><span>科目：</span><span>' + $("#SubList").children()[i].firstElementChild.firstElementChild.firstElementChild.children[2].lastElementChild.value + '</span></div>';
                        }
                        html += '</div>';
                        document.getElementById("subDetail").innerText = "";
                        document.getElementById("subDetail").innerHTML = html;
                        document.getElementById("subDetail").style.paddingTop = 0;
                    }
                }
            });


            //document.getElementById("done").addEventListener("tap", function () {
            //    window.top.location = "/Defalut.aspx";
            //});
        </script>
 <script>
     //图片缩放和拖拽
     var photoImg = document.getElementById("photoImg");
     Transform(photoImg);
     var initScale = 1;
     new AlloyFinger(photoImg, {
         pressMove: function (evt) {
             photoImg.translateX += evt.deltaX;
             photoImg.translateY += evt.deltaY;
             evt.preventDefault();
         },
         multipointStart: function () {
             initScale = photoImg.scaleX;
         },
         pinch: function (evt) {
             photoImg.scaleX = photoImg.scaleY = initScale * evt.zoom;
         }
     });

    </script>

    <script>
        //刷新gif
        //window.onload = function () {
        //    document.getElementsByClassName("fresh")[0].style.display = "none";
        //}
    </script>
</body>
</html>
