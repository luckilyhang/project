

//单选框只能选择一个
$('#test').find('input[type=checkbox]').on('click', function () {
    $('#test').find('input[type=checkbox]').not(this).attr("checked", false);
});
//window.onload = function () {
    
//保存出差时间
console.log($('#entertime').html());

var InfoName = localStorage.getItem('projectName');
console.log(InfoName);  
var ProjectId = localStorage.getItem('projectId');
console.log(ProjectId);
console.log(localStorage.getItem('projectName'));
//出差目的地
console.log(localStorage.getItem('Md'));

$('#plcItem').html(localStorage.getItem('projectName'));
if (localStorage.getItem('projectName')) {
    $('#plcItem').html(localStorage.getItem('projectName'));
    //localStorage.removeItem('projectName');
    $('#entertime').html(localStorage.getItem('tripTime'));

    $('#entertime').css('color', '#000');
    $('#plcItem').css('color', '#000');
} else {
    $('#plcItem').text('预算项目选择');
    $('#entertime').text('请选择出差时间');
    $('#entertime').css('color', '#999');
}
if (localStorage.getItem('Md')) {
    $('#apply-origin').val(localStorage.getItem('Md'));
    //localStorage.removeItem('Md');
} else {
    $('#apply-origin').val(localStorage.getItem('请选择出差目的地'));
    $('#entertime').css('color', '#999');
}
//缓存职称职务
localStorage.setItem('Zw',$('#apply-job').val());
console.log(localStorage.getItem('Zw'));
$('#apply-job').val(localStorage.getItem('Zw'));


localStorage.setItem('Zc', $('#apply-job option:selected').text());
console.log(localStorage.getItem('Zc'));
if (localStorage.getItem('Zw')) {
    $('#apply-job').val(localStorage.getItem('Zw'));
    localStorage.removeItem('Zw');
} else {
    $('#apply-job').css('color', '#000');
}
if (localStorage.getItem('Zc')) {
    $('#apply-job option:selected').text(localStorage.getItem('Zc'));
    localStorage.removeItem('Zc');
} else {
    $('#apply-job').css('color', '#000');
}
//localStorage.clear();

function yz() {
    // 验证身份证 
    function checkIdentity(identity) {
        var reg = /^[1-9]{1}[0-9]{14}$|^[1-9]{1}[0-9]{16}([0-9]|[xX])$/;
        if (reg.test(identity)) {
            return true;
        } else {
            return false;
        }
    }
    $('#apply-card').on('change', function () {
        if (checkIdentity($('#apply-card').val())) {

        } else {
            alert("身份证输入不合法");
            $(this).val('');
            return;
        }
    })
}
yz();
var DepID = DepID;
var userID = userID;
//获取code
dd.ready(function () {
    dd.runtime.permission.requestAuthCode({
        corpId: "ding1ac57d592aa1cbb235c2f4657eb6378f",
        onSuccess: function (result) {
            CODE = result.code;
            $.ajax({
                async: false,
                type: "get",
                dataType: 'json',
                url: "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_GetDDUserID?code=" + CODE,
                success: function (data) {
                    user = data.userid
                    $.ajax({
                        async: false,
                        type: "get",
                        dataType: 'json',
                        url: "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_GetDDUserInfo?userid="+user,
                        success: function (data) {
                            console.log(data)
                            var obj = data.isLeaderInDepts;
                            console.log(data)
                            DepID = obj.split(':')[0].substr(1);
                            userID = data.userid;
                            //获取审批id和名字
                            arrId = [];
                            arrName = [];
                            for (var i = 0; i < data.roles.length; i++) {
                                if (data.roles[i].groupName == '员工审批类型') {
                                    arrId.push(data.roles[i].id);
                                    arrName.push(data.roles[i].name);
                                    break;
                                } else {
                                    obj.roleID == '';
                                    obj.roleName = '';
                                }
                            }
                            //获取审批id和结束
                            //获取职称职务
                            if (data.extattr) {
                                ZW = data.extattr.职务 == null ? $('#apply-title').val(): data.extattr.职务;
                                $('#apply-title').val(ZW);
                            }


                            $.ajax({
                                async: false,
                                type: "get",
                                dataType: 'json',
                                url: "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_GetDDDepInfo?ID=" + DepID,
                                success: function (data) {
                                    console.log(data);
                                    $('#apply-dept').val(data.name)
                                    deptManagerUseridList = data.deptManagerUseridList
                                }, error: function () {

                                }
                            })
                            $('#apply-name').val(data.name);
                            $('#apply-iphone').val(data.mobile);
                            $('#jobNum').val(data.jobnumber);
                        }, error: function () {
                            //alert("不能访问数据")
                        }
                    });

                }, error: function () {
                    //alert("不能访问数据")
                }
            });
        },
        onFail: function (err) { }
    });
});
$('#plcItem').on('click', function () {
    //保存出差时间
    localStorage.setItem('tripTime', $('#entertime').text())
   
    var aa = $('#jobNum').val();
    localStorage.setItem("user", JSON.stringify(aa));
    $.ajax({
        type: "get",
        dataType: 'json',
        data: { param: JSON.stringify({ vCode: aa }) },
        url: "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_GetProInfo",
        success: function (data) {
            var data = JSON.parse(data.data);
            console.log(data)

        }, error: function () {
            //alert("不能访问数据")
        }
    });

})
//出差时间开始
$('.select-time').hotelDate();
//出差时间结束
//出发日期返回日期开始
$(function () {
    var currYear = (new Date()).getFullYear();
    var opt = {};
    opt.date = { preset: 'date' };
    opt.datetime = { preset: 'datetime' };
    opt.time = { preset: 'time' };
    opt.default = {
        theme: 'android-ics light', //皮肤样式
        display: 'modal', //显示方式 
        mode: 'scroller', //日期选择模式
        dateFormat: 'yyyy-mm-dd',
        lang: 'zh',
        showNow: true,
        nowText: "今天",
        startYear: currYear - 10, //开始年份
        endYear: currYear + 10 //结束年份
    };
    $("#appDate").mobiscroll($.extend(opt['date'], opt['default']));
    $("#Time").mobiscroll($.extend(opt['date'], opt['default']));

    var optDateTime = $.extend(opt['datetime'], opt['default']);
    var optTime = $.extend(opt['time'], opt['default']);
    $("#appDateTime").mobiscroll(optDateTime).datetime(optDateTime);
    //$("#Time").mobiscroll(optDateTime).datetime(optDateTime);
});
//出发日期返回日期结束
//附件上传
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

//弹框
function tatle(data) {
layer.open({
    content: data
                     , skin: 'msg'
                     , time: 1 //2秒后自动关闭
});
}

//将所有有关数据传给后台开始
$('#sub').on('click', function () {
    //判断是否输入必填项
    if ($('#jobNum').val() == '') {
     tatle('请输入工号')
        return
    } else if ($('#apply-iphone').val() == '') {
        tatle('请输入手机号码')
        return
    } else if ($('#apply-origin').val() == '') {
        tatle('请输入出差目的地')
        return
    } else if ($('#apply-why').val() == '') {
        tatle('请输入出差事由')
        return
    } else if ($('#entertime').html() == '') {
        tatle('请选择出差时间')
        return
    } else if ($('#appDateTime').val() == '') {
        tatle('请选择出发日期')
        return
    } else if ($('#CFCC').val() == '') {
        tatle('请选择返回日期')
        return
    }
    //预算项目名称
    var ProjectName = $('#plcItem').text();
    //是否继教
    //console.log(jijiao);
    //出差时间
    //出发日期
    var CFdate = $('#appDate').val();
    console.log(CFdate);
    //出发交通
    var CFtraffic = $('#traSelect option:selected').text();
    var CFCC = $('#CFCC').val();
    //返回日期
    var Fhdate = $('#Time').val();

    //返回交通
    var returnStyle = $('#returnStyle option:selected').text();
    //返回交通编号
    var obj = {};
    var name = $('#apply-name').val();
    var jobNum = $('#jobNum').val();
    var dept = $('#apply-dept').val();
    var phone = $('#apply-iphone').val();
    var job = $('#apply-job option:selected').text();
    var title = $('#apply-title').val();
    var origin = $('#apply-origin').val();
    var why = $('#apply-why').val();
    var base64childrens = document.getElementById("selected_files").children;
    //附件上传开始
    childrens = document.getElementById("file_photo").children;
    for (var i = 0; i < childrens.length; i++) {
        //后缀名
        var FileExt = childrens[i].files[0].name.split(".")[childrens[i].files[0].name.split(".").length - 1];
        var FileName = base64childrens[i].innerText + '.' + FileExt;
        //文件
        var FileContent = childrens[i].files[0];
        var formData = new FormData();
        //formData.append("BxId", BxId);
        formData.append("FileName", FileName);
        formData.append("FileContent", childrens[i].files[0]);
        //console.log(formData.get('FileName'));
        $.ajax({
            url: "http://120.27.217.7:7001/CCHandle.ashx?operKind=ReturnSaveImg",
            data: formData,
            processData: false,
            contentType: false,
            async: false,
            type: "post",
            dataType: "json",
            //cache: false,//上传文件无需缓存
            timeout: 900000,
            success: function (result) {
                //alert("成功");
                //imgLIst = result.data.fileName;
                if (result.success != "0") {
                    mui.toast("附件上传失败，请重新上传！");
                    return;
                } else {
                    var arr = JSON.parse(result.data).fileName;
                    $("#hidImgPathList").val(arr +","+ $("#hidImgPathList").val());
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
    //_imgList = listImg+
    //附件上传结束
    console.log($("#hidImgPathList").val());
    obj.ImgPathList = $("#hidImgPathList").val();
    obj.UserID = userID;
    obj.DepID = DepID;
    obj.deptManagerUseridList = deptManagerUseridList;
    obj.IsJJBCC = $("input[type='checkbox']").is(':checked') ? 0 : 1;
    obj.vName = name;
    obj.vCode = jobNum;
    obj.DepName = dept;
    obj.PhoneNumber = phone;
    obj.ZCName = job;
    obj.ZWName = title;
    obj.CCAddress = origin;
    obj.CCAddressID = localStorage.getItem('MdId');
    obj.CCReason = why;
    obj.CFDate = CFdate;
    obj.CFTraffic = CFtraffic;
    obj.FHDate = Fhdate;
    obj.FHTraffic = returnStyle;
    obj.projectDepID = localStorage.getItem('projectId');
    obj.ProjectName = InfoName;
    obj.ProjectType = localStorage.getItem('_projectName');
    obj.roleID = arrId.toString();
    obj.roleName = arrName.toString();
    console.log(JSON.stringify(obj));
    $.ajax({
        type: "post",
        dataType: 'json',
        data: { param: JSON.stringify(obj) },
        url: "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_SaveCCInfo",
        success: function (data) {
            if (data.success == 0) {
                layer.open({
                    content: '提交成功'
                    , skin: 'msg'
                    , time: 2 //2秒后自动关闭
                });
                localStorage.clear();
                setTimeout(function () {
              
                    window.location.reload();
               
                }, 500)
            } else {
                layer.open({
                    content: data.msg
                      , skin: 'msg'
                      , time: 2 //2秒后自动关闭
                });
                setTimeout(function () {
                    window.location.reload();

                }, 500)

            }
        }, error: function () {
            alert("不能访问数据");
        }
    });
    //预算弹框
})
//将所有有关数据传给后台结束
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

