$(function() {
	bet();
})

function bet() {
	$('.section').on('click', '.bet_panel_content_item', function(){
		if($(this).hasClass('focus')){
			$(this).removeClass('focus');
		} else {
			$(this).addClass('focus');
		}

		$('.bet_box .bet_count').text($('.focus').length);
		
	})
	
    $('.submit').click(function(){
	if(login == "false") {
    	var title = $('.title-text').text();
		var modalIssueNo = $('#issueNo').text();
		var content = '请先进行登录';
		normalModal(warningModal, title, modalIssueNo, content, goLogin);
      return;
    }
      var submitMode = $(this).data('submit');
      var total = 0;
      var $onBall = '';
	  var onBallLen = 0;
      switch(submitMode){
      case 'now':
    	  total = $('.bet_box .bet_count').html() * $('.bet_box .bet_value').val();
    	  $onBall = $('.bet_panel_content_item.focus');
		  onBallLen = $onBall.length;
    	  break;
			
      case 'detail':
    	  total = $('.bet-total-amount').html().replace(/¥/g, ' ').trim();
    	  $onBall = $('.bet_data_input .on');
		  onBallLen = $onBall.length;
    	  break;
      }
      
		if (total <= 0 && onBallLen <= 0) {
  			title = $('.title-text').text();
  			modalIssueNo = $('#issueNo').text();
  			content = '投注金需大于0';
  			normalModal(warningModal, title, modalIssueNo, content);
  			return;
  		} else {
  	        layer.msg('下注中 祝您中奖!', {
  	          icon : 16,
  	          shade : 0.01
  	        });
  	        arr = [], arr2 = [];
  	        for(var i = 0; i < onBallLen; i++){
      			var $thisBall = $onBall.eq(i);
  	  	        switch(submitMode){
  	  	        case 'now':
  	          		var $betContent = $thisBall.closest('.bet_panel_content');
  	          		var playTypeM = $betContent.data('play_type_m');
  	          		var playTypeS = $thisBall.data('play_type_s');
  	          		var payRate = $thisBall.find('.payrate').text();
  	          	    var unitPrice = $('.bet_box .bet_value').val();
  	  	          	var checkPos = $betContent.data('check_pos');
  	  	    	    break;
  	  				
  	  	        case 'detail':
  	          		var playTypeM = $thisBall.data('play_type_m');
  	          		var playTypeS = $thisBall.data('play_type_s');
  	          		var payRate = $thisBall.data('pay_rate_max');
  	          		var unitPrice = $thisBall.val();
  	  	          	var checkPos = $thisBall.data('check_pos');
  	  	    	    break
  	  	      }
  	  	        var betMainInfo = new Object();
      			betMainInfo['playTypeM'] = playTypeM;
      			betMainInfo['playTypeS'] = playTypeS;
      			betMainInfo['quantity'] = 1;
      			betMainInfo['payRate'] = payRate;
      			betMainInfo['rebatRate'] = Number(rebatRate - Number((($('.balance-bar .range-slider-range').val() - multipleMin) / multipleBase) * 100).toFixed(1)).toFixed(1);
      			betMainInfo['unitPrice'] = unitPrice;
  	            var emptyArr = new Array($thisBall.data('pos_length'));
  	            var emptyArrLen = emptyArr.length;
  	  	        for(var j = 0; j < emptyArrLen; j++) {
  	  	          emptyArr[j] = '';
  	  	        }
  	          	var position = emptyArr;
  	            betMainInfo['positions'] = position;
  	          	if(checkPos == 'Y'){
  	              position = $thisBall.data('position').split(',');
  	  	          if(position[1].includes('|')) {
  	  	            betMainInfo['positions'].splice(position[0], 1, position[1].replace(/\|/g, ','));
  	  	          } else {
  	  	            betMainInfo['positions'].splice(position[0], 1, position[1]);
  	  	          }
  	          	}
  	            arr.push(betMainInfo);
  	        }
	  	      var map = new Object();
	  	      map['gameCode'] = gameCode;
	  	      map['summaryAmt'] = total;
	
	  	      var betSubInfo = new Object();
	  	      betSubInfo['issueNo'] = issueNo;
	  	      betSubInfo['multiple'] = 1;
	  	      arr2.push(betSubInfo);
	
	  	      map['betMainInfo'] = JSON.stringify(arr);
	
	  		  if($('#chase-radio').prop('checked')){
	  			  map['preOrder'] = true;
	  			  map['issueNoCount'] = Number($('#trace').val());
	  			  map['betSubInfo'] = JSON.stringify(preArr);
	  		  } else {
	  			  map['preOrder'] = false;
	  			  map['issueNoCount'] = 1;
	  			  map['betSubInfo'] = JSON.stringify(arr2);
	  		  }
	  		  
	  		  if($('#condition-trace').is(':checked')){
	  			  map['autoCancel'] = 2;
	  			  if($('#myconswitch').is(':checked')){
	  				  map['aclSign'] = 1;
	  			  } else {
	  				  map['aclSign'] = 0;
	  			  }
	  			  var acLimit = $('#acLimit').val();
	  			  if(acLimit == '' || isNaN(acLimit)){
	  				  acLimit = 0;
	  			  }
	  			  map['acLimit'] = acLimit;
	  		  } else if($('#trace_order').is(':checked')){
	  			  map['autoCancel'] = 1;
	  		  } else{
	  			  map['autoCancel'] = 0;
	  		  }
	  		  
	  	      getJsonData(contextPath + '/Lottery/Betting', map, bettingCallBack);
  		}
  })
}