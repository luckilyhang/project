
//选择项目、科目加载代码
$(function () {
    //访问页面之前判断一下缓存  有缓存就加载  注:保存之后要清一下缓存
    if (localStorage.getItem("ProjectContent")) {
        document.getElementById("ProjectContent").innerHTML = localStorage.getItem("ProjectContent");
        localStorage.removeItem("ProjectContent");
    }
    if (sessionStorage.getItem("tempHtml")) { //科目缓存
        var htmlData = JSON.parse(sessionStorage.getItem("tempHtml"));
        var tempHtml = "";
        for (var i = 0; i < htmlData.length; i++) {
            tempHtml += htmlData[i];
        }
        document.getElementById("SubList").innerHTML = tempHtml;
        getCalMoney();
    }
    var proDepId = GetQueryString('projectDepID');
    if (proDepId != null) {
        mui.ajax('../../../HandlerAjaxRequest.ashx?operateKind=GetProject', {
            data: { proDepId: proDepId },
            async: false,
            dataType: 'json', //服务器返回json格式数据  
            type: 'get', //HTTP请求类型  
            timeout: 10000, //超时时间设置为10秒；  
            success: function (data) {
                if (data.length == 1) {
                    //可用余额计算
                    var tmpOut = parseFloat(data[0].M_FundsOut);
                    var tmpBegionOut = parseFloat(data[0].vT_M_FundsBeginIn);
                    if (tmpOut == "") { tmpOut = "0"; }
                    if (tmpBegionOut == "") { tmpBegionOut = "0"; }
                    var tmpP = 0;
                    if (data[0].Kz_Percent != "") {
                        tmpP = parseFloat(data[0].Kz_Percent);
                    }
                    var tmppA = parseFloat(data[0].M_FundsIn);
                    var tmppB = parseFloat(data[0].Qiankuan);
                    var tmppC = parseFloat(data[0].NeedPayMoney);
                    var tmppD = parseFloat(data[0].M_FundsOut);
                    if (tmppA == "") { tmppA = "0"; }; if (tmppB == "") { tmppB = "0"; }; if (tmppC == "") { tmppC = "0"; }; if (tmppD == "") { tmppD = "0"; };
                    var txtMoneyCanUse = ((1 + tmpP / 100) * tmppA - tmppC - tmppD + tmpBegionOut + tmppB).toString();


                    var ProjectList = document.getElementById("ProjectList");
                    document.getElementById("ProjectDepID").value = data[0].ProjectDepID;//项目部门ID
                    document.getElementById("ProjectYear").value = data[0].ProjectYear;//项目年份 
                    document.getElementById("ReDepID").value = data[0].PDepID;//预算部门ID
                    document.getElementById("ProjectID").value = data[0].vProjectID;
                    document.getElementById("TS").value = data[0].IsTS;
                    document.getElementById("ZJID").value = data[0].vPro_XZ_ID;//资金来源
                    document.getElementById("ZJName").value = data[0].vPro_XZ_Name;//资金id

                    ProjectList.querySelector("#txtProCode").value = data[0].ProjectDepCode;//编号
                    ProjectList.querySelector("#txtProName").value = data[0].ProjectName;//项目名称ProName
                    ProjectList.querySelector("#ProName").value = data[0].ProjectName;//项目名称
                    ProjectList.querySelector("#txtProType").value = data[0].ProjectTypeName;//项目类型
                    ProjectList.querySelector("#txtBudMoney").value = fmoney(data[0].M_FundsPlan);//项目预算
                    ProjectList.querySelector("#txtMoneyIn").value = fmoney(data[0].M_FundsIn);//累计拨入
                    ProjectList.querySelector("#txtMoneyOut").value = fmoney(data[0].M_FundsOut);//累计支出
                    ProjectList.querySelector("#txtMoneyBalance").value = fmoney(data[0].M_Fundsbalance);//经费结余
                    ProjectList.querySelector("#txtMoneyToPay").value = fmoney(data[0].NeedPayMoney);//待支付金额
                    ProjectList.querySelector("#txtMoneyToJK").value = fmoney(data[0].Qiankuan);//借款金额
                    ProjectList.querySelector("#txtMoneyCanUse").value = fmoney(txtMoneyCanUse);//可用余额
                    ProjectList.querySelector("#txtBudDep").value = data[0].PDepName;//预算部门
                }
            }
        });
    }
});
///////////////////////////////////////////////////////

//页面跳转函数
function showView(url) {
    //alert("11");
    //跳转页面之前先保存一下缓存
    localStorage.setItem("content", document.getElementById("ProjectContent").innerHTML);
    if (document.getElementById("ProjectDepID").value.length == 0 && url == "../Subject/SelectSubject.aspx") {
        mui.toast("请先选择项目");
        return;
    } else if (url == "../Subject/SelectSubject.aspx") {    //选择科目
        var ulList = document.getElementById("SubList");
        url += "?proDepId=" + document.getElementById("ProjectDepID").value + "";
    } else {                                                //换项目 清空一下科目缓存
        sessionStorage.removeItem("tempHtml");
    }
    location.replace(url);//不会有历史记录
}

///////////////////////////////////////////////////////嵌套折叠代码
var inputTap = false;
mui('.mui-card').on('tap', '.allSelect', function () {
    inputTap = true;
});
mui('.mui-card').on('tap', '.mui-navigate-right', function () {
    if (inputTap) {
        inputTap = false;
        return;
    }
    //记录状态
    var li = this.parentNode;
    var ul = this.parentNode.querySelector('.mui-table-view');
    if (ul) {
        var _style = ul.style.display;
        //关闭同级菜单
        var parent = this.parentNode.parentNode.children;
        //for (var i = 0; i < parent.length; i++) {
        //    if (!!parent[i].querySelector('.mui-table-view')) {
        //        parent[i].querySelector('.mui-table-view').style.display = '';
        //        removeClass(parent[i], 'mui-active');
        //    }
        //}
        //更改状态
        if (_style == 'block') {
            ul.style.display = '';
            removeClass(li, 'mui-active');
        } else {
            ul.style.display = 'block';
            addClass(li, 'mui-active');
        }
        //关闭下级子菜单
        //var children = ul.children;
        //for (var i = 0; i < children.length; i++) {
        //    var child = children[i].querySelector('.mui-table-view');
        //    if (!!child) {
        //        child.style.display = '';
        //        removeClass(children[i], 'mui-active');
        //    }
        //}
    }
});

function hasClass(obj, cls) {
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
function addClass(obj, cls) {
    if (!this.hasClass(obj, cls)) obj.className += " " + cls;
}
function removeClass(obj, cls) {
    if (hasClass(obj, cls)) {
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg, '');
    }
}
////////////////////////////////////////////////////////////

mui('#picture').on('tap', '#choosePro', function () {
    showView('../ProjectList/SelectProject.aspx');
});
mui('#picture').on('tap', '#chooseSub', function () {
    showView('../Subject/SelectSubject.aspx');
});
//科目删除功能
mui('#SubList').on('tap', '.mui-btn', function () {
    var li = this.parentNode.parentNode.parentNode.parentNode.parentNode;
    var ul = document.getElementById("SubList");
    var ulChild = ul.childNodes;
    var htmlData = JSON.parse(sessionStorage.getItem("tempHtml"));
    var btnArray = ['是', '否'];
    mui.confirm('确定要删除当前科目吗？', '提示', btnArray, function (e) {
        if (e.index == 0) {
            for (var i = 0; i < ulChild.length; i++) {
                if (li == ulChild[i]) {
                    htmlData.remove(i);
                    sessionStorage.setItem("tempHtml", JSON.stringify(htmlData));
                }
            }
            ul.removeChild(li);
            getCalMoney();
            mui.toast("删除成功");
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
        }
    });
});

//保存并提交按钮
document.getElementById("btnSave").addEventListener("tap", function () {
    var SubDivs = document.getElementById("SubList").querySelectorAll(".mui-collapse-content");
    var BxDivs = document.getElementById("bxList");
    var ProDivs = document.getElementById("ProjectList");

    var BXData = {
        BxDivs: ConvertToXML(BxDivs),
        ProDivs: ConvertToXML(ProDivs),
        SubDivs: ConvertToXML(SubDivs),
        BxReMark: document.getElementById("txtBxReMark").value,
    };

    if (ProDivs.querySelector("#txtProName").value == "") {
        mui.toast("项目信息不能为空");
        return false;
    }
    if (BXData.SubDivs == "") {
        mui.toast("科目信息不能为空");
        return false;
    }
    for (var i = 0; i < SubDivs.length; i++) {
        var bxInputs = SubDivs[i].querySelectorAll(".mui-input-row input");
        var bxMoney = bxInputs[10].value.replace(/￥/g, "").replace(/,/g, "");
        var subMoneyCanUse = bxInputs[10].value.replace(/￥/g, "").replace(/,/g, "");
        if (bxMoney == "" || bxMoney == "NaN.undefined" || typeof (bxMoney) == "undefined") {
            mui.alert("科目信息第" + (i + 1) + "行，报销金额不能为空。");
            return false;
        }
        if (parseFloat(bxMoney) <= 0) {
            mui.alert("科目信息第" + (i + 1) + "行，报销金额应该是大于0的数字。。");
            return false;
        }
        if (parseFloat(bxMoney) > parseFloat(subMoneyCanUse)) {
            mui.alert("科目信息第" + (i + 1) + "行，报销金额不能大于可用余额。");
            return false;
        }
    }
    var txtRemarks = document.getElementsByClassName("txtRemark");
    for (var i = 0; i < txtRemarks.length; i++) {
        if (txtRemarks[i].value == "") {
            mui.alert("科目信息第" + (i + 1) + "条，科目摘要不能为空。");
            return false;
        }
    }
    var m1 = document.getElementById("txtBurseMoney").value;
    var m2 = document.getElementById("txtMoneyCanUse").value;
    m1 = m1.replace(/￥/g, "").replace(/,/g, "");
    m2 = m2.replace(/￥/g, "").replace(/,/g, "");

    if (parseFloat(m1) > parseFloat(m2)) {
        mui.toast("报销总金额不能大于可用余额。");
        return false;
    }
    if (parseFloat(m1) < 0) {
        mui.toast("报销总金额不能小于零。");
        return false;
    }

    document.getElementById("fresh").innerHTML = '<img class="fresh"  style="z-index:40000;width:100%;position:fixed;padding-top:90%;padding-bottom:90%;padding-left:45%;padding-right:45%;" src="../../Image/gif/fresh.gif" />';
    mui.toast("提交中...");

    var BxId = "";
    var t1 = new Date().getTime();
    console.log(new Date().getTime());
    setTimeout(function () {
        mui.ajax('../../../HandlerAjaxRequest.ashx?operateKind=SaveCommitBX', {
            data: BXData,
            async: false,
            dataType: 'text', //服务器返回json格式数据  
            type: 'post', //HTTP请求类型  
            timeout: 90000, //超时时间设置为10秒；  
            success: function (result) {

                if (result.split("|")[0] == "0") {
                    BxId = result.split("|")[1];
                    sessionStorage.clear();
                    localStorage.removeItem("ProjectContent");
                    var childrens = document.getElementById("file_photo").children;
                    var base64childrens = document.getElementById("selected_files").children;
                    if (childrens.length > 0) {
                        //先删除用户取消上传时空的input标签
                        var array = [];
                        for (var i = 0; i < childrens.length; i++) {
                            if (!childrens[i].files[0]) {
                                array.push(childrens[i]);
                            }
                        }
                        for (var i = 0; i < array.length; i++) {
                            $(array[i]).remove();
                        }
                        childrens = document.getElementById("file_photo").children;
                        for (var i = 0; i < childrens.length; i++) {
                            //alert("循环")
                           
                            var FileExt = childrens[i].files[0].name.split(".")[childrens[i].files[0].name.split(".").length - 1];
                            var FileName = base64childrens[i].innerText + '.' + FileExt;
                            var FileContent = childrens[i].files[0];

                            var formData = new FormData();
                            formData.append("BxId", BxId);
                            formData.append("FileName", FileName);
                            formData.append("FileContent", childrens[i].files[0]);
                            console.log(formData.get("BxId"));
                            console.log(formData.get("FileName"));
                            console.log(formData.get("FileContent"));
                            //var objectUrl = window.URL.createObjectURL(file);
                            //document.getElementById("img").src = objectUrl;
                            //FileContent = encodeURI(FileContent);
                            $.ajax({
                                url: "/HandlerAjaxRequest.ashx?operateKind=UploadFile",//"http://202.107.218.62:8990/FileMange/handler/BxfjHandler.ashx?method=AddFile",
                                data: formData,
                                processData: false,
                                contentType:false,
                                async: false,
                                type: "post",
                                dataType: "json",
                                //cache: false,//上传文件无需缓存
                                timeout: 900000,
                                success: function (result) {
                                    //alert("成功");
                                    console.log(result);
                                    if (result == "0") {
                                        mui.toast("附件上传失败，请重新上传！");
                                        return;
                                    }
                                },
                                error: function (e) {
                                    //alert(e.statusText);
                                    console.log(e);
                                    //mui.toast("出错了，请稍后再试！");
                                    return;
                                }
                            });

                        }

                    }
                    //document.getElementsByClassName("fresh")[0].style.display = "none";
                    mui.toast("操作成功");
                    var t2 = new Date().getTime();
                    console.log(new Date().getTime());
                    console.log(t2 - t1);
                    location.replace('ExecuteSingleList.aspx');
                } else {
                    mui.toast(result);
                }

            }
        });
    }, 500);


});


//保存并提交按钮
//mui('.mui-card').on('tap', '#btnSave', function () {

//    var SubDivs = document.getElementById("SubList").querySelectorAll(".mui-collapse-content");
//    var BxDivs = document.getElementById("bxList");
//    var ProDivs = document.getElementById("ProjectList");

//    var BXData = {
//        BxDivs: ConvertToXML(BxDivs),
//        ProDivs: ConvertToXML(ProDivs),
//        SubDivs: ConvertToXML(SubDivs),
//        BxReMark: document.getElementById("txtBxReMark").value
//    };

//    if (ProDivs.querySelector("#txtProName").value == "") {
//        mui.toast("项目信息不能为空");
//        return false;
//    }
//    if (BXData.SubDivs == "") {
//        mui.toast("科目信息不能为空");
//        return false;
//    }
//    for (var i = 0; i < SubDivs.length; i++) {
//        var bxInputs = SubDivs[i].querySelectorAll(".mui-input-row input");
//        var bxMoney = bxInputs[10].value.replace(/￥/g, "").replace(/,/g, "");
//        var subMoneyCanUse = bxInputs[10].value.replace(/￥/g, "").replace(/,/g, "");
//        if (bxMoney == "" || bxMoney == "NaN.undefined" || typeof (bxMoney) == "undefined") {
//            mui.alert("科目信息第" + (i + 1) + "行，报销金额不能为空。");
//            return false;
//        }
//        if (parseFloat(bxMoney) <= 0) {
//            mui.alert("科目信息第" + (i + 1) + "行，报销金额应该是大于0的数字。。");
//            return false;
//        }
//        if (parseFloat(bxMoney) > parseFloat(subMoneyCanUse)) {
//            mui.alert("科目信息第" + (i + 1) + "行，报销金额不能大于可用余额。");
//            return false;
//        }
//    }
//    var txtRemarks = document.getElementsByClassName("txtRemark");
//    for (var i = 0; i < txtRemarks.length; i++) {
//        if (txtRemarks[i].value=="") {
//            mui.alert("科目信息第" + (i + 1) + "条，科目摘要不能为空。");
//            return false;
//        }
//    }
//    var m1 = document.getElementById("txtBurseMoney").value;
//    var m2 = document.getElementById("txtMoneyCanUse").value;
//    m1 = m1.replace(/￥/g, "").replace(/,/g, "");
//    m2 = m2.replace(/￥/g, "").replace(/,/g, "");

//    if (parseFloat(m1) > parseFloat(m2)) {
//        mui.toast("报销总金额不能大于可用余额。");
//        return false;
//    }
//    if (parseFloat(m1) < 0) {
//        mui.toast("报销总金额不能小于零。");
//        return false;
//    }
//    mui.ajax('../../../HandlerAjaxRequest.ashx?operateKind=SaveCommitBX', {
//        data: BXData,
//        async: false,
//        dataType: 'text', //服务器返回json格式数据  
//        type: 'post', //HTTP请求类型  
//        timeout: 10000, //超时时间设置为10秒；  
//        success: function (result) {
//            if (result = "0") {
//                mui.toast("操作成功");
//                sessionStorage.clear();
//                localStorage.removeItem("ProjectContent");
//                location.replace('ExecuteSingleList.aspx');
//            } else {
//                mui.toast(result);
//            }

//        }
//    });
//});


//报销总金额计算
mui('.mui-card').on('change', '#txtVMoney', getCalMoney);

function getCalMoney() {
    var ulList = document.getElementById("SubList").querySelectorAll(".vMoney");
    var MoneyTotal = 0;
    for (var i = 0; i < ulList.length; i++) {
        if (ulList[i].value) {
            MoneyTotal += parseFloat(ulList[i].value.replace("￥", "").replace(/,/g, ""));
        }
    }
    document.getElementById("txtBurseMoney").value = fmoney(MoneyTotal);
}

