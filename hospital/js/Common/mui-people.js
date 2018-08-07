/**
 * IndexedList
 * 类似联系人应用中的联系人列表，可以按首字母分组
 * 右侧的字母定位工具条，可以快速定位列表位置
 * varstion 1.0.0
 * by Houfeng
 * Houfeng@DCloud.io
 **/
function GetQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) return unescape(r[2]); return null;
}

//(function ($, window, document) { 
//    var $$ = jQuery.noConflict();

//    var classSelector = function (name) {
//        return '.' + $.className(name);
//    }

    //if (GetQueryString("depid")) {
    //    var url = "http://120.27.217.7:7001/CCApplyWBS.asmx/WBS_GetDDDepUserList?depid=" + GetQueryString("depid");

    //}
//else {
      var input = document.getElementById('input');
        var url = "http://120.27.217.7:7001/CLFApply/WBS/CLFApply/CLFApplyWBS.asmx/WBS_GetSTPsnList";
    //}
        list = document.getElementById('content').getElementsByTagName('li');
    //var IndexedList = $.IndexedList = $.Class.extend({
    //    /**
    //     * 通过 element 和 options 构造 IndexedList 实例
    //     **/
    //    init: function (holder, options) {
            //var self = this;
            $.ajax({
                async: false,
                type: "get",
                dataType: 'json',
                url: url, 
                success: function (data) { 
                    console.log(data)
                    if (data.success == "0") {
                        //console.log(data)
                        console.log(data.data)
                        //console.log(data.data.length)
                        var travels = JSON.parse(data.data);
                        var html = "";
                       // html += '<li  data-group="' + "A" + '" class="mui-table-view-divider mui-indexed-list-group">' + "A" + '</li>';
                        for (var i = 0; i < travels.length; i++) {
                            html += '<li data-all=\'' + JSON.stringify(travels[i]) + '\' class="mui-table-view-cell mui-indexed-list-item" onclick="selectPeople(this)">' + travels[i].vCode + "&nbsp;&nbsp;&nbsp;&nbsp;" + travels[i].vName + '</li>';
                        }
                        document.querySelector(".mui-table-view").innerHTML = html;
                        //self.init1(holder, options);

                    } else {
                        alert(data.msg);
                    }
                },
                error: function (e) {
                    console.log(e)
                }
            });
            input.onkeyup = function () {
                this.onchange();
            };
            //内容改变事件
            input.onchange = function () {
                var keyword = this.value;
                for (var i = 0, len = list.length; i < len; i++) {
                    if (list[i].innerHTML.indexOf(keyword) < 0) {
                        list[i].style.display = 'none';
                    } else {
                        list[i].style.display = 'block';
                    }
                }
            }
        //},
//        init1: function (holder, options) {
//            var self = this;
//            self.options = options || {};
//            self.box = holder;
//            if (!self.box) {
//                throw "实例 IndexedList 时需要指定 element";
//            }
//            self.createDom();
//            self.findElements();
//            self.caleLayout();
//            self.bindEvent();
//        },
//        createDom: function () {
//            var self = this;
//            self.el = self.el || {};
//            //styleForSearch 用于搜索，此方式能在数据较多时获取很好的性能
//            self.el.styleForSearch = document.createElement('style');
//            (document.head || document.body).appendChild(self.el.styleForSearch);
//        },
//        findElements: function () {
//            var self = this;
//            self.el = self.el || {};
//            self.el.search = self.box.querySelector(classSelector('indexed-list-search'));
//            self.el.searchInput = self.box.querySelector(classSelector('indexed-list-search-input'));
//            self.el.searchClear = self.box.querySelector(classSelector('indexed-list-search') + ' ' + classSelector('icon-clear'));
//            self.el.bar = self.box.querySelector(classSelector('indexed-list-bar'));
//            self.el.barItems = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-bar') + ' a'));
//            self.el.inner = self.box.querySelector(classSelector('indexed-list-inner'));
//            self.el.items = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-item')));
//            self.el.liArray = [].slice.call(self.box.querySelectorAll(classSelector('indexed-list-inner') + ' li'));
//            self.el.alert = self.box.querySelector(classSelector('indexed-list-alert'));
//        },
//        caleLayout: function () {
//            var self = this;
//            var withoutSearchHeight = (self.box.offsetHeight - self.el.search.offsetHeight) + 'px';
//            self.el.bar.style.height = withoutSearchHeight;
//            self.el.inner.style.height = withoutSearchHeight;
//            var barItemHeight = ((self.el.bar.offsetHeight - 40) / self.el.barItems.length) + 'px';
//            self.el.barItems.forEach(function (item) {
//                item.style.height = barItemHeight;
//                item.style.lineHeight = barItemHeight;
//            });
//        },
//        scrollTo: function (group) {
//            var self = this;
//            var groupElement = self.el.inner.querySelector('[data-group="' + group + '"]');
//            if (!groupElement || (self.hiddenGroups && self.hiddenGroups.indexOf(groupElement) > -1)) {
//                return;
//            }
//            self.el.inner.scrollTop = groupElement.offsetTop;
//        },
//        bindBarEvent: function () {
//            var self = this;
//            var pointElement = null;
//            var findStart = function (event) {
//                if (pointElement) {
//                    pointElement.classList.remove('active');
//                    pointElement = null;
//                }
//                self.el.bar.classList.add('active');
//                var point = event.changedTouches ? event.changedTouches[0] : event;
//                pointElement = document.elementFromPoint(point.pageX, point.pageY);
//                if (pointElement) {
//                    var group = pointElement.innerText;
//                    if (group && group.length == 1) {
//                        pointElement.classList.add('active');
//                        self.el.alert.innerText = group;
//                        self.el.alert.classList.add('active');
//                        self.scrollTo(group);
//                    }
//                }
//                event.preventDefault();
//            };
//            var findEnd = function (event) {
//                self.el.alert.classList.remove('active');
//                self.el.bar.classList.remove('active');
//                if (pointElement) {
//                    pointElement.classList.remove('active');
//                    pointElement = null;
//                }
//            };
//            self.el.bar.addEventListener($.EVENT_MOVE, function (event) {
//                findStart(event);
//            }, false);
//            self.el.bar.addEventListener($.EVENT_START, function (event) {
//                findStart(event);
//            }, false);
//            document.body.addEventListener($.EVENT_END, function (event) {
//                findEnd(event);
//            }, false);
//            document.body.addEventListener($.EVENT_CANCEL, function (event) {
//                findEnd(event);
//            }, false);
//        },
//        search: function (keyword) {
//            var self = this;
//            keyword = (keyword || '').toLowerCase();
//            var selectorBuffer = [];
//            var groupIndex = -1;
//            var itemCount = 0;
//            var liArray = self.el.liArray;
//            var itemTotal = liArray.length;
//            self.hiddenGroups = [];
//            var checkGroup = function (currentIndex, last) {
//                if (itemCount >= currentIndex - groupIndex - (last ? 0 : 1)) {
//                    selectorBuffer.push(classSelector('indexed-list-inner li') + ':nth-child(' + (groupIndex + 1) + ')');
//                    self.hiddenGroups.push(liArray[groupIndex]);
//                };
//                groupIndex = currentIndex;
//                itemCount = 0;
//            }
//            liArray.forEach(function (item) {
//                var currentIndex = liArray.indexOf(item);
//                if (item.classList.contains($.className('indexed-list-group'))) {
//                    checkGroup(currentIndex, false);
//                } else {
//                    var text = (item.innerText || '').toLowerCase();
//                    var value = (item.getAttribute('data-value') || '').toLowerCase();
//                    var tags = (item.getAttribute('data-tags') || '').toLowerCase();
//                    if (keyword && text.indexOf(keyword) < 0 &&
//                        value.indexOf(keyword) < 0 &&
//                        tags.indexOf(keyword) < 0) {
//                        selectorBuffer.push(classSelector('indexed-list-inner li') + ':nth-child(' + (currentIndex + 1) + ')');
//                        itemCount++;
//                    }
//                    if (currentIndex >= itemTotal - 1) {
//                        checkGroup(currentIndex, true);
//                    }
//                }
//            });
//            if (selectorBuffer.length >= itemTotal) {
//                self.el.inner.classList.add('empty');
//            } else if (selectorBuffer.length > 0) {
//                self.el.inner.classList.remove('empty');
//                self.el.styleForSearch.innerText = selectorBuffer.join(', ') + "{display:none;}";
//            } else {
//                self.el.inner.classList.remove('empty');
//                self.el.styleForSearch.innerText = "";
//            }
//        },
//        bindSearchEvent: function () {
//            var self = this;
//            self.el.searchInput.addEventListener('input', function () {
//                var keyword = this.value;
//                self.search(keyword);
//            }, false);
//            $(self.el.search).on('tap', classSelector('icon-clear'), function () {
//                self.search('');
//            }, false);
//        },
//        bindEvent: function () {
//            var self = this;
//            self.bindBarEvent();
//            self.bindSearchEvent();
//        }
//    });

//    //mui(selector).indexedList 方式
//    $.fn.indexedList = function (options) {
//        //遍历选择的元素
//        this.each(function (i, element) {
//            if (element.indexedList) return;
//            element.indexedList = new IndexedList(element, options);
//        });
//        return this[0] ? this[0].indexedList : null;
//    };

//})(mui, window, document);