const autoTransTypeText = ["", "自订", "免转钱包", "智充宝"];
const dwType = ["", "充值", "提款"];
const dStatus = ["申請中", "核准", "拒絕", "已入帳"];
const wStatus = ["申請中", "核准", "拒絕", "已出款"];
const acType = {
  1: "充值",
  2: "提款",
  3: "转移",
  4: "返水",
  5: "红利",
  15: "投注",
  20: "撤单"
};

const offersType = {
  4: "返水",
  5: "红利",
  6: "优惠",
  7: "退佣",
  25: "奖金",
  26: "日工资"
};

const traditional_chinese_datatables = {
  "emptyTable":  "查无资料",
  "processing":   "處理中...",
  "loadingRecords": "載入中...",
  "lengthMenu":   "顯示 _MENU_ 項結果",
  "zeroRecords":  "沒有符合的結果",
  "info":         "顯示第 _START_ 至 _END_ 項結果，共 _TOTAL_ 項",
  "infoEmpty":    "顯示第 0 至 0 項結果，共 0 項",
  "infoFiltered": "(從 _MAX_ 項結果中過濾)",
  "infoPostFix":  "",
  "search":       "搜尋:",
  "paginate": {
    "first":    "第一页",
    "previous": "上一页",
    "next":     "下一页",
    "last":     "最後一頁"
  },
  "aria": {
    "sortAscending":  ": 升冪排列",
    "sortDescending": ": 降冪排列"
  }
};

const datatables_options = {
  language : traditional_chinese_datatables,
  info: false,
  lengthChange: false,
  searching: false,
  ordering: true
}

const THEMES = ['blue-style'];
var CURRENT_THEME = '';

function setCookie(cn, cv, lifeInDays) {
  document.cookie = cn + "=" + encodeURIComponent(cv) +"; max-age=" + 60 * 60 * 24 * lifeInDays +"; path=/";
}

function getCookie(cn) {
  var cs = document.cookie ;
  if (cs.length != 0) {
    var ca = cs.split( '; ' );
    for (var i = 0 ; i < ca.length ; i++) {
      cv = ca[i].match(cn + '=(.*)');
      if (cv != null) {
        return decodeURIComponent(cv[1]) ;
      }
    }
  }
  return '';
}

function createStylesheetLink(href, className) {
  var link = document.createElement('link');
  link.className = className;
  link.type      = 'text/css';
  link.rel       = 'stylesheet';
  link.href      = href;

  var r = false;
  link.onload = link.onreadystatechange = function() {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true;
      var head = document.getElementsByTagName('head')[0];
      var links = document.getElementsByClassName(className);
      if (links.length > 1) {
        for (var i = 1; i < links.length; i++) {
          head.removeChild(links[i]);
        }
      }
    }
  };
  return link;
}

function setTheme(themeName) {
  var linksToLoad = [];
  if (themeName) {
    var linksContainer = document.createDocumentFragment();
    var themePath = document.getElementById("contextPath").value + '/resource/css/peopleagent/' + themeName  + '.css';
    linksToLoad.push([themePath, 'wonder-style']);
    
    for (var i = 0, l = linksToLoad.length; i < l; i++) {
      linksContainer.appendChild(createStylesheetLink(linksToLoad[i][0], linksToLoad[i][1]));
    }

    document.getElementsByTagName('head')[0].insertBefore(linksContainer, document.getElementsByClassName('wonder-core')[0].nextSibling);
  } else {
    var links = document.getElementsByClassName('wonder-style');
    for (var i = 0; i < links.length; i++) {
      document.getElementsByTagName('head')[0].removeChild(links[i]);
    }
  }
  
  setCookie('wonder-style', themeName);
}

function setStyleFromCookie() {
  var title = getCookie('wonder-style');
  if (title.length && title != 'undefined') setTheme(title);
}

function getDwStatus(type, index) {
  if (type == 1) return dStatus[index];
  if (type == 2) return wStatus[index];
  return "";
}

function clearCache() {
  var els = document.getElementsByTagName("*");
  for(var i = 0; i < els.length; i++) {
    var src = "";
    if (els[i].tagName == "A") continue;
    if (!src && els[i].src) src = els[i].getAttribute( "src");
    if (!src && els[i].href) src = els[i].getAttribute( "href");
    if (!src) continue;
    fetch(src, {cache: "reload"});
  }
  layer.msg('缓存记录已清除', null, document.location.reload(true));
}


function showTab(event, tabId) {
  var i, tabContent, tabLink;
  tabContent = document.getElementsByClassName("tab_content");
  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }
  tabLink = document.getElementsByClassName("tab_link");
  for (i = 0; i < tabLink.length; i++) {
    tabLink[i].className = tabLink[i].className.replace(" on", "");
  }
  document.getElementById(tabId).style.display = "block";
  event.currentTarget.parentElement.className += " on";
}

function getJsonData(url, data, successCallback, errorCallback, spinner) {
  return $.ajax({
    url : url,
    data: data,
    type : 'POST',
    beforeSend: function() {
      if (spinner) $('.lds-ring').show();
    },
    success: function(result) {
      successCallback(result);
    },
    error: function(result) {
      console.log(result)
      if (errorCallback != undefined) {
        errorCallback();
      }
    },
    complete: function() {
      if (spinner) $('.lds-ring').hide();
    }
  });
}

async function getJsonData2(url,data,successCallback, errorCallback, spinner){
  if (spinner) $('.lds-ring').show();
  try{
    const result = (await axios.post(url,data)).data
    successCallback(result)
    if (spinner) $('.lds-ring').hide();
    return result
  }catch(err){
    if (errorCallback != undefined) {
      if (spinner) $('.lds-ring').hide();
      errorCallback();
    }
    return err
  }
}

function refresh() {
  location.reload();
}

function goSignIn() {
  location.assign(document.getElementById("contextPath").value + "/mobile/signIn.html");
}
function goRegisterIn() {
  location.assign(document.getElementById("contextPath").value + "/mobile/registerIn.html");
}
function goSignUp() {
  location.assign(document.getElementById("contextPath").value + "/mobile/signUp.html");
}

function goLogout() {
  location.assign(document.getElementById("contextPath").value + "/logout.html");
}

function goHall() {
  location.assign(document.getElementById("contextPath").value + "/");
}

function goCenter() {
  location.assign(document.getElementById("contextPath").value + "/mobile/center.html");
}

function goRule() {
  location.assign(document.getElementById("contextPath").value + "/mobile/rule.html");
}

function goPromotion() {
  location.assign(document.getElementById("contextPath").value + "/mobile/promotion.html");
}

function goCustomerService() {
  location.assign(document.getElementById("contextPath").value + "/mobile/customer-service.html");
}

function goLotteryRecord() {
  location.assign(document.getElementById("contextPath").value + "/mobile/lottery-record.html");
}

function goOrderList() {
  location.assign(document.getElementById("contextPath").value + "/mobile/order_list.html");
}

function goPersonalCenter() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/center.html");
}

function goDeposit() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/deposit.html");
}

function goWithdraw() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/withdraw.html");
}

function goTransfer() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/transfer.html");
}

function goDwRecord() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/dwRecord.html");
}

function goAcRecord() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/acRecord.html");
}

function goTRecord() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/tRecord.html");
}

function goGameWater() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/gameWater.html");
}

function goChangeLoginPassword() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/changeLoginPassword.html");
}

function goChangeWithdrawPassword() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/changeWithdrawPassword.html");
}

function goBankCardManagement() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/bankCardManagement.html");
}

function goBindBankCard() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/bindBankCard.html");
}

function goViewRolling() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/viewRolling.html");
}

function goTbRecord() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/tbRecord.html");
}

function goSubordinateAccount() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/subordinateAccount.html");
}

function goAccountBonus() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/accountBonus.html");
}

function goTeamManagement() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/agentMember.html");
}

function goTeamReport() {
  location.assign(document.getElementById("contextPath").value + "/mobile/personal/teamReport.html");
}

function goLottery(gameType, lottery) {
  location.assign(document.getElementById("contextPath").value + "/mobile/" + gameType + "/" + lottery);
}

function goGameMenuChess() {
  location.assign(document.getElementById("contextPath").value + "/mobile/game-menu-chess.html");
}

function goGameMenuLottery() {
  location.assign(document.getElementById("contextPath").value + "/mobile/game-menu-lottery.html");
}

function refreshValidateCode() {
  var codeImage = document.getElementById("codeImage");
  codeImage.src = document.getElementById("contextPath").value + "/code?time=" + new Date().getTime();
}

function getErrorLabel(name, value) {
  return $("<label>").attr({id: name + '-error', 'class': 'err_msg', 'for': name}).html(value);
}

function showFieldError(error) {
  if (error) {
    if (Array.isArray(error)) {
      for (i = 0; i < error.length; i++) {
        $("#" + error[i].field).parent().append(getErrorLabel(error[i].field, error[i].message));
      }
    } else {
      $("#" + error.field).parent().append(getErrorLabel(error.field, error.message));
    }
  }
}

function getCurrency(number) {
  return number.toLocaleString("zh-Hans-CN");
}

function getDataByDay(day, callback) {
  $self = $(event.target);
  $('.date_list li').removeClass('chosen');
  $self.parents("li").addClass("chosen");

  switch (day) {
    case -1:
      $('input[name="startDate"]').val(moment().add(-1, 'd').format("YYYY-MM-DD"));
      $('input[name="endDate"]').val(moment().add(-1, 'd').format("YYYY-MM-DD"));
      break;
    case 1:
      $('input[name="startDate"]').val(moment().format("YYYY-MM-DD"));
      $('input[name="endDate"]').val(moment().format("YYYY-MM-DD"));
      break;
    case -7:
      if (new Date().getDay() == 0) {
        $('input[name="startDate"]').val(moment().add(-1, 'd').startOf('week').add(-1, 'w').add(1, 'd').format("YYYY-MM-DD"));
        $('input[name="endDate"]').val(moment().add(-1, 'd').endOf('week').add(-1, 'w').add(1, 'd').format("YYYY-MM-DD"));
      } else {
        $('input[name="startDate"]').val(moment().startOf('week').add(-1, 'w').add(1, 'd').format("YYYY-MM-DD"));
        $('input[name="endDate"]').val(moment().endOf('week').add(-1, 'w').add(1, 'd').format("YYYY-MM-DD"));
      }
      break;
    case 7:
      if (new Date().getDay() == 0) {
        $('input[name="startDate"]').val(moment().add(-1, 'd').startOf('week').add(1, 'd').format("YYYY-MM-DD"));
        $('input[name="endDate"]').val(moment().add(-1, 'd').endOf('week').add(1, 'd').format("YYYY-MM-DD"));
      } else {
        $('input[name="startDate"]').val(moment().startOf('week').add(1, 'd').format("YYYY-MM-DD"));
        $('input[name="endDate"]').val(moment().endOf('week').add(1, 'd').format("YYYY-MM-DD"));
      }
      break;
    case -30:
      $('input[name="startDate"]').val(moment().startOf('month').add(-1, 'M').format("YYYY-MM-DD"));
      $('input[name="endDate"]').val(moment().endOf('month').add(-1, 'M').format("YYYY-MM-DD"));
      break;
    case 30:
      $('input[name="startDate"]').val(moment().startOf('month').format("YYYY-MM-DD"));
      $('input[name="endDate"]').val(moment().endOf('month').format("YYYY-MM-DD"));
      break;
  }
  callback();
}


function initPagination(pagination) {
  if (pagination.length != 0) {
    pagination.twbsPagination({
      totalPages: 1,
      first: '第一页',
      prev: '上一页',
      next: '下一页',
      last: '最后一页',
      initiateStartPageClick : false
    });
  }
}

function updatePagination(pagination, totalPages, clickCallback, number) {
  if (totalPages == 0) {
    //initPagination(pagination);
    $('.pagination-info').css('display', 'none');
  } else {
    $('.pagination-info').css('display', '');
    if (pagination.length != 0) {
      currentPage = (number) ? number : pagination.twbsPagination('getCurrentPage');
      if (currentPage > totalPages) currentPage = 1;
      pagination.twbsPagination('destroy');
      pagination.twbsPagination($.extend({}, {
        first: '第一页',
        prev: '上一页',
        next: '下一页',
        last: '最后一页',
        startPage: currentPage,
        totalPages: totalPages,
        visiblePages: 3,
        onPageClick: function (event, page) {
          if (page != currentPage) {
            clickCallback();
          }
        }
      }));
    }
  }
}

function clearDataTable() {
  $('.dataTable tbody').empty();
  $('.dataTable tfoot').empty();
  if ($('#dataTable_paginate')) {
     $('#dataTable_paginate').empty();
  }
  
  if ($('#pagination').length) {
    $('.pagination-info').css('display', 'none');
  } else {
    var table = $('#dataTable').DataTable();
    table.clear();
    table.destroy();
    $('#dataTable').addClass('dataTable');
  }
}

function showDataTable(pages, pageCallback, optionsn, idx) {
  if ($('#pagination').length) {
    // update pagination
    updatePagination($('#pagination'), pages, (pageCallback) ? pageCallback : getData, idx);
  } else {
    $('.dataTable').DataTable((options) ? options : datatables_options);
    if (!pages) {
      $('.dataTable').css('border', 'none');
      $('.dataTable_paginate').hide();
    }
  }
  
  $('.dataTable').css('display', '');
}

function objectifyForm(formArray) {
  var returnArray = {};
  for (var i = 0; i < formArray.length; i++){
    returnArray[formArray[i]['name']] = formArray[i]['value'];
  }
  return returnArray;
}

function openSidebar(){
	$("#sidebar").addClass("active");
	$("#main-body").addClass("blur");
	$(".mainer").addClass("blur");
}

function closeSidebar(){
	$("#sidebar").removeClass("active");
	$("#main-body").removeClass("blur");
	$(".mainer").removeClass("blur");
}

function openElement(element) {
  $(element).addClass("active");
  $("#main-body").addClass("blur");
  $(".mainer").addClass("blur");
}

function closeElement(element) {
  $(element).removeClass("active");
  $("#main-body").removeClass("blur");
  $(".mainer").removeClass("blur");
}

function toggleSubmenu() {
	$self = $(event.target);
	
	if ($self.parents("li").hasClass("active")) {
		$self.parents("li").removeClass("active");
		$self.find("i.fa").removeClass("fa-caret-down");
		$self.find("i.fa").addClass("fa-caret-right");
	} else {
		$self.parents("li").addClass("active");
		$self.find("i.fa").addClass("fa-caret-down");
		$self.find("i.fa").removeClass("fa-caret-right");
	}
}

function toggleGameDetail(element) {
	var dataId = element.dataset.id;
	if(element.className.indexOf('active') > -1){
		element.classList.remove('active');
	} else {
	  if ($('.game-container').find($('.game-detail[data-parent=' + dataId + ']')).length == 0) return; 
		$('.box-chip').removeClass('active');
		element.className += " active";
	}
	
	if ($(".game-container.open .game-detail[data-parent='" + dataId + "']").hasClass("active")) {
		$(".game-container.open .game-detail[data-parent='" + dataId + "']").removeClass("active");
	} else {
		$(".game-container.open .game-detail").removeClass("active");
		$(".game-container.open .game-detail[data-parent='" + dataId + "']").addClass("active");
		
		//視窗移到點開的彩種
		var chipH = $('.box-chip.active').outerHeight();
		$(element).parents('.game-container').scrollTop(0);
		$(element).parents('.game-container').scrollTop($("div.box-chip.active").parents('div.col-6-fixed').position().top);
	}
//	$('.game-container').animate({scrollTop:$(".game-detail[data-parent='" + dataId + "']").offset().top - 360},500);
}
gameCode_gameName = {
    'xjssc' : '新疆时时彩',
    'tjssc' : '天津时时彩',
    'cqssc' : '重庆时时彩',
    'bjssc' : '北京时时彩',
    'qqffc' : 'QQ分分彩',
    'txffc' : '腾讯分分彩',
    'gxk3' : '广西快三',
    'ahk3' : '安徽快三',
    'jsk3' : '江苏快三',
    'hubk3' : '湖北快三',
    'jlk3' : '吉林快三',
    'bjk3' : '北京快三',
    'fjk3' : '福建快三',
    'jxk3' : '江西快三',
    'shk3' : '上海快三',
    'gd11x5' : '广东11选5',
    'sh11x5' : '上海11选5',
    'ah11x5' : '安徽11选5',
    'jx11x5' : '江西多乐彩',
    'sd11x5' : '山东11运夺金',
    'bjpk10' : '北京PK拾',
    'fc3d' : '福彩3D',
    'pl3' : '排列三',
    'shssl' : '上海时时乐',
    'hk6' : '香港⑥合彩',
    'bjkl8' : 'PC蛋蛋',
    'ffc' : '飞速分分彩',
    'qxc' : '海南七星彩',
    'mlaft': '幸运飞艇',
    'fsffk3': '飞速快三',
    'fsffpk10': '飞速赛车',
    'fs15fc': '飞速1.5分彩',
    'fs3fc': '飞速3分彩',
    'fs5fc': '飞速5分彩',
    'fs15fk3': '飞速1.5分快三',
    'fs3fk3': '飞速3分快三',
    'fs5fk3': '飞速5分快三',
    'fs15fpk10': '飞速1.5分赛车',
    'fs3fpk10': '飞速3分赛车',
    'fs5fpk10': '飞速5分赛车'
}

function orderContent(data) {
  var element = [];
  var flag = 0;
  
  if (data.pos0 != "") {
    flag = 1;
    element.push(data.pos0Prefix + '：' + data.pos0);
  }
  
  if (data.pos1 != "") {
	flag = 1;
    element.push(data.pos1Prefix + '：' + data.pos1);
  }
  
  if (data.pos2 != "") {
	flag = 1;
    element.push(data.pos2Prefix + '：' + data.pos2);
  }
  
  if (data.pos3 != "") {
	flag = 1;
    element.push(data.pos3Prefix + '：' + data.pos3);
  }
  
  if (data.pos4 != "") {
	flag = 1;
    element.push(data.pos4Prefix + '：' + data.pos4);
  }
  
  if (data.pos5 != "") {
	flag = 1;
    element.push(data.pos5Prefix + '：' + data.pos5);
  }
  
  if (data.pos6 != "") {
	flag = 1;
    element.push(data.pos6Prefix + '：' + data.pos6);
  }
  
  if (data.pos7 != "") {
	flag = 1;
    element.push(data.pos7Prefix + '：' + data.pos7);
  }
  
  if (data.pos8 != "") {
	flag = 1;
    element.push(data.pos8Prefix + '：' + data.pos8);
  }
  
  if (data.pos9 != "") {
	flag = 1;
    element.push(data.pos9Prefix + '：' + data.pos9);
  }

  return element;
}

function openLoader(){
	layer.load(2, {shade: 0.35});
}

function closeLoader(){
	layer.closeAll('loading');
}

function closeAll(){
	layer.closeAll();
}

function showResult(title, content, icon, yesCallBack, timeout) {
  layer.open({
    title: title,
    content: content,
    icon: icon,
    btnAlign: 'c',
    time: timeout == undefined ? 0 : timeout * 1000,
    yes: function(index, layero) {
      if (yesCallBack) {
        layer.close(index);
        yesCallBack(index);
      }
      else layer.close(index);
    },
    scrollbar: false
  });
}

function showWaringResult(content, yesCallBack, timeout) {
  showResult('警告', content, 0, yesCallBack, timeout);
}

function showErrorResult(content, yesCallBack, timeout) {
  showResult('错误', content, 2, yesCallBack, timeout);
}

function showSuccessResult(content, yesCallBack, timeout) {
  showResult('成功', content, 1, yesCallBack, timeout);
}

function handleMessage(message) {
  switch(message.model) {
    case 'member':
      if (message.verb == 'session_timeout') showWaringResult('帐号操作逾时，請重新登錄', goLogout);
      break;
    case 'sitemenu':
      if (typeof lotteryMenu === "function") lotteryMenu();
      break;
    case 'sitemsg':
      if (typeof marquee === "function") marquee();
      break;
    case 'points':
      if (typeof refreshPoint === "function") refreshPoint();
      break;
    case 'membermsg':
      if (typeof messageEvent === "function") messageEvent();
      break;
    case 'memberstatus':
      if (message.data == 'session_timeout') showWaringResult('帐号操作逾时，請重新登錄', goLogout);
      switch(message.data) {
        case -1:
          goLogout();
          break;
        case 2:
        case 6:
          showWaringResult('帐号已停用，请洽询客服人员', goLogout);
          break;
        case 3:
          showWaringResult('帐号已停权，请洽询客服人员', goLogout);
          break;
        case 4:
          showWaringResult('帐号已锁定，请洽询客服人员', goLogout);
          break;
      }
      if (typeof messageEvent === "function") messageEvent();
      break;
    case 'siteinfo':
      if (typeof refresh === "function") refresh();
      break;
    case 'spinfo':
      if (typeof getPlatform === "function") getPlatform();
      break;
    case 'epgamedef':
      if (typeof refreshGameList === "function") refreshGameList();
      break;
    case 'ltgame':
      if (typeof refreshGameResult === 'function') refreshGameResult(message.data);
      break;
    case 'ltsgame':
      if (typeof refreshGameResult === 'function') refreshGameResult(message.data);
  }
}

const ws = io(document.currentScript.getAttribute('data-url'), { transports: ['websocket'] });
function initialWS() {
  if (ws) {
    ws.on('connect', () => {
    });
    
    ws.on('message', (data) => {
      handleMessage(data);
    });
    
    ws.on('disconnect', () => {
      console.log('socket disconnected...');
      ws.open();
    });
  }
}

function joinWS(sid, mid, token) {
  if (mid && token) {
    ws.emit('join', { 'siteID': sid, 'memberID': mid, 'token': token }); 
  } else {
    ws.emit('join', { 'siteID': sid });
  }
}

function leaveWS(sid, mid) {
  ws.emit('leave', { 'siteID': sid, 'memberID': mid });
}

var rangeSlider = function() {
  var slider = $('.range-slider'),
      range = $('.range-slider-range'),
      value = $('.range-slider-value');
    
  value.each(function() {
    var value = $(this).next().find(range).attr('value');
    $(this).html(value);
  });
  
  slider.each(function() {
    range.on('input', function() {
      $(this).parent().prev(value).html(this.value);
    });
  });
};

