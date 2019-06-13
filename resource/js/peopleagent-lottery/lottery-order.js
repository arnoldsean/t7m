$(function(){
	input_event();
	ui_switch_block();
	checkPreorder();
	if(playMode == 'credit'){
		creditOrderEvent();
	}
	$('.order_title').add('.lottery_type_content').text(gameCode_gameName[gameCode])
})

function ui_switch_block(){
	$('#chase-radio').change(function(){
		if($('#chase-radio').prop('checked')){
			$('.disable_ui_switch').css('display','block');
			getPreorderData();
		} else {
			mappingInitial();
		}
	})
	
	$('#trace_order').on('change', function(){
		if(!$(this).prop('checked')){
			$('.condition').css('display','none');
			$('#condition-trace').prop('checked', false);
		}
	})
	
	$('#condition-trace').on('change', function(){
		if($(this).prop('checked')){
			$('#trace_order').prop('checked', true);
			$('.condition').css('display','flex');
		} else {
			$('.condition').css('display','none');
		}
	})
}

function input_event(){
	$('.numDecX').on('touchstart', function(e){
		e.stopImmediatePropagation();
		var value = $(this).next().find('input').val();
		if(value <= 1){
			return;
		}
		$(this).next().find('input').val(parseInt(value) - 1);
		getPreorderData();
	})
	
	$('.numAddX').on('touchstart', function(e){
		e.stopImmediatePropagation();
		var value = $(this).prev().find('input').val();
		if($(this).prev().find('input').attr('id') == 'trace' && value >= 50) return;
		$(this).prev().find('input').val(parseInt(value) + 1);
		getPreorderData();
	})
	
	$('#bet_input').keyup(function(){
		if($('#chase-radio').is(':checked')){
			countAmtAndUpdateParam();
		} else {
			var bet_money = $('#bet_input').val();
			var bet_count = parseInt($('.mid_item_div span.order-qu').text());
			var bet_total = bet_money * bet_count;
			if(isNaN(bet_total)){
				bet_total = 0;
			}
			$('#bet-total-amount').text('¥ ' + (bet_total));
		}
	})
	
	$("#trace").on("change", function() {

		if(diffEndIssueNo < $(this).val() || $(this).val() > 50) {
			var title = gameCode_gameName['${gameCode}'];
			var content = '最大追单期数: ' + (diffEndIssueNo > 50 ? 50 : diffEndIssueNo);
  		normalModal(warningModal, title, '', content);
			$("#trace").val(diffEndIssueNo > 50 ? 50 : diffEndIssueNo);
		} else if($(this).val() < 1) {
		  $(this).val(1);
		}
		
		getPreorderData();
	});
	
	$('#multiple').on('change', function(){
	  if($(this).val() < 1 || $(this).val() == '' || isNaN($(this).val())){
	  	$(this).val(1);
	  	return;
	  }
	  modifyMultiple();
	  mappingAmt();
	})
	
	$('.numAddY').on('touchstart', function() {
		  $('#multiple').val(parseInt($('#multiple').val()) + 1);
		  modifyMultiple();
		  mappingAmt();
		});
		
	$('.numDecY').on('touchstart', function() {
	  $('#multiple').val(parseInt($('#multiple').val()) - 1);
	  
	  if($('#multiple').val() < 1) {
	    $('#multiple').val(1);
	  }
	  modifyMultiple();
	  mappingAmt();
	});
	
}

function getPreorderData() {
	  
	  $('.order-start').nextAll().remove();
	  
	  if(diffEndIssueNo < parseInt($('#trace').val())) {
	    $('#trace').val(diffEndIssueNo);
	  }
	  
	  for(var i = 0; i < parseInt($('#trace').val()); i++) {
		  $('<div />', {'class':'order_view_bet_data_item ui_switch'})
			.append($('<div />', {'class':'ui_switch_title'})
					.append($('<span />',{'class':'issueNo'}).text(parseInt(issueNo) + i)).append('期'))
			.append($('<div />', {'class':'ui_switch_content'})
					.append($('<span />',{'class':'mark numDec'}).text('-'))
					.append($('<span />')
							.append($('<input />', {'type':'number','class':'quantity','style':'color:#ef4f4f','min':'1','value':'1','placeholder':'1'})))
					.append($('<span />',{'class':'mark numAdd'}).text('+')))
		.appendTo($('.disable_ui_switch'));
		  $('.order_data_issue.' + i).text('期号:' + (parseInt(issueNo) + i));
	    $('#multiple').val(1);
	  }
	  
	  $('.numAdd').on('touchstart', function() {
	      $(this).prev().find('.quantity').val(parseInt($(this).prev().find('.quantity').val()) + 1);
	      mappingAmt();
		});
  	
  	$('.numDec').on('touchstart', function() {
  	  $(this).next().find('.quantity').val(parseInt($(this).next().find('.quantity').val()) - 1);
  	  
  	  if($(this).next().find('.quantity').val() < 1) {
  	    $(this).next().find('.quantity').val(1);
  	  }
  	mappingAmt();
  	});
  	
  	$('.quantity').on('keyup', function(){
		if($(this).val() < 1 || $(this).val() == '' || isNaN($(this).val())){
			$(this).val(1);
			return;
		}
		mappingAmt();
  	})
		
		mappingAmt();
	}


function mappingInitial(){
	if(playMode == 'official'){
		officialInitial();
	} else {
		creditInitial();
	}
}

function officialInitial(){
	$('.disable_ui_switch').css('display','none');
	$('.data_wrap').remove();
	appendDom();
	var bet_money = $('#bet_input').val();
	var bet_count = parseInt($('.mid_item_div span.order-qu').text());
	var bet_total = bet_money * bet_count;
	if(isNaN(bet_total)){
		bet_total = 0;
	}
	$('.bet-total-amount').text('¥ ' + (bet_total));
}

function creditInitial(){
	$('.disable_ui_switch').css('display','none');
	var total = 0;
	$('.bet_data_input input.on').each(function(){
	  total += parseInt($(this).val());
	})
	
	var $totalAmount = $('#bet-total-amount');
	$totalAmount.text('¥ ' + total);
	
}

function mappingAmt(){
	if(playMode == 'official'){
		countAmtAndUpdateParam();
	} else {
		countAmtAndUpdateParam2();
	}
}

function countAmtAndUpdateParam() {
	  var bet_count = parseInt($('.mid_item_div span.order-qu').text());
	  if($('#chase-radio').is(':checked')){
		  var i = 0;
		  preArr = [];
		  $('.quantity').each(function() {
		    i += parseInt($(this).val());
		  });
		  $('#bet-total-amount').text('¥ ' + (Number($('#bet_input').val()) * bet_count * i));
		  
		  $('.order-start').nextAll().each(function() {
		    var betSubInfo = new Object();
			betSubInfo['issueNo'] = $(this).find('.issueNo').text();
			betSubInfo['multiple'] = $(this).find('.quantity').val();
			preArr.push(betSubInfo);
		  });
	  } else {
		  ('#bet-total-amount').text('¥ ' + (Number($('#bet_input').val()) * bet_count));
	  }
	  
	}

function countAmtAndUpdateParam2(){
	var total = 0;
	$('.bet_data_input input.on').each(function(){
	  total += parseInt($(this).val());
	})
	
	if(total == '' || total == 0 || isNaN(total)){
		total == 0;
		return false;
	}
	
	var $totalAmount = $('#bet-total-amount');
	if($('#chase-radio').is(':checked')){
		var i = 0;
	    preArr = [];
		$('.quantity').each(function() {
		  i += parseInt($(this).val());
		});
		$totalAmount.text('¥ ' + total * i);
	    $('.order-start').nextAll().each(function() {
		  var betSubInfo = new Object();
		  betSubInfo['issueNo'] = $(this).find('.issueNo').text();
		  betSubInfo['multiple'] = $(this).find('.quantity').val();
		  preArr.push(betSubInfo);
		});
	} else {
		$totalAmount.text('¥ ' + total);
	}
	
}
	
function modifyMultiple() {
	  var multiple = 1;
	  $('.order-start').nextAll().each(function() {
	    $(this).find('.quantity').val(multiple);
	    multiple = multiple * parseInt($('#multiple').val());
	  });
	}
	
function checkPreorder(){
	var checkGameCode = ['hk6', 'fc3d', 'pl3', 'qxc'];
	if($.inArray('${gameCode}',checkGameCode) > -1){
		$('.preorder').css('display','none');
	}
}

function creditOrderEvent(){
	$('#apply').on('touchstart', function(){
		var value = $('#apply_value').val();
		if(value != '' && !isNaN(value)){
			$('.bet_data_input input').val(value).addClass('on');
		} else {
			return;
		}
		
		if($('#chase-radio').is(':checked')){
			mappingAmt();
		} else {
			$('#bet-total-amount').text('¥ ' + value * $('.bet_data_input input').length);
		}
		
	})
	
	$('.bet_page').on('keyup paste', 'input', function(){
		if($(this).val().length == 1){
			$(this).val($(this).val().replace(/[^1-9]/g,''));
		} else {
			$(this).val($(this).val().replace(/\D/g,''));
		}
		
		var inputTotal = 0;
		var inputLen = $('.bet_data_input input').length;
		for(var i = 0; i < inputLen; i++){
			var $thisInput = $('.bet_data_input input').eq(i);
			if($thisInput.val() != "" &&  $thisInput.val() != 0){
				inputTotal += parseInt($thisInput.val());
				$thisInput.addClass('on');
			} else {
				$thisInput.removeClass('on');
			}
		}
		if($('#chase-radio').is(':checked')){
			mappingAmt();
		} else {
			$('.mid_item_div span').eq(1).text('¥ ' + inputTotal);
		}
		
	})
	
	$('#apply_value').on('change', function(){
		if($(this).val() < 1 || $(this).val() == '' || isNaN($(this).val())){
			var betValue = $('.bet_value').val();
			$(this).val(betValue);
		}
	})
}