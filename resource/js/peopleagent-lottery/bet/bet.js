var planGameType = ['AC2-P-Sum', 'AC2-C', 'AC2-C-Sum', 'AC3-P-Sum', 'AC3-C3', 'AC3-C6', 'AC3-C-Sum', 'AC4-C24', 'AC4-C12', 'AC4-C6', 'AC4-C4'];
var bsoeGameType = ['BSOE-F1', 'BSOE-F2', 'BSOE-L2', 'BSOE-F3', 'BSOE-L3'];

function planName(name) {
  var tmpName = name.split(',');
  var returnName = [];
  
  for(var i = 0; i < tmpName.length; i++) {
      switch(tmpName[i]) {
          case 'P1':
              returnName.push('万位');
              break;
          case 'P2':
              returnName.push('千位');
              break;
          case 'P3':
              returnName.push('百位');
              break;
          case 'P4':
              returnName.push('十位');
              break;
          case 'P5':
              returnName.push('个位');
              break;
      }
  }
  
  return returnName;
}

function bsoeName(name) {
  var tmpName = name.split(',');
  var returnName = [];
  
  for(var i = 0; i < tmpName.length; i++) {
    switch(tmpName[i]) {
      case 'B':
        returnName.push('大');
        break;
      case 'S':
        returnName.push('小');
        break;
      case 'O':
        returnName.push('单');
        break;
      case 'E':
        returnName.push('双');
        break;
    }
  }
  
  return returnName;
}

function defaultValue(param) {
  if(typeof param === "undefined") param = -1;
  return param;
}

function getClickBindFunction(entryIdx, entry) {
  var positionArray = {positionTmp1: [], positionTmp2: [], positionTmp3: [], positionTmp4: [], positionTmp5: [], positionTmp6: [], positionTmp7: [], positionTmp8: [], positionTmp9: [], positionTmp10: []};
  
  if(entry['pos0Prefix'].split(',').length > 1) {
    $('.' + entry.playCodeS + ' input').click(function() {
      planTmp = [];
      $('.' + entry.playCodeS + ' .position').text($('.' + entry.playCodeS + ' input:checked').length);
      $('.' + entry.playCodeS + ' .plan').text(getFushiZuheShu(limit[entry.playCodeS].plan, $('.' + entry.playCodeS + ' input:checked').length));
      
      $('.' + entry.playCodeS + ' input').each(function() {
        if($(this).prop('checked')) {
          planTmp.push($(this).val());
        } else {
            for(var i = 0; i < planTmp.length; i++) {
                if(planTmp[i] == $(this).val()) {
                    planTmp.splice(i, 1);
                }
            }
        }
      })
    });
  }
  
  $('.' + entry.playCodeS).on('click', '.bet_panel_content_item_official, .option_slide, .special_option' ,function(obj) {
    if(entry['pos0Prefix'].split(',').length <= 1) {
      var x = 0;
    } else {
      var x = 1;
    }
    
    var aArray = {a1: [], a2: [], a3: [], a4: [], a5: [], a6: [], a7: [], a8: [], a9: [], a10: []};
    
    while($('.' + entry.playCodeS + '-' +　x).length > 0) {
      if(limit[entry.playCodeS].exclude == 'y') {
        if($(this).closest('.' + entry.playCodeS + '-' + x).length == 0) {
          $('.' + entry.playCodeS + '-' + x + ' [data-pos_data=' + $(this).data('pos_data') + ']').removeClass('focus');
        }
      }
      
      if(limit[entry.playCodeS].max != Number.MAX_SAFE_INTEGER) {
        if($('.' + entry.playCodeS + '-' +　x +　' .bet_panel_content_item_official.focus').length > limit[entry.playCodeS].max && x != defaultValue(limit[entry.playCodeS].noMaxPosition)) {
          $('.' + entry.playCodeS + ' [data-pos_data=' + positionArray['positionTmp' + (x + 1)][0] + ']').removeClass('focus');
          positionArray['positionTmp' + (x + 1)].shift();
          $('.' + entry.playCodeS + '-' + x + ' .bet_panel_content_item_official.focus').each(function() {
              if(positionArray['positionTmp' + (x + 1)].indexOf($(this).data('pos_data')) == -1) {
                positionArray['positionTmp' + (x + 1)].push($(this).data('pos_data'));
              }
          });
        } else {
          positionArray['positionTmp' + (x + 1)] = [];
          $('.' + entry.playCodeS + '-' + x + ' .bet_panel_content_item_official.focus').each(function() {
            positionArray['positionTmp' + (x + 1)].push($(this).data('pos_data'));
          });
        }
      }
      
      $('.' + entry.playCodeS + '-' + x + ' .bet_panel_content_item_official.focus').each(function() {
        aArray['a' + (x + 1)].push($(this).data('pos_data'));
      });
      x++;
    }
    
    mappingFuction('betOrder' + entry.playCodeS.replace(/\-/g, '_'), aArray.a1, aArray.a2, aArray.a3, aArray.a4, aArray.a5, aArray.a6, aArray.a7, aArray.a8, aArray.a9, aArray.a10);
  });
}

function getClickBindFunction2(entryIdx, entry) {
  $("." + entry.playCodeS).click(function() {
    sarray = [];

    $("." + entry.playCodeS + " .bet_panel_content_item_official.focus").each(function() {
      mappingFuction2('betOrder' + entry.playCodeM.replace('-', '_'), entry, $(this).closest('.' + entry.playCodeM).data('play_type_m'), $(this).data('play_type_s'), $(this).find('.SUM_payRate').text());
    });
  });
}

$(function() {
  $('.submit').click(function(){
	  if(login == "false") {
    	var title = $('.title-text').text();
		var modalIssueNo = $('#issueNo').text();
		var content = '请先进行登录';
		normalModal(warningModal, title, modalIssueNo, content, goLogin);
      return;
    }
    if(parseInt($('.bet-quantity').text()) > 0){
      layer.msg('下注中 祝您中奖!', {
        icon : 16,
        shade : 0.01
      });
      var submitMode = $(this).data('submit');
      arr = [], arr2 = [], mergeArr = [];
      if(type != 1) {
        for (var i = 0; i < position.length; i++) {
    	  var $elementBlock = $('.bet_panel_content_item_official.focus:eq(0)').parents('.bet_panel_wrapper');
    	  var $infoRow = $elementBlock.siblings('.info-row');
          var betMainInfo = new Object();
          betMainInfo['playTypeM'] = $elementBlock.data('play_type_m');
          betMainInfo['playTypeS'] = $elementBlock.data('play_type_s');
          betMainInfo['positions'] = position[i];
          betMainInfo['quantity'] = quantity;
          betMainInfo['payRate'] = $infoRow.find('.pay_rate').data('pay_rate');
          betMainInfo['payRate2'] = $infoRow.find('.pay_rate').data('pay_rate2');
          betMainInfo['rebatRate'] = Number(rebatRate - Number((($('.balance-bar .range-slider-range').val() - multipleMin) / multipleBase) * 100).toFixed(1)).toFixed(1);
          switch(submitMode){
          case 'now':
			var unitPrice = $('.bet_box .bet_value').val();
			break;
				
          case 'detail':
			var unitPrice = $('#bet_input').val();
			break;
          }
          betMainInfo['unitPrice'] = unitPrice;
        }
        arr.push(betMainInfo);
        mergeArr = arr;
      } else {
        switch(submitMode){
          case 'now':
    	    for(var i = 0; i < sarray.length; i++) {
              sarray[i].unitPrice = $('.bet_box .bet_value').val();
            }
			break;
				
          case 'detail':
        	for(var i = 0; i < sarray.length; i++) {
              sarray[i].unitPrice = $('#bet_input').val();
            }
			break;
        }
        mergeArr = sarray;
      }
      
      var map = new Object();
      var betSubInfo = new Object();
	      betSubInfo['issueNo'] = issueNo;
	      betSubInfo['multiple'] = 1;
	      arr2.push(betSubInfo);
	  
      map['gameName'] = gameCode_gameName[gameCode];
      map['gameCode'] = gameCode;
      map['betMainInfo'] = JSON.stringify(mergeArr);
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
	  
	  
      switch(submitMode){
      case 'now':
		map['summaryAmt'] = $('.bet_box .bet_count').html() * $('.bet_box .bet_value').val();
  		break;
  			
  	  case 'detail':
  		map['summaryAmt'] = $('.bet-total-amount').html().replace(/¥/g, ' ').trim();
  		break
  	  }
      
      getJsonData(contextPath + '/Lottery/Betting', map, bettingCallBack);
    } else {
    	title = $('.title-text').text();
		modalIssueNo = $('#issueNo').text();
		content = '您还未选择';
		normalModal(warningModal, title, modalIssueNo, content);
    }
  })
})