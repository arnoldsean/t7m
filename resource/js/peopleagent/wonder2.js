function getJsonData(url, data, successCallback, errorCallback) {
  return $.ajax({
    url : url,
    data: data,
    type : 'POST',
    success: function(result) {
      successCallback(result);
    },
    error: function(result) {
      if (errorCallback != undefined) {
        errorCallback();
      } 
    }
  });
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

function bettingCallBack(response) {
    closeLoader();
	if(response.result == true) {
		getJsonData(document.getElementById("contextPath").value + '/Member/GetBalance', null, changeBalance);
		var title = $('.title-text').text();
	    var modalIssueNo = $('#issueNo').text();
	    var content = response.message;
		countdownModal(5000, successModal, title, modalIssueNo, content);
		$('.focus').removeClass('focus');
		$('.option_slide span').removeClass('option_focus');
		$('.bet_box .bet_count').text(0);
		
	} else if(response.data == 'UNAUTHORIZED') {
		var title = $('.title-text').text();
	    var modalIssueNo = $('#issueNo').text();
	    var content = response.message + ',请重新登录';
		countdownModal(5000, failModal, title, modalIssueNo, content, goLogin);
		var protocol = window.location.protocol + '//';
		var host = window.location.host;
		var path = '/' + window.location.pathname.split('/')[1] + '/mobile/signIn';
		setTimeout(function(){
			window.location.href = protocol + host + path;
		},5000)
		
	} else {
		var title = $('.title-text').text();
	    var modalIssueNo = $('#issueNo').text();
	    var content = response.message;
		countdownModal(5000, failModal, title, modalIssueNo, content);
		$('#modal_text_fail').text(response.message);
	}
}

function getPreviousGameResult() {
    getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode': gameCode}, getPreviousGameResultCallBack);
    
    timerPreResult = setInterval(function() {
        getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode': gameCode}, getPreviousGameResultCallBack);
    }, 10000);
}

function getPreviousGameResultCallBack(response) {
	var url = window.location.href;
	
	if(response.data[0].issueNo == previousIssueNo) {
		$('.previous_result').empty();
		var gameRsl = response.data[0].gameRsl.split(",");
		$('<div />', {'class':'draw'}).appendTo('.previous_result');
		$('<span />').text(response.data[0].issueNo + "期").appendTo($('#previous .draw'));
		var div = $('<div />', {'class':'sc-hSdWYo jvuHdM'});
		if(url.indexOf('bjpk10') > -1 || url.indexOf('mlaft') > -1 || url.indexOf('fsffpk10') > -1){
			for(var i = 0; i < gameRsl.length; i++){
				if(gameRsl[i].split('').length < 2) gameRsl[i] = '0' + gameRsl[i];
				if(gameRsl[i] == 1){
					div.append($('<div />',{'class':'number_item number_one'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 2){
					div.append($('<div />',{'class':'number_item number_two'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 3){
					div.append($('<div />',{'class':'number_item number_three'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 4){
					div.append($('<div />',{'class':'number_item number_four'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 5){
					div.append($('<div />',{'class':'number_item number_five'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 6){
					div.append($('<div />',{'class':'number_item number_six'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 7){
					div.append($('<div />',{'class':'number_item number_seven'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 8){
					div.append($('<div />',{'class':'number_item number_eight'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 9){
					div.append($('<div />',{'class':'number_item number_nine'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 10){
					div.append($('<div />',{'class':'number_item number_ten'}).text(gameRsl[i]));
				}
			}
		} else if(url.indexOf('k3') > -1){
			for(var i = 0; i < gameRsl.length; i++){
				if(gameRsl[i] == 1){
					div.append($('<div />',{'class':'sc-kEYyzF dice_one'}))
				} else if(gameRsl[i] == 2){
					div.append($('<div />',{'class':'sc-kEYyzF dice_two'}))
				} else if(gameRsl[i] == 3){
					div.append($('<div />',{'class':'sc-kEYyzF dice_three'}))
				} else if(gameRsl[i] == 4){
					div.append($('<div />',{'class':'sc-kEYyzF dice_four'}))
				} else if(gameRsl[i] == 5){
					div.append($('<div />',{'class':'sc-kEYyzF dice_five'}))
				} else if(gameRsl[i] == 6){
					div.append($('<div />',{'class':'sc-kEYyzF dice_six'}))
				}
			}
		} else if(url.indexOf('bjkl8') > -1){
			for(var i = 0; i < gameRsl.length; i++){
				if(i < 2){
					div.append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
						.append($('<strong />').text('+'));
				} else if(i == 2){
					div.append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
					.append($('<strong />').text('='));
				} else if(i == 3){
					if(gameRsl[i] > 0 && gameRsl[i] < 13 || (gameRsl[i] > 14 && gameRsl[i] < 27)){
						if(gameRsl[i] % 3 == 1){
							div.append($('<div />',{'class':'normal_item normal_item_green'}).text(gameRsl[i]));
						} else if(gameRsl[i] % 3 == 2){
							div.append($('<div />',{'class':'normal_item normal_item_blue'}).text(gameRsl[i]));
						} else if(gameRsl[i] % 3 == 0){
							div.append($('<div />',{'class':'normal_item normal_item_red'}).text(gameRsl[i]));
						} 	
					} else {
						div.append($('<div />',{'class':'normal_item normal_item_gray'}).text(gameRsl[i]));
					}
				}
			}
		} else if(url.indexOf('hk6') > -1){
			var divZodaic = $('<div />',{'class':'sc-hSdWYo jvuHdM add'});
			var gameZodiac = response.data[0].gameZodiac.split(",");
			for(var i = 0; i < gameRsl.length; i++){
				if(colorRed.indexOf(gameRsl[i]) > -1) {
					div.append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(colorBlue.indexOf(gameRsl[i]) > -1) {
					div.append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(colorGreen.indexOf(gameRsl[i]) > -1) {
					div.append($('<div />',{'class':'small_normal_item small_normal_item_green'}).text(gameRsl[i]));
				}
				
				if(i == gameRsl.length - 2){
					div.append($('<strong />').text('+'));
				}
			}
			for(var i = 0; i < gameZodiac.length; i++){
					divZodaic.append($('<div />',{'class':'small_normal_item'}).text(gameZodiac[i]));
					if(i == gameRsl.length - 2){
						divZodaic.append($('<strong />').text('+'));
					}
			}
		} else if(url.indexOf('ssc') > -1 || url.indexOf('ffc') > -1 || url.indexOf('11x5') > -1 || url.indexOf('ssl') > -1
					|| url.indexOf('fc3d') > -1 || url.indexOf('pl3') > -1 || url.indexOf('qxc') > -1){
			if(url.indexOf('qxc') > -1){
				for(var i = 0; i < gameRsl.length - 3; i++){
					div.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			} else {
				for(var i = 0; i < gameRsl.length; i++){
					div.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			}
		}
		
		
		if(url.indexOf('hk6') > -1){
			$('#hk6_previous_wrap').remove();
			$('<span />',{'class':'hk6_previous_wrap','id':'hk6_previous_wrap'}).append(div).append(divZodaic).appendTo($('.previous_result'));
		} else {
			div.appendTo($('.previous_result'));
		}
		
        clearInterval(timerPreResult);
		
	} else {
		$('.previous_result').empty();
		$('<div />', {'class':'draw'}).appendTo('.previous_result');
		$('<span />').text(previousIssueNo + "期").appendTo($('#previous .draw'));
		var div = $('<div />', {'class':'sc-hSdWYo jvuHdM'});
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('正'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('在'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('开'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('奖'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('中'));
		div.appendTo($('.previous_result'));
	}
	
}

function getRecordForLowFreq(url, gameCode) {
	getJsonData(url + "/GetGameResult", {'gameCode': gameCode}, getRecordForLowFreqCallBack);
}

function getGameResult(url, gameCode) {
	getJsonData(url + "/GetGameResult", {'gameCode': gameCode}, gameResultCallBack);
}

function getLotteryAnnouncement(url, gameCode, dataShift){
	getJsonData(url + "/LotteryAnnouncement", {'gameCode': gameCode, 'dataShift': dataShift}, getLotteryAnnouncementCallBack);
}

function getPointCallBack(response) {
	$('.balance .content').first().html(response);
}

function getTrendList(url, gameCode, dataShift) {
  getJsonData(url + "/TrendList", {'gameCode': gameCode, 'dataShift': dataShift}, getTrendListCallBack);
}

function getLotteryAnnouncementCallBack(response){
	closeLoader();
	$('.record_body').empty();
	response.data = response.data.reverse();
	$.each(response.data, function(entryIdx, entry) {
		if(recordGameCode.indexOf('pk10') > -1  || recordGameCode.indexOf('mlaft') > -1){
			var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			var gameRslTotal = 0;
			for(var i = 0; i < gameRsl.length; i++){
				if(gameRsl[i] == 1){
					dice_parent.append($('<div />',{'class':'number_item number_one'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 2){
					dice_parent.append($('<div />',{'class':'number_item number_two'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 3){
					dice_parent.append($('<div />',{'class':'number_item number_three'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 4){
					dice_parent.append($('<div />',{'class':'number_item number_four'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 5){
					dice_parent.append($('<div />',{'class':'number_item number_five'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 6){
					dice_parent.append($('<div />',{'class':'number_item number_six'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 7){
					dice_parent.append($('<div />',{'class':'number_item number_seven'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 8){
					dice_parent.append($('<div />',{'class':'number_item number_eight'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 9){
					dice_parent.append($('<div />',{'class':'number_item number_nine'}).text(gameRsl[i]));
				} else if(gameRsl[i] == 10){
					dice_parent.append($('<div />',{'class':'number_item number_ten'}).text(gameRsl[i]));
				}
			}
			dice_parent.appendTo($('.record_body_point:eq(' + entryIdx + ')'));
	    	
	    } else if(recordGameCode.indexOf('k3') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			var gameRslTotal = 0;
			for(var i = 0; i < gameRsl.length; i++){
				if(gameRsl[i] == 1){
					dice_parent.append($('<div />',{'class':'dice_item dice_one'}))
				} else if(gameRsl[i] == 2){
					dice_parent.append($('<div />',{'class':'dice_item dice_two'}))
				} else if(gameRsl[i] == 3){
					dice_parent.append($('<div />',{'class':'dice_item dice_three'}))
				} else if(gameRsl[i] == 4){
					dice_parent.append($('<div />',{'class':'dice_item dice_four'}))
				} else if(gameRsl[i] == 5){
					dice_parent.append($('<div />',{'class':'dice_item dice_five'}))
				} else if(gameRsl[i] == 6){
					dice_parent.append($('<div />',{'class':'dice_item dice_six'}))
				}
				gameRslTotal += parseInt(gameRsl[i]);
			}
			dice_parent.appendTo($('.record_body_point:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point_text'}).text(gameRslTotal).appendTo($('.record_body_point:eq(' + entryIdx + ')'));
	    } else if(recordGameCode.indexOf('bjkl8') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			for(var i = 0; i < gameRsl.length; i++){
				if(i < 2){
					dice_parent.append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
						.append($('<strong />').text('+'));
				} else if(i == 2){
					dice_parent.append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
					.append($('<strong />').text('='));
				} else if(i == 3){
					if(gameRsl[i] > 0 && gameRsl[i] < 13 || (gameRsl[i] > 14 && gameRsl[i] < 27)){
						if(gameRsl[i] % 3 == 1){
							dice_parent.append($('<div />',{'class':'normal_item normal_item_green'}).text(gameRsl[i]));
						} else if(gameRsl[i] % 3 == 2){
							dice_parent.append($('<div />',{'class':'normal_item normal_item_blue'}).text(gameRsl[i]));
						} else if(gameRsl[i] % 3 == 0){
							dice_parent.append($('<div />',{'class':'normal_item normal_item_red'}).text(gameRsl[i]));
						} 						
					} else {
						dice_parent.append($('<div />',{'class':'normal_item normal_item_gray'}).text(gameRsl[i]));
					}
				}
			}
			dice_parent.appendTo($('.record_body_point:eq(' + entryIdx + ')'));
	    } else if(recordGameCode.indexOf('hk6') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item hk6_fix'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time hk6_fix'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			var divZodaic = $('<div />',{'class':'dice_group add'});
			for(var i = 0; i < gameRsl.length; i++){
				var tmp = gameRsl[i] % 12;
				if(colorRed.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(colorBlue.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(colorGreen.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_green'}).text(gameRsl[i]));
				}
				
				if(i == gameRsl.length - 2){
					dice_parent.append($('<strong />').text('+'));
				}
				
				divZodaic.append($('<div />',{'class':'small_normal_item'}).text(zodiac[tmp]));
				if(i == gameRsl.length - 2){
					divZodaic.append($('<strong />').text('+'));
				}
				
			}
			$('<span />',{'class':'hk6_previous_wrap','id':'hk6_previous_wrap'}).append(dice_parent).appendTo($('.record_body_point:eq(' + entryIdx + ')'));
			divZodaic.appendTo($('.hk6_previous_wrap:eq('+ entryIdx +')'));
	    } else if(recordGameCode.indexOf('ssc') > -1 || recordGameCode.indexOf('ffc') > -1 || recordGameCode.indexOf('fc') > -1 || recordGameCode.indexOf('11x5') > -1 || recordGameCode.indexOf('ssl') > -1
	    			|| recordGameCode.indexOf('fc3d') > -1 || recordGameCode.indexOf('pl3') > -1 || recordGameCode.indexOf('qxc') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			if(recordGameCode.indexOf('qxc') > -1){
				for(var i = 0; i < gameRsl.length - 3; i++){
					dice_parent.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			} else {
				for(var i = 0; i < gameRsl.length; i++){
					dice_parent.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			}
			dice_parent.appendTo($('.record_body_point:eq(' + entryIdx + ')'));
	    }		
		
	});
}

function callRecordTypeSwiper(){
  mySwiper = new Swiper('.type-container',{
    //loop 設為true 會導致複製的DOM沒有 bind event ,尚未解決
    loop: false,
    wrapperClass: 'type-wrapper',
    initialSlide: 0,
    spaceBetween: 20,
    slidesPerView: 4,
    centeredSlides: true,
    grabCursor: true,
    paginationClickable: true,
    observer:true,//修改swiper自己或子元素时，自动初始化swiper
    observeParents:true,//修改swiper的父元素时，自动初始化swiper
    uniqueNavElements: false,
    slideToClickedSlide: true,
    on: {
      slideChange: function(){
        
	  },
	  slideChangeTransitionStart: function(){
	    
	  },
	  slideChangeTransitionEnd: function() {
	    openLoader();
	    var pos = $('.swiper-slide.swiper-slide-active').data('pos_value');
	    changeSelect(pos);
	    changeHeader(pos);
	    changeTrendList(pos);
	  }
    }
  })
}

function getRecordForLowFreqCallBack(response){
	closeLoader();
	$('.record_body').empty();
	$.each(response.data, function(entryIdx, entry){
		if(recordGameCode.indexOf('hk6') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			var gameZodiac = entry['gameZodiac'].split(',');
			$('<div/>',{'class':'record_body_item hk6_fix'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time hk6_fix'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			var divZodaic = $('<div />',{'class':'dice_group add'});
			for(var i = 0; i < gameRsl.length; i++){
				var tmp = gameRsl[i] % 12;
				if(colorRed.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(colorBlue.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(colorGreen.indexOf(gameRsl[i]) > -1) {
					dice_parent.append($('<div />',{'class':'small_normal_item small_normal_item_green'}).text(gameRsl[i]));
				}
				
				if(i == gameRsl.length - 2){
					dice_parent.append($('<strong />').text('+'));
				}
				
				divZodaic.append($('<div />',{'class':'small_normal_item'}).text(gameZodiac[i]));
				if(i == gameRsl.length - 2){
					divZodaic.append($('<strong />').text('+'));
				}
				
			}
			$('<span />',{'class':'hk6_previous_wrap','id':'hk6_previous_wrap'}).append(dice_parent).appendTo($('.record_body_point:eq(' + entryIdx + ')'));
			divZodaic.appendTo($('.hk6_previous_wrap:eq('+ entryIdx +')'));
	    } else if(recordGameCode.indexOf('ssl') > -1 || recordGameCode.indexOf('fc3d') > -1 || recordGameCode.indexOf('pl3') > -1 || recordGameCode.indexOf('qxc') > -1){
	    	var openTime = entry['openTime'].split(/[- :T]/);
			var gameRsl =  entry['gameRsl'].split(",");
			$('<div/>',{'class':'record_body_item'}).appendTo($('.record_body'));
			$('<div/>',{'class':'record_body_time'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>',{'class':'record_body_point'}).appendTo($('.record_body_item:eq(' + entryIdx + ')'));
			$('<div/>').text(entry['issueNo']).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			$('<div/>').text(openTime[3] + ":" + openTime[4]).appendTo($('.record_body_time:eq(' + entryIdx + ')'));
			var dice_parent = $('<div />',{'class':'dice_group'});
			if(recordGameCode.indexOf('qxc') > -1){
				for(var i = 0; i < gameRsl.length - 3; i++){
					dice_parent.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			} else {
				for(var i = 0; i < gameRsl.length; i++){
					dice_parent.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			}
			dice_parent.appendTo($('.record_body_point:eq(' + entryIdx + ')'));
	    }		
	})
}

function gameResultCallBack(response) {
    $('.result_box').empty();
	$.each(response.data, function(entryIdx, entry) {
		if(entryIdx > 4) return false;

		var url = window.location.href;
		var gameRsl =  entry['gameRsl'].split(",");
		var resultItem = $('<div />', {'class':'result_item'})
							.append($('<div />', {'class':'result_issue'})
									.append($('<font />').html(entry.issueNo)))
							.append($('<div />', {'class':'result_number'})
									.append($('<div />', {'class':'num_group'})));
		var gameRslTotal = 0;
		var nowNumber = 0;
		var nowNumberClass = "";
		if(url.indexOf('bjpk10') > -1  || url.indexOf('mlaft') > -1 || url.indexOf('fsffpk10') > -1){
			for(var i = 0; i < gameRsl.length; i++){
				if(gameRsl[i].split('').length < 2) gameRsl[i] = '0' + gameRsl[i];
				nowNumber = gameRsl[i];
				switch(nowNumber){
				case "01":
					nowNumberClass = "number_one";
					break;
				case "02":
					nowNumberClass = "number_two";
					break;
					
				case "03":
					nowNumberClass = "number_three";
					break;
					
				case　"04":
					nowNumberClass = "number_four";
					break;
					
				case　"05":
					nowNumberClass = "number_five";
					break;
					
				case "06":
					nowNumberClass = "number_six";
				    break;
				    
				case "07":
					nowNumberClass = "number_seven";
					break;
					
				case "08":
					nowNumberClass = "number_eight";
					break;
					
				case "09":
					nowNumberClass = "number_nine";
					break;
				
				case "10":
					nowNumberClass = "number_ten";
					break;	
				default:	
				}
				
				resultItem.find('.num_group').append($('<div />',{'class':'number_item ' + nowNumberClass}).text(gameRsl[i]));
				
			}
			resultItem.appendTo($('.result_box'));
	    	
	    } else if(url.indexOf('k3') > -1){
			var gameRslTotal = 0;
			for(var i = 0; i < gameRsl.length; i++){
				nowNumber = gameRsl[i];
				switch(nowNumber){
				case "1":
					nowNumberClass = "dice_one";
					break;
					
				case "2":
					nowNumberClass = "dice_two";
					break;
					
				case "3":
					nowNumberClass = "dice_three";
					break;
					
				case "4":
					nowNumberClass = "dice_four";
					break
					
				case "5":
					nowNumberClass = "dice_five";
					break;
					
				case "6":
					nowNumberClass = "dice_six";
					break;
				}
				resultItem.find('.num_group').append($('<div />',{'class':'dice_item ' + nowNumberClass}));
				gameRslTotal += parseInt(gameRsl[i]);
			}
			resultItem.find('.num_group').append($('<div />',{'class':'dice_item dice_total'}).html(gameRslTotal));
			resultItem.appendTo($('.result_box'));
	    } else if(url.indexOf('bjkl8') > -1){
			for(var i = 0; i < gameRsl.length; i++){
				if(i < 2){
					resultItem.find('.num_group').append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
													 .append($('<strong />').text('+'));
				} else if(i == 2){
					resultItem.find('.num_group').append($('<div />',{'class':'normal_item'}).text(gameRsl[i]))
					 								 .append($('<strong />').text('='));
				} else if(i == 3){
					if(gameRsl[i] > 0 && gameRsl[i] < 13 || (gameRsl[i] > 14 && gameRsl[i] < 27)){
						if(gameRsl[i] % 3 == 1){
							nowNumberClass = 'normal_item_green';
						} else if(gameRsl[i] % 3 == 2){
							nowNumberClass = 'normal_item_blue';
						} else if(gameRsl[i] % 3 == 0){
							nowNumberClass = 'normal_item_red';
						} 						
					} else {
						nowNumberClass = 'normal_item_gray';
					}
					resultItem.find('.num_group').append($('<div />',{'class':'normal_item ' + nowNumberClass}).text(gameRsl[i]));
					resultItem.appendTo($('.result_box'));
				}
			}
	    } else if(url.indexOf('hk6') > -1){
	    	//串上第二列动物的group
	    	resultItem.find('.result_number').append($('<div />', {'class':'zod_group'}));
	    	
			for(var i = 0; i < gameRsl.length; i++){
				if(colorRed.indexOf(gameRsl[i]) > -1) {
					resultItem.find('.num_group').append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(colorBlue.indexOf(gameRsl[i]) > -1) {
					resultItem.find('.num_group').append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(colorGreen.indexOf(gameRsl[i]) > -1) {
					resultItem.find('.num_group').append($('<div />',{'class':'small_normal_item small_normal_item_green'}).text(gameRsl[i]));
				}
				
				if(i == gameRsl.length - 2){
					resultItem.find('.num_group').append($('<strong />').text('+'));
				}
			}
			
			var gameZodiac = entry['gameZodiac'].split(',');
			for(var i = 0; i < gameZodiac.length; i++){
				resultItem.find('.zod_group').append($('<div />',{'class':'small_normal_item'}).text(gameZodiac[i]));
					if(i == gameRsl.length - 2){
						resultItem.find('.zod_group').append($('<strong />').text('+'));
					}
			}
			resultItem.appendTo($('.result_box'));
	    } else if(url.indexOf('ssc') > -1 || url.indexOf('ffc') > -1 || url.indexOf('11x5') > -1 || url.indexOf('ssl') > -1
	    			|| url.indexOf('fc3d') > -1 || url.indexOf('pl3') > -1 || url.indexOf('qxc') > -1){
			if(url.indexOf('qxc') > -1){
				for(var i = 0; i < gameRsl.length - 3; i++){
					resultItem.find('.num_group').append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			} else {
				for(var i = 0; i < gameRsl.length; i++){
					resultItem.find('.num_group').append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			}
			resultItem.appendTo($('.result_box'));
	    }
	});
}

function timeCountDown() {
  var t = betTimeE.split(/[- :T]/);
  
	//Set the date we're counting down to
  countDownDate = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  
	// Update the count down every 1 second
  
	//Get todays date and time
	  //var now = new Date().getTime();
	getTime();
}

function getBetTime(url, gameCode) {
	getJsonData(url + "/GetBetTime", {'gameCode': gameCode}, betTimeCallBack);
}

function getPayRate(url, gameCode) {
	getJsonData(url + "/PayRate", {'gameCode': gameCode}, payRateCallBack);
}

function getCreditPayRate(url, gameCode) {
	getJsonData(url + "/CreditPayRate", {'gameCode': gameCode}, creditPayRateCallBack);
}

function getExamAndDesc(url, playTypeM, playTypeS) {
	var map = new Object();
	if($.inArray(playTypeM, typeAr) > -1) {
		map['playTypeM'] = playTypeM;
	} else {
		map['playTypeM'] = playTypeM;
		map['playTypeS'] = playTypeS;
	}
	getJsonData(url + '/GetExamAndDesc', map, getExamAndDescCallBack);
	
}

function getExamAndDescCallBack(response) {
	var playTypeM = response.data.playTypeM;
	var playTypeS = response.data.playTypeS;
	var ptnameCN = response.data.ptnameCN;
	var description = response.data.description;
	var example = response.data.example;
	$('.rule.' + playTypeM + ' .rule_content.' + playTypeS + ' ul li:first')
		.html('<strong>' + ptnameCN + ':</strong><br/>' + description);
	$('.rule.' + playTypeM + ' .rule_content.' + playTypeS + ' ul .sample p')
		.text(example);
}

function betListCallBack(response) {
	
	console.log(response);
}

var CFS = function (codeStr) {
	 function CfsCode(nWord) {
	  var result = "";
	  for (var cc = 1; cc <= nWord.length; cc++) { result += nWord.charAt(cc - 1).charCodeAt(0); }
	  var DecimalValue = new Number(result);
	  result = DecimalValue.toString(16);
	  return result;
	 };

	 var CodeLen = 30, CodeSpace, Been;
	 CodeSpace = CodeLen - codeStr.length;
	 if (CodeSpace > 1) { for (var cecr = 1; cecr <= CodeSpace; cecr++) { codeStr = codeStr + String.fromCharCode(21); } }
	 var NewCode = new Number(1);

	 for (var cecb = 1; cecb <= CodeLen; cecb++) { Been = CodeLen + codeStr.charAt(cecb - 1).charCodeAt(0) * cecb; NewCode = NewCode * Been; }

	 var tmpNewCode = new Number(NewCode.toPrecision(15)); //to convert to the same precision as c# code
	 codeStr = tmpNewCode.toString().toUpperCase();
	 var NewCode2 = "";

	 for (var cec = 1; cec <= codeStr.length; cec++) { NewCode2 = NewCode2 + CfsCode(codeStr.substring(cec - 1, cec + 2)); }

	 var CfsEncodeStr = "";
	 for (var cec = 20; cec <= NewCode2.length - 18; cec += 2) { CfsEncodeStr = CfsEncodeStr + NewCode2.charAt(cec - 1); }
	 return CfsEncodeStr.toUpperCase();
	}

var computeAllHeZhuCount = function (count) {
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    if (count == 2) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                key = (n1 + n2) + '';
                if (numQty.hasOwnProperty(key)) {
                    numQty[key] = numQty[key] + 1;
                } else {
                    numQty[key] = 1;
                }
            }
        }
    } else if (count == 3) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                for (n3 = 0; n3 < 10; n3++) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}

var computeAllKdZhuCount = function (count) {
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '', n_arr = [], n_max = 0, n_min = 0;
    if (count == 2) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                key = (Math.abs(n1 - n2)) + '';
                if (numQty.hasOwnProperty(key)) {
                    numQty[key] = numQty[key] + 1;
                } else {
                    numQty[key] = 1;
                }
            }
        }
    } else if (count == 3) {
        for (n1 = 0; n1 < 10; n1++) {
            for (n2 = 0; n2 < 10; n2++) {
                for (n3 = 0; n3 < 10; n3++) {
                    n_arr = [n1, n2, n3];
                    n_max = Math.max.apply(null, n_arr);
                    n_min = Math.min.apply(null, n_arr);
                    key = (n_max - n_min) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}

var computeZxHeZhuCount = function (count) {
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    
    if(count == 2) {
    	
    	for (n1 = 0; n1 < 10; n1++) {
            for (n2 = n1; n2 < 10; n2++) {
            	if (n1 != n2) {
                    key = (n1 + n2) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    } else if(count == 3) {
    	
    	for (n1 = 0; n1 < 10; n1++) {
            for (n2 = n1; n2 < 10; n2++) {
                for (n3 = n2; n3 < 10; n3++) {
                    if (n1 != n2 || n2 != n3 || n1 != n3) {
                        key = (n1 + n2 + n3) + '';
                        if (numQty.hasOwnProperty(key)) {
                            numQty[key] = numQty[key] + 1;
                        } else {
                            numQty[key] = 1;
                        }
                    }
                }
            }
        }
    }
    return numQty;
}

function getFushiZuheShu(min_qty, num_len) {
    if (num_len < min_qty) {
        return 0;
    }
    var a = 1, b = 1, i = 0;
    for (i = 0; i < min_qty; i++) {
        a = a * (num_len - i);
        b = b * (min_qty - i);
    }
    return parseInt(a / b);
}

function uniquearr(arr1,arr2){
	var arr=[];
	for (i=0;i<arr2.length;i++) {
		if (arr1.indexOf(arr2[i])<0) {
			arr.push(arr2[i]);
		}
	}
	return arr;
}

var computeZxHeZhu3Count = function () {
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    for (n1 = 0; n1 < 10; n1++) {
        for (n2 = n1; n2 < 10; n2++) {
            for (n3 = n2; n3 < 10; n3++) {
                if ((n1 == n2 && n2 != n3 && n1 != n3) ||
			(n1 != n2 && n2 == n3 && n1 != n3) ||
			(n1 != n2 && n2 != n3 && n1 == n3)) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}

var computeZxHeZhu6Count = function () {
    var numQty = {}, n1 = 0, n2 = 0, n3 = 0, key = '';
    for (n1 = 0; n1 < 10; n1++) {
        for (n2 = n1; n2 < 10; n2++) {
            for (n3 = n2; n3 < 10; n3++) {
                if (n1 != n2 && n2 != n3 && n1 != n3) {
                    key = (n1 + n2 + n3) + '';
                    if (numQty.hasOwnProperty(key)) {
                        numQty[key] = numQty[key] + 1;
                    } else {
                        numQty[key] = 1;
                    }
                }
            }
        }
    }
    return numQty;
}

function BSOE(a1, text) {
	if(text == '大') {
		a1.push('B');
	} else if (text == '小') {
		a1.push('S');
	} else if (text == '单') {
		a1.push('O');
	} else if (text == '双') {
		a1.push('E');
	}
}

var colorRed = [
	"01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"
];

var colorBlue = [
	"03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"
];

var colorGreen = [
	"05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"
];

var zodiac = [
	"猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠"
];

var bj28ColorRed = [
    "3", "6", "9", "12", "15", "18", "21", "24"
];

var bj28ColorGreen = [
    "1", "4", "7", "10", "16", "19", "22", "25"
];

var bj28ColorBlue =[
    "2", "5", "8", "11", "17", "20", "23", "26"
];

function getTimeCallBack(response) {
	var t2 = response.data.split(/[- :T]/);
	
	var now = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
	
	// Find the distance between now an the count down date
	var distance = countDownDate - now;
	
	var x = setInterval(function() {

		  // Time calculations for days, hours, minutes and seconds
		  var days = Math.floor(distance / (1000 * 60 * 60 * 24));
		  var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
		  var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds = Math.floor((distance % (1000 * 60)) / 1000);
		  
		  
		  
		  // Display the result in the element with id="demo"
		  if(hours > 99) {
			  $('.digit-1').html(9);
			  $('.digit-2').html(9);
			  $('.digit-3').html(5);
			  $('.digit-4').html(9);
			  $('.digit-5').html(5);
			  $('.digit-6').html(9);
		  } else {
			  $('.digit-1').html(Math.floor(hours/10));
			  $('.digit-2').html(Math.floor(hours%10));
			  $('.digit-3').html(Math.floor(minutes/10));
			  $('.digit-4').html(Math.floor(minutes%10));
			  $('.digit-5').html(Math.floor(seconds/10));
			  $('.digit-6').html(Math.floor(seconds%10));
		  }
		  
		  distance -= 1000;
		  
		  // If the count down is finished, write some text 
		  if (distance < 0) {
		    clearInterval(x);
		    showResult(false, "已封盘", null, 5000);
		    setTimeout(getGameInfo, 5000);
		    //alert("已封盘");
		    //location.reload();
		  }
		}, 1000);
}

function saveGameTypeCallBack(response) {
	console.log(response);
}

function hiddenClickPlayMusic(mute, audio) {
}

function offTouch(){
	document.addEventListener('touchstart',function (event) {  
        if(event.touches.length>1){  
            event.preventDefault();  
        }  
    },false)  
    var lastTouchEnd=0;  
    document.addEventListener('touchend',function (event) {  
        var now=(new Date()).getTime();  
        if(now-lastTouchEnd<=300){  
            event.preventDefault();  
        }  
        lastTouchEnd=now;  
    },false)
}

function betTimeCallBack(response) {
	  $('#now_issue').empty();
	  issueNo = response.data.issueNo;	
	  betTimeE = response.data.betTimeE;
      previousIssueNo = response.data.preIssueNo;
	  lotteryTime = response.data.lotteryTime;
	  $('<span />', {'class':'time_ico'})
		.appendTo($('#now_issue'));
	  
	  $('<div />', {'class':'timer_item'})
	  	.append($('<font />').html('距'))
	  	.append($('<div />', {'id':'issueNo'}).html(issueNo))
		.appendTo($('#now_issue'));
	  
	  $('<div />', {'class':'timer_item'})
	  	.append($('<font />').html('封盘'))
	  	.append($('<div />', {'id':'close'}))
		.appendTo($('#now_issue'));
	  
	getPreviousGameResult();
	//取得封盤時間
	var t = betTimeE.split(/[- :T]/);
	countDownDateE = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
	
	//取得開獎時間
	var open_t = lotteryTime.split(/[- :T]/);
	countDownDateOpenTime = new Date(open_t[0],open_t[1]-1, open_t[2], open_t[3], open_t[4], open_t[5]);
	
	//取得現在時間
	var t2 = response.data.nowTime.split(/[- :T]/);
	var now = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
	
	// Find the distance between now an the count down date
	//封盤時間差
	var distance_bet = countDownDateE - now;
	
	//開獎時間差
	var distance_open = countDownDateOpenTime - now;
	
	
	var x = setInterval(function() {
		  
		
		  // 封盤時間倒數
		  if(distance_bet == 3000){
			  var audio = document.getElementById('audio3');
			  hiddenClickPlayMusic(false, audio);
	      }			
		  // 封盤時間變數
		  var days_bet = Math.floor(distance_bet / (1000 * 60 * 60 * 24));
		  var hours_bet = Math.floor((distance_bet % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days_bet * 24;
		  var minutes_bet = Math.floor((distance_bet % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds_bet = Math.floor((distance_bet % (1000 * 60)) / 1000);
		  
		  //開盤時間變數
		  var days_open = Math.floor(distance_open / (1000 * 60 * 60 * 24));
		  var hours_open = Math.floor((distance_open % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days_open * 24;
		  var minutes_open = Math.floor((distance_open % (1000 * 60 * 60)) / (1000 * 60));
		  var seconds_open = Math.floor((distance_open % (1000 * 60)) / 1000);

		  // 放入封盤時間
		  if(hours_bet > 99) {
			  $('#close').html('99:59:59');
		  } else {
			  if(hours_bet <= 9){
				  hours_bet = '0' + hours_bet;
			  }
			  
			  if(minutes_bet <= 9){
				  minutes_bet = '0' + minutes_bet;
			  }
			  
			  if(seconds_bet <= 9){
				  seconds_bet = '0' + seconds_bet;
			  }
			  $('#close').html(hours_bet + ':' + minutes_bet + ':' + seconds_bet);
		  }
		  
		  //放入開獎時間
		  if(hours_open > 99) {
			  $('#open').html('99:59:59');
		  } else {
			  if(hours_open <= 9){
				  hours_open = '0' + hours_open;
			  }
			  
			  if(minutes_open <= 9){
				  minutes_open = '0' + minutes_open;
			  }
			  
			  if(seconds_open <= 9){
				  seconds_open = '0' + seconds_open;
			  }
			  $('#open').html(hours_open + ':' + minutes_open + ':' + seconds_open);
		  }
		  
		  distance_bet -= 1000;
		  distance_open -= 1000;
		  
		  
		  // 封盤時間到數結束結算 
		  if (distance_bet < 0) {
		    clearInterval(x);
		    setTimeout(getGameInfo(), 5000);
		    
		    var title = $('.title-text').text();
			var modalIssueNo = $('#issueNo').text();
			var content = '已封盘';
			countdownModal(5000, warningModal, title, modalIssueNo, content, transBetPage);
		  }
		  
		}, 1000);
}

function payRateCallBack(response){
	$.each(response.data,function(entryIdx,entry){
		
			if(entry['playTypeM'] == 104 || entry['playTypeM'] == 17) {
				
				var divClass = $('.sum' + entry['playTypeS']).parent().parent().parent().attr('class');
				if(divClass.indexOf(entry['playTypeM']) == -1) {
					$('.sum' + entry['playTypeS']).parent().parent().parent().addClass('sum' + entry['playTypeM']);
				}
				$('.sum' + entry['playTypeS'] + '+div').text(entry['payRateMax']);
				$('.sum' + entry['playTypeS'] + '+div').addClass('' + entry['rebatRate']);
			} else if(entry['playTypeM'] >= 35 && entry['playTypeM'] <= 38 && entryIdx != 'Specific-NNN') {
				
					var divClass = $('.pk10' + entry['playTypeS']).parent().parent().parent().attr('class');
					if(divClass.indexOf(entry['playTypeM']) == -1) {
						$('.pk10' + entry['playTypeS']).parent().parent().parent().addClass('pk10' + entry['playTypeM']);
					}
					$('.pk10' + entry['playTypeS'] + '+div').text(entry['payRateMax']);
					$('.pk10' + entry['playTypeS'] + '+div').addClass('' + entry['rebatRate']);
			} else if(entry['playTypeM'] >= 40 && entry['playTypeM'] <= 54) {
				
				var divClass = $('.hk6' + entry['playTypeS']).parent().parent().parent().attr('class');
				if(divClass.indexOf(entry['playTypeM']) == -1) {
					$('.hk6' + entry['playTypeS']).parent().parent().parent().addClass('hk6' + entry['playTypeM']);
				}
				$('.hk6' + entry['playTypeS'] + '+div').text(entry['payRateMax']);
				$('.hk6' + entry['playTypeS'] + '+div').addClass('' + entry['rebatRate']);
			} else {
				rebatRate = entry['rebatRate'];
				playTypeM = entry['playTypeM'];
				playTypeS = entry['playTypeS'];
				payRate = entry['payRateMax'];
				payRate2 = entry['payRate2Max'];
				$('<div />',{'class':'attribute','style':'display:none'})
					.append($('<span />',{'class':'rebatRate ' + rebatRate}))
					.append($('<span />',{'class':'playTypeM ' + playTypeM}))
					.append($('<span />',{'class':'playTypeS ' + playTypeS}))
					.append($('<span />',{'class':'payRate ' + payRate}))
					.append($('<span />',{'class':'payRate2 ' + payRate2}))
					.appendTo($('#' + entryIdx));
				$('#' + entryIdx + ' .classification:first .pay_rate').remove();
				if(payRate2 != 0) {
					$('<div />', {'class': 'pay_rate'}).text('赔率1: ' + entry['payRateMax'] + ', 赔率2: ' + entry['payRate2Max']).prepend('&nbsp;').appendTo($('#' + entryIdx + ' .classification:first'));
				} else {
					$('<div />', {'class': 'pay_rate'}).text('赔率: ' + entry['payRateMax']).appendTo($('#' + entryIdx + ' .classification:first'));
				}
			}
	})
	
	fContentVisible();
	closeLoader();
	}

function creditPayRateCallBack(response) {
	bjpkAr = [824, 825, 826, 827];
	fsffpkAr = [995, 996, 997, 998];
	$.each(response.data, function(entryIdx, entry) {
		if(entry['playTypeM'] == 35 || entry['playTypeM'] == 38 && entry['playTypeS'] != 231){
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if(entry['playTypeM'] == 18 || entry['playTypeM'] == 21 || entry['playTypeM'] == 22 || entry['playTypeM'] == 76){
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if(entry['playTypeM'] == 105 || entry['playTypeM'] == 108 || entry['playTypeM'] == 109 || entry['playTypeM'] == 110){
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if(entry['playTypeM'] == 40  || entry['playTypeM'] == 41) {
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if($.inArray(entry['playTypeS'],bjpkAr) == -1 && (entry['playTypeM'] == 16 || (entry['playTypeM'] >= 65 && entry['playTypeM'] <= 75))) {
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if($.inArray(entry['playTypeS'],fsffpkAr) == -1 && (entry['playTypeM'] == 114 || (entry['playTypeM'] >= 116 && entry['playTypeM'] <= 126))) {
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if(entry['playTypeM'] == 3 || entry['playTypeM'] == 4 || entry['playTypeM'] == 6 || (entry['playTypeM'] >= 88 && entry['playTypeM'] <= 93 )) {
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else if(entry['playTypeM'] == 79 || entry['playTypeM'] == 80 || entry['playTypeM'] == 82 || (entry['playTypeM'] >= 94 && entry['playTypeM'] <= 99)) {
			var divClass = $('.credit_' + entry['playTypeS']).parent().parent().attr('class');
			if(divClass.indexOf(entry['playTypeM']) == -1) {
				$('.credit_' + entry['playTypeS']).parent().parent().addClass('credit_' + entry['playTypeM']);
			}
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		} else {
			$('.credit_' + entry['playTypeS']).text(entry['payRateMax']);
			$('.credit_' + entry['playTypeS']).addClass('' + entry['rebatRate']);
		}
		
		
	});
	
	fContentVisible();
	closeLoader();
	
}	
	
function initialGameLink(response){
	var parent = response.data[0].id;
	for(var i = 0; i < response.data.length; i++){
		if(response.data[i].gameID != 0){
			if(response.data[i].parent == parent){
				if(response.data[i].officialOrCredit == 0){
					window.location.href = "${root}/mobile2/new-" + response.data[i].gameCode;
				} else {
					window.location.href = "${root}/mobile2/new-credit-" + response.data[i].gameCode;
				}
				return;
			}
		}
	}
}

function getExamAndDesc(url, playTypeM, playTypeS) {
	var map = new Object();
	if($.inArray(playTypeM, typeAr) > -1) {
		map['playTypeM'] = playTypeM;
	} else {
		map['playTypeM'] = playTypeM;
		map['playTypeS'] = playTypeS;
	}
	getJsonData(url + '/GetExamAndDesc', map, getExamAndDescCallBack);
	
}

function getExamAndDescCallBack(response) {
	var playTypeM = response.data.playTypeM;
	var playTypeS = response.data.playTypeS;
	var ptnameCN = response.data.ptnameCN;
	var description = response.data.description;
	var example = response.data.example;
	$('.rule.' + playTypeM + ' .rule_content.' + playTypeS + ' ul li:first')
		.html('<strong>' + ptnameCN + ':</strong><br/>' + description);
	$('.rule.' + playTypeM + ' .rule_content.' + playTypeS + ' ul .sample p')
		.text(example);
}

function checkAll(obj) {
    $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").addClass("focus")
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
}
function checkBig(obj) {
    checkClear(obj);
    var num1 = $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").length / 2;
    $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").each(function (e) {
        if (e >= num1) $(this).addClass("focus")
    })
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
}
function checkSmall(obj) {
    checkClear(obj);
    var num1 = $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").length / 2;
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
   $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").each(function (e) {
        if (e < num1) $(this).addClass("focus")
    })
}
function checkSingular(obj) {
    checkClear(obj);
    if (parseInt($(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").first().find("div").html()) % 2 == 0)
        $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official:odd").addClass("focus")
    else $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official:even").addClass("focus")
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
}
function checkDouble(obj) {
    checkClear(obj);
    if (parseInt($(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").first().find("div").html()) % 2 == 0)
        $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official:even").addClass("focus")
    else $(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official:odd").addClass("focus")
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
}
function checkClear(obj) {
	$(obj).parents(".bet_panel_content_official").find(".bet_panel_content_item_official").removeClass("focus")
    $(obj).addClass("option_focus").siblings().removeClass("option_focus")
}
function checkRed(obj){
  checkClear(obj);
  $(obj).parents(".item").find(".tz_rt").find("li.red").addClass("on");
    $(obj).addClass("on").siblings().removeClass("on");
}
function checkBlue(obj){
  checkClear(obj);
  $(obj).parents(".item").find(".tz_rt").find("li.blue").addClass("on");
    $(obj).addClass("on").siblings().removeClass("on");
}
function checkGreen(obj){
  checkClear(obj);
  $(obj).parents(".item").find(".tz_rt").find("li.green").addClass("on");
    $(obj).addClass("on").siblings().removeClass("on");
}

