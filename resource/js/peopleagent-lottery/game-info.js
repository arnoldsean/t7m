$(function() {
  flagForPayRate = false; //控制第一次load賠率
  if(login == 'false') {
    layer.open({
      title: '警告',
      content: '进行游戏前，请先登入',
      icon: 0,
      btnAlign: 'c',
      time: 1000,
      yes: function(index, layero) {
        layer.close(index);
      },
      end: function() {
        location.href = contextPath + '/mobile/signIn';
      }
    });
  } else {
    openLoader();
    getJsonData(contextPath + '/GameInfo/GetStatus', {'gameCode': gameCode}, gameStatusCallBack);
  }
});

function gameStatusCallBack(response) {
  if (response.data.gameStatus != 1) {
	closeLoader();
	$('body').append($('<div />', {'id':'debug'}).html('维修中'));
  } else {
    playMode == 'official' ? getOfficialAppendJson() : getCreditAppendJson();
    getGameInfo();
  }
}

function getGameInfo() {
//  getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode' : gameCode}, gameResultCallBack);
  getJsonData(contextPath + "/GameInfo/GetBetTime", {'gameCode': gameCode}, betTimeCallBack);
  if(flagForPayRate == false) {
    if(playMode == 'official'){
      getJsonData(contextPath + "/GameInfo/PayRate", {'gameCode': gameCode}, payRateCallBack);  
    } else {
        getJsonData(contextPath + "/GameInfo/CreditPayRate", {'gameCode': gameCode}, creditPayRateCallBack);
    }
    flagForPayRate = true;
  }
  getJsonData(contextPath + '/GameInfo/GetIssueInfo', {'gameCode': gameCode}, getIssueInfoCallBack);
  rangeValue = 0;

}

function refreshGameResult(gameCodeArray) {
  if($.inArray(gameCode, gameCodeArray) > -1) {
    getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode' : gameCode}, splitGameResult);
  }
}

function splitGameResult(response) {
  gameResultCallBack(response);
  getPreviousGameResultCallBack(response);
}

var zodiac = [
  "猪", "狗", "鸡", "猴", "羊", "马", "蛇", "龙", "兔", "虎", "牛", "鼠"
];


var timerPreResult;

var timerCountDown;
function timeCountDown() {
  var t = betTimeE.split(/[- :T]/);
  
    //Set the date we're counting down to
    countDownDate = new Date(t[0], t[1]-1, t[2], t[3], t[4], t[5]);
  
    // Update the count down every 1 second
  
    //Get todays date and time
    var t2 = nowTime.split(/[- :T]/);
    var now = new Date(t2[0], t2[1]-1, t2[2], t2[3], t2[4], t2[5]);
    
    // Find the distance between now an the count down date
    var distance = countDownDate - now;
    
    if(timerCountDown) {
      clearInterval(timerCountDown);
    }
    
    timerCountDown = setInterval(function() {
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) + days * 24;
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
      if(distance == 3000){
//          getMusicData();
//            source.start(0);
      }
      // Display the result in the element with id="demo"
      if (hours > 99) {
          $('.clock.hour .count').text(99);
          $('.clock.minute .count').text(59);
          $('.clock.second .count').text(59);
          Snap('.clock.hour .svg-clock').select('.clock.hour .progress').attr({strokeDasharray: '252, 252'});
      } else {
          $('.clock.hour .count').text(hours);
          $('.clock.minute .count').text(minutes);
          $('.clock.second .count').text(seconds);
          Snap('.clock.hour .svg-clock').select('.clock.hour .progress').attr({'stroke-dasharray': (252 - ((hours + 1) * 4.2)) + ', 252'});
      }
          
      var t = seconds * 4.2;
      Snap('.clock.minute .svg-clock').select('.clock.minute .progress').attr({'stroke-dasharray': (252 - ((minutes + 1) * 4.2)) + ', 252'});
      Snap.animate(252 - t, 252 - (t + 4.2), function (value) {
        Snap('.clock.second .svg-clock').select('.clock.second .progress').attr({'stroke-dasharray': value + ', 252'});
      }, 200);
          
      distance -= 1000;
              
      // If the count down is finished, write some text 
      if (distance < 0) {
        clearInterval(timerCountDown);
        showWaringResult('第 ' + issueNo + " 期已封盘");
        getGameInfo();
      }
    }, 1000);
}

function betTimeCallBack(response) {
	  $('#now_issue').empty();
	  issueNo = response.data.issueNo;	
	  betTimeE = response.data.betTimeE;
      previousIssueNo = response.data.preIssueNo;
	  lotteryTime = response.data.lotteryTime;
	  
	  $('<div />', {'class':'timer_item'})
//	  	.append($('<font />').html('距'))
	  	.append($('<div />', {'id':'issueNo'}).html(issueNo))
//	  	.append($('<font />').html('期'))
		.appendTo($('#now_issue'));
	  
	  $('<div />', {'class':'timer_item'})
	  	.append($('<font />').html('封盘:'))
	  	.append($('<div />', {'id':'close'}))
		.appendTo($('#now_issue'));
	  
//	getPreviousGameResult();
	refreshGameResult([gameCode]);
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

function bettingCallBack(response) {
    closeAll();
	if(response.result == true) {
		getJsonData(document.getElementById("contextPath").value + '/Member/GetBalance', null, changeAfterBetBalance);
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

var hk6ColorRed = [
	"01", "02", "07", "08", "12", "13", "18", "19", "23", "24", "29", "30", "34", "35", "40", "45", "46"
];

var hk6ColorBlue = [
	"03", "04", "09", "10", "14", "15", "20", "25", "26", "31", "36", "37", "41", "42", "47", "48"
];

var hk6ColorGreen = [
	"05", "06", "11", "16", "17", "21", "22", "27", "28", "32", "33", "38", "39", "43", "44", "49"
];

//function getPreviousGameResult() {
//    getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode': gameCode}, getPreviousGameResultCallBack);
//    
//    timerPreResult = setInterval(function() {
//        getJsonData(contextPath + "/GameInfo/GetGameResult", {'gameCode': gameCode}, getPreviousGameResultCallBack);
//    }, 10000);
//}

function getPreviousGameResultCallBack(response) {
	
	if(response.data[0].issueNo == previousIssueNo) {
		$('.previous_result').empty();
		var gameRsl = response.data[0].gameRsl.split(",");
		$('<div />', {'class':'draw'}).appendTo('.previous_result');
		$('<span />').text(response.data[0].issueNo).appendTo($('#previous .draw'));
		var div = $('<div />', {'class':'sc-hSdWYo jvuHdM'});
		if(gameType == 6 || gameType == 15){
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
		} else if(gameType == 4 || gameType == 14){
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
		} else if(gameType == 9){
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
		} else if(gameType == 8){
			var divZodaic = $('<div />',{'class':'sc-hSdWYo jvuHdM add'});
			var gameZodiac = response.data[0].gameZodiac.split(",");
			for(var i = 0; i < gameRsl.length; i++){
				if(hk6ColorRed.indexOf(gameRsl[i]) > -1) {
					div.append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(hk6ColorBlue.indexOf(gameRsl[i]) > -1) {
					div.append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(hk6ColorGreen.indexOf(gameRsl[i]) > -1) {
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
		} else if(gameType == 3 || gameType == 5 || gameType == 7 || gameType == 10 || gameType == 12){
			if(gameType == 10){
				for(var i = 0; i < gameRsl.length - 3; i++){
					div.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			} else {
				for(var i = 0; i < gameRsl.length; i++){
					div.append($('<div />',{'class':'normal_item normal_item_orange'}).text(gameRsl[i]));
				}
			}
		}
		
		
		if(gameType == 8){
			$('#hk6_previous_wrap').remove();
			$('<span />',{'class':'hk6_previous_wrap','id':'hk6_previous_wrap'}).append(div).append(divZodaic).appendTo($('.previous_result'));
		} else {
			div.appendTo($('.previous_result'));
		}
		
//        clearInterval(timerPreResult);
		
	} else {
		$('.previous_result').empty();
		$('<div />', {'class':'draw'}).appendTo('.previous_result');
		$('<span />').text(previousIssueNo).appendTo($('#previous .draw'));
		var div = $('<div />', {'class':'sc-hSdWYo jvuHdM'});
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('正'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('在'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('开'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('奖'));
		div.append($('<div />',{'class':'normal_item open_item', 'style':'font-weight:bold'}).text('中'));
		div.appendTo($('.previous_result'));
	}
	
}

function gameResultCallBack(response) {
    $('.result_box').empty();
	$.each(response.data, function(entryIdx, entry) {
		if(entryIdx > 4) return false;

		var gameRsl =  entry['gameRsl'].split(",");
		var resultItem = $('<div />', {'class':'result_item'})
							.append($('<div />', {'class':'result_issue'})
									.append($('<font />').html(entry.issueNo)))
							.append($('<div />', {'class':'result_number'})
									.append($('<div />', {'class':'num_group'})));
		var gameRslTotal = 0;
		var nowNumber = 0;
		var nowNumberClass = "";
		if(gameType == 6 || gameType == 15){
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
	    	
	    } else if(gameType == 4 || gameType == 14){
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
	    } else if(gameType == 9){
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
	    } else if(gameType == 8){
	    	//串上第二列动物的group
	    	resultItem.find('.result_number').append($('<div />', {'class':'zod_group'}));
	    	
			for(var i = 0; i < gameRsl.length; i++){
				if(hk6ColorRed.indexOf(gameRsl[i]) > -1) {
					resultItem.find('.num_group').append($('<div />',{'class':'small_normal_item small_normal_item_red'}).text(gameRsl[i]));
				} else if(hk6ColorBlue.indexOf(gameRsl[i]) > -1) {
					resultItem.find('.num_group').append($('<div />',{'class':'small_normal_item small_normal_item_blue'}).text(gameRsl[i]));
				} else if(hk6ColorGreen.indexOf(gameRsl[i]) > -1) {
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
	    } else if(gameType == 3 || gameType == 5 || gameType == 7 || gameType == 10 || gameType == 12){
			if(gameType == 10){
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

function payRateCallBack(response) {
  
  $.each(response.data, function(entryIdx, entry){
      if(entry.playStatus == 0) {
        return;
      }
      var v_playTypeM = entry.playTypeM;
      var v_playTypeS = entry.playTypeS;
      if($("[data-play_type_m='" + v_playTypeM + "'][data-play_type_s='" + v_playTypeS + "']").length > 0) {
        var v_checkPos = $("[data-play_type_m='" + v_playTypeM + "'][data-play_type_s='" + v_playTypeS + "']").data('check_pos');
      } else {
        var v_checkPos = "N";
      }
      var v_payRateMin = entry.payRateMin;
      var v_payRateMax = entry.payRateMax;
      rebatRate = entry.rebatRate;
      multipleBase = entry.multipleBase;
      multipleMax = entry.multipleMax;
      multipleMin = entry.multipleMin;
      
      if(v_checkPos == "N"){
          $("[data-play_type_m='" + v_playTypeM + "']")
          .find("[data-play_type_s='" + v_playTypeS + "']")
          .find('.SUM_payRate')
          .remove();
          
          $("[data-play_type_m='" + v_playTypeM + "']")
          .find("[data-play_type_s='" + v_playTypeS + "']")
          .append($("<div />", {'class':'SUM_payRate'}).data('pay_rate_max', v_payRateMax).html(v_payRateMax));
      } else {
		  $('#' + entryIdx + '-info .pay_rate').remove();
		  var payRate = entry['payRateMax'];
		  var payRate2 = entry['payRate2Max'];
		  if(payRate2 != 0) {
		  	$('<div />', {
		  		'class': 'pay_rate',
		  		'data-pay_rate_max': payRate,
		  		'data-pay_rate2_max': payRate2,
		  		'data-pay_rate': Math.floor(Number(multipleMax * payRate * 10000 / multipleBase)) / 10000,
		  		'data-pay_rate2': Math.floor(Number(multipleMax * payRate2 * 10000 / multipleBase)) / 10000
		  	})
		  	//.text('赔率1: ' + payRate + ', 赔率2: ' + payRate2)
		  	.prepend('&nbsp;').appendTo($('#' + entryIdx + '-info'));
		  } else {
		  	$('<div />', {
		  		'class': 'pay_rate', 
		  		'data-pay_rate_max': payRate,
		  		'data-pay_rate': Math.floor(Number(multipleMax * payRate * 10000 / multipleBase))/ 10000
		  	})
		  	//.text('赔率: ' + payRate)
		  	.appendTo($('#' + entryIdx + '-info'));
		  }
      }	  
      
  })
  
  /* dom都產生完成之後, 最後執行的function */
  afterAppendDom(response);
  closeLoader();
}

function creditPayRateCallBack(response) {
  
  $.each(response.data, function(entryIdx, entry) {
    var playTypeM = entry.playTypeM;
    var playTypeS = entry.playTypeS;
    rebatRate = entry.rebatRate;
    multipleBase = entry.multipleBase;
    multipleMax = entry.multipleMax;
    multipleMin = entry.multipleMin;
    $("[data-play_type_m='" + playTypeM + "']")
    .find("[data-play_type_s='" + playTypeS + "']")
    .find('.payrate')
    .remove();
    
    $("[data-play_type_m='" + playTypeM + "']")
    .find("[data-play_type_s='" + playTypeS + "']")
    .append($('<div />', {'class': 'payrate', 'data-pay_rate_max': entry['payRateMax']}).text(entry['payRateMax']));
    
  });
  /* dom都產生完成之後, 最後執行的function */
  afterAppendDom(response);
  closeLoader();
}

function getIssueInfoCallBack(response) {
  diffEndIssueNo = response.data.endIssueNo - response.data.issueNo + 1;
  defaultTrace();
}

function defaultTrace() {
  $('.quantity').val(1);
  $('#trace').val(5);
  $('.multiple').val(1);
  
  if(diffEndIssueNo < 5) {
    $('trace').val(diffEndIssueNo);
  }
}

function getBetList() {
  var map = new Object();
  map['acDate'] = nowTime;
  map['gameCode'] = gameCode;
  map['pageIndex'] = $('#pagination').twbsPagination('getCurrentPage');
  map['authType'] = true;
  getJsonData(contextPath + "/Record/BetRecord", map, betRecordCallBack, betRecordErrorCallBack);
}

function orderContent(data) {
  var element = [];
  element.push(data.playType + "<br>");
  
  if(data.pos0 != "") {
      element.push(data.pos0Prefix + ': ' + data.pos0);
  }
  
  if(data.pos1 != "") {
      element.push(data.pos1Prefix + ': ' + data.pos1);
  }
  
  if(data.pos2 != "") {
      element.push(data.pos2Prefix + ': ' + data.pos2);
  }
  
  if(data.pos3 != "") {
      element.push(data.pos3Prefix + ': ' + data.pos3);
  }
  
  if(data.pos4 != "") {
      element.push(data.pos4Prefix + ': ' + data.pos4);
  }
  
  if(data.pos5 != "") {
      element.push(data.pos5Prefix + ': ' + data.pos5);
  }
  
  if(data.pos6 != "") {
      element.push(data.pos6Prefix + ': ' + data.pos6);
  }
  
  if(data.pos7 != "") {
      element.push(data.pos7Prefix + ': ' + data.pos7);
  }
  
  if(data.pos8 != "") {
      element.push(data.pos8Prefix + ': ' + data.pos8);
  }
  
  if(data.pos9 != "") {
      element.push(data.pos9Prefix + ': ' + data.pos9);
  }
  
  return element;
}

function betRecordCallBack(response) {
  $('.history .bet-table tbody').empty();
  if(response.result) {
    if(response.data.data.length > 0) {
      $.each(response.data.data, function(entryIdx, entry) {
        var tr = $('<tr />')
        .append($('<td />').text(entry.betTime))
        .append($('<td />').text(entry.gameName))
        .append($('<td />').text(entry.issueNo))
        .append($('<td />').text(entry.payRate))
        .append($('<td />').html(orderContent(entry)))
        .append($('<td />').text(entry.realAmt))
        .append($('<td />').text(entry.gameRsl))
        .append($('<td />').text(entry.resultAmt));
        
        if(entry.status == '待开奖' && entry.issueNo >= issueNo) {
          tr
          .append($('<td />')
              .append($('<font />', {'class': 'd-block w-100'}).text(entry.status))
              .append($('<a />', {'class': 'btn110 retrace', 'data-bet_no': entry.betNo}).text('撤单')));
        } else {
          tr
          .append($('<td />', {'style': 'color:green;'}).text(entry.status));
        }
        tr.appendTo($('.history .bet-table tbody'));
        
      });
      
      updatePagination($('#pagination'), response.data.info.pages, getBetList);
    } else {
      $('<tr />')
      .append($('<td />', {'colspan': 9}).text('尚无投注记录'))
      .appendTo($('.history .bet-table tbody'));
    }
  } else {
    $('<tr />')
    .append($('<td />', {'colspan': 9}).text('请登入查看投注记录'))
    .appendTo($('.history .bet-table tbody'));
  }
}

function betRecordErrorCallBack(response) {
  window.location.href = contextPath;
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

function CheckNumThis(obj) {
  $(obj).toggleClass("focus");
}