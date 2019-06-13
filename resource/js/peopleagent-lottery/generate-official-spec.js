function getOfficialAppendJson() {
  getDomForTypeM(allType);
  flagForOpenFirstBlock = false; //控制渲染打開第一個block
}

// SubType架構 SubTypeParent -> SubTypeList -> SubTypeChild
function getDomForTypeM(response) {

  // 要把內容串在哪一個prefix區塊底下的 變數
  thisPrefixDom = "";

  // 判斷[玩法識別]的subTypeChild 要串在哪裡的flag
  targetForSubType = "";

  // 需不需要串新的playTypeM區塊 的 flag
  var playTypeMFlag = -1;
  
  $.each(response, function(entryIdx, entry) {

    // playTypeM 有改變時, 就串接新的TypeM區塊
    if (entry.playTypeM != playTypeMFlag) {
      playTypeMFlag = entry.playTypeM;
      getMainTypeDom(entryIdx, entry);

    }
    getSubTypeParentDom(entry);
    getSubTypeChildDom(entry);

      switch (entry.checkPos) {
      case 'Y':
        getClickBindFunction(entryIdx, entry);
        break;
      case 'N':
        getClickBindFunction2(entryIdx, entry);
        break;
    }
  })

}

function mappingFuction(functionName, a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
  functionArray[functionName](a1, a2, a3, a4, a5, a6, a7, a8, a9, a10);
}

function mappingFuction2(functionName, entry, playTypeM, playTypeS, payRate) {
  functionArray[functionName](entry, playTypeM, playTypeS, payRate);
}

function getMainTypeDom(entryIdx, entry){
//    $('<a />', {
//    			'class': entry.playCodeM + ' slide_list_item swiper-slide',
//    			'data-play_code_m': entry.playCodeM
//    			}
//    ).html(entry.playTypeMName)
//    .appendTo('.slide_left_list');
    
    $('<div />', {'class': 'play-type-content'})
    .append($('<div />', {'class': 'play-type-m ' + entry.playCodeM, 'data-play_code_m': entry.playCodeM})
        .append($('<span />').text(entry.playTypeMName)))
    .append($('<div />', {'class': 'play-type-s'}))
    .appendTo($('#play-type-modal'));
}

function getSubTypeParentDom(entry){
	$('<div />', {'class':'swiper-container ' + entry.playCodeS})
	.append($('<div />', {'class': 'swiper-wrapper game-body'}))
	.appendTo('.section .game');
//	
//    getSubTypeList(entry);
	
  
}

function getSubTypeList(entry){
    $('<div />', {'class':'header_swiper'})
    .append($('<div />', {'class': 'swiper-wrapper'}))
    .appendTo('.slide_right.' + entry.playCodeM + ' .header_swiper_wrap');
        
}

function changeSubType(main_type, entryId, sub_type){
  //initial 拉霸的數字顯示
   gameTypeTag = sub_type;
   var entryId = entryId;
   
   $('.' + main_type + ' .playsubtype-list li').each(function() {
     if($(this).data('entry_id') == entryId) {
       $(this).addClass('on');
     } else {
       $(this).removeClass('on');
     }
   })
  
  $(".play-block").each(function(){
      
      if($(this).data('entry_id') == entryId){
          $(this).show();
      }else{
          $(this).hide();
      }
      
  });
  resetChoose();
  getJsonData(contextPath + "/GameInfo/PayRate", {'gameCode': gameCode}, payRateCallBack);
  getExamAndDesc(entryId);
}

function getExamAndDesc(entryId) {
  var map = new Object();
  map['playTypeM'] = $(".play-block[data-entry_id='" + entryId + "']").data('play_type_m');
  if($(".play-block[data-entry_id='" + entryId + "']").data('play_type_s') != undefined) map['playTypeS'] = $('.play-block[data-entry_id=' + entryId + ']').data('play_type_s');
  getJsonData(contextPath + '/Lottery/GetExamAndDesc', map, function(response) {
    $('.rule .example').empty().text(response.data.example);
    $('.rule .description').empty().text(response.data.description);
  });
}

function getSubTypeChildDom(entry){
    //確認是 玩法識別 還是 position 識別
    var checkPos = entry.checkPos;
    
    //區塊的className 跟 Id  依照識別方式不同  串接方式也不同     玩法識別用 playCodeS, position 用 playCodeM + '-' + id
    var classAndId = "";
    var targetListIdx = 0;
    switch(checkPos){
    case "Y":
        classAndId = entry.playCodeS;
        
        targetListIdx = $('.slide_right.' + entry.playCodeM + '.header_swiper .swiper-wrapper').length;
        
        $('.play-type-m.' + entry.playCodeM)
        .siblings('.play-type-s')
        .append($('<div />', {'class': entry.playCodeS, 'data-entry_id': entry.id})
            .append($('<span />').text(entry.playTypeSName)));
        
//        $('<div />', {'class': entry.playCodeS + ' swiper-slide', 'data-entry_id': entry.id}).html(entry.playTypeSName)
//        .appendTo('.slide_right.' + entry.playCodeM + ' .header_swiper_wrap .header_swiper .swiper-wrapper');
        
        
        getGameContentForPos(entry, classAndId);
        
      //加入gameTypeArray
        if(gameTypeArray[entry.playCodeM] == undefined){
            gameTypeArray[entry.playCodeM] = [entry.playCodeS];
        } else {
            gameTypeArray[entry.playCodeM].push(entry.playCodeS);
        }

        
        break;
 
    case "N":
        classAndId = entry.playCodeM;
        
        targetListIdx = $('.slide_right.' + entry.playCodeM + '.header_swiper .swiper-wrapper').length;
        
        //玩法識別 , 如果有pos0Prefix 欄位, 代表是一個新的區塊 需要接上新區塊 , 並切換content元素要穿街的目標
        if(entry.hasOwnProperty('pos0Prefix')){
            $('.play-type-m.' + entry.playCodeM)
            .siblings('.play-type-s')
            .append($('<div />', {'class': entry.playCodeS, 'data-entry_id': entry.id})
                .append($('<span />').text(entry['pos0Prefix'])));
            
            targetForSubType = classAndId;
            
            thisPrefixDom = $('<div />', {'class':'bet_panel_content bet_panel_content_official ' + entry.playCodeS})
            .append($('<div />', {'class':'panel_wrap m-0'}));
            
            //有pos0Prefix 欄位, 代表也要串上一個preFixContainer 包覆多個entry
            getPrefixListContainer(entry, classAndId);
        } 
        getGameContentForPlayType(entry, classAndId, thisPrefixDom);
        
      //加入gameTypeArray, 玩法識別的TypeArray內容 用playCodeM, 並切只push一次
        if(gameTypeArray[entry.playCodeM] == undefined){
            gameTypeArray[entry.playCodeM] = [entry.playCodeM];
        } else if(!gameTypeArray.hasOwnProperty(entry.playCodeM)){
            gameTypeArray[entry.playCodeM].push(entry.playCodeM);
        }

        break;
     
    default:    
    }

}

function getGameContentForPos(entry, classAndId){
    var posPrefixSize = 0;
    
    //一般看pos的玩法, 一個entry 都是一個prefixContainer
    getPrefixListContainer(entry, classAndId);
    
    //判斷該 entry 有幾個prefix 需要串接
    for(var i = 0; i < 10; i++) {
        if(entry.hasOwnProperty('pos' + i + 'Prefix')) {
            //posPrefixSize > 1 代表是时时彩的选位玩法, <= 1 是一般玩法
            posPrefixSize = entry['pos' + i + 'Prefix'].split(',').length;
            if(posPrefixSize <= 1){
                thisPrefixDom = $('<div />', {'class':'bet_panel_content bet_panel_content_official ' + entry.playCodeS + '-' + i})
                    .append($('<div />', {'class':'classification'})
                        .append($('<span />').html(entry['pos' + i + 'Prefix'])))
                    .append($('<div />', {'class':'panel_wrap'}));
                
                for(var j = 0; j < entry['pos' + i + 'Content'].split(',').length; j++){
                    thisPrefixDom.find('.panel_wrap')
                            .append($('<div />', {'class': 'bet_panel_content_item_official', 'onClick': 'CheckNumThis(this)', 'data-pos_data':entry['pos' + i +'Data'].split(',')[j]})
                            .append($('<div />', {'class': 'normal-ball'}).html(entry['pos' + i + 'Content'].split(',')[j])))
                }
                
                thisPrefixDom.appendTo('#' + entry.playCodeS);
                if(entry.fastChoose){
                    getFasterBet(entry, i);
                }
            } else {
            	thisPrefixDom = $('<div />', {'class':'special'})
	                .append($('<div />', {'class':'special_option_wrap'})
                			.append($('<div />', {'class':'special_option'})));

                for(var j = 0; j < entry['pos' + i + 'Prefix'].split(',').length; j++){
                    thisPrefixDom.find('.special_option_wrap .special_option').first()
                    	.append($('<label />')
                    		.append($('<input />', {'style': 'width:20px;', 'type': 'checkbox', 'value': entry['pos' + i + 'Data'].split(',')[j]}))
		                    .append($('<span />', {'class': 'special_option_item'}).html(entry['pos' + i + 'Prefix'].split(',')[j])));
                }
                
                thisPrefixDom.appendTo('#' + entry.playCodeS);
                thisPrefixDom.find('.special_option_wrap').first()
                		 .after($('<div />', {'class':'special_option_text'})
                         .append($('<font />').html('温馨提示：您选择了'))
                         .append($('<span />', {'class':'position color-red'}).html(0))
                         .append($('<font />').html('个位置﹐系统自动根据组合成 '))
                         .append($('<span />', {'class':'plan color-red'}).html(0))
                         .append($('<font />').html('方案')));
            }
        } else {
            break;
        }
    }
}

function getFasterBet(entry, i) {
//生成快投
  $('.' + entry.playCodeS + '-' + i + ' .panel_wrap')
  .before($('<div />', {'class':'bet_option_wrap'})
  .append($('<div />', {'class':'option_slide_wrap'})
          .append($('<div />', {'class':'option_slide'})
                  .append($('<span />').on('click', function(){checkAll(this)}).text('全'))
                  .append($('<span />').on('click', function(){checkBig(this)}).text('大'))
                  .append($('<span />').on('click', function(){checkSmall(this)}).text('小'))
                  .append($('<span />').on('click', function(){checkSingular(this)}).text('单'))
                  .append($('<span />').on('click', function(){checkDouble(this)}).text('双'))
                  .append($('<span />').on('click', function(){checkClear(this)}).text('清')))));
}

function getGameContentForPlayType(entry, classAndId, thisPrefixDom){
    var entryId = entry.id;
//    thisPrefixDom.find('.panel_wrap')
//    .append($('<div />', {'class': 'bet_panel_content_item_official', 'onClick': 'CheckNumThis(this)', 'data-play_type_s': entry.playTypeS})
//    .append($('<div />').html(entry['playTypeSName'].split('-').pop())));
    
    thisPrefixDom.find('.panel_wrap')
    .append($('<div />', {'class': 'res-wrap'})
    		.append($('<div />', {'class': 'bet_panel_content_item_official', 'onClick': 'CheckNumThis(this)', 'data-play_type_s': entry.playTypeS})
    				.append($('<div />').html(entry['playTypeSName'].split('-').pop()))));
    
    thisPrefixDom.appendTo(".bet_panel_wrapper[data-entry_id='" + entryId + "']");
}

function getPrefixListContainer(entry, classAndId){
    var entryId = entry.id;
    var checkPos = entry.checkPos;
    var playTypeM = entry.playTypeM;
    var playTypeS = entry.playTypeS;
    
    var $infoRow = $('<div />', {'class': 'info-row', 'id': entry.playCodeS + '-info'})
    	.append($('<div />', {'class': 'game-rule'})
    			.append($('<span />', {'class':'ico'})
    					.append($('<i />', {'class': 'fas fa-question'})))
    			.append($('<span />').html('玩法说明'))
    			.append($('<span />', {'class':'pop'}).html(entry.prompt)));
    
    $infoRow.appendTo('.' + entry.playCodeS + ' .game-body');
    
    var $cont = $('<div />', {'class': 'bet_panel_wrapper ' + classAndId, 'id': classAndId, 'data-play_type_m': playTypeM, 'data-check_pos': checkPos, 'data-entry_id': entryId});
    if(checkPos == "Y"){
        $cont.attr('data-play_type_s',playTypeS);
    }
    $cont.appendTo('.' + entry.playCodeS + ' .game-body');
}

function openFirstBlock(){
    if(flagForOpenFirstBlock == false) {
      $('.play-type-s').first().find('div').first().find('span').click();
      flagForOpenFirstBlock = true;
    }
}

function changeElement(){
  $('.play-type-s > div').on('click', 'span', function(e) {
	$('.focus').removeClass('focus');
	$('.option_focus').removeClass('option_focus');
	$('.bet_box .bet_count').text(0);
    $('.play-type-m').removeClass('active');
    $('.play-type-s > div').removeClass('active');
    var m = $(e.delegateTarget).parent().siblings('.play-type-m');
    m.addClass('active');
    $(e.delegateTarget).addClass('active');
    var id = $(e.delegateTarget).data('entry_id');
    $('.swiper-container').hide();
    $('[data-entry_id=' + id + ']').closest('.swiper-container').show();
    $('.playtype-list .m-name').text(m.find('span').text());
    $('.playtype-list .s-name').text($(this).text());
    layer.closeAll();
    
    $('.balance-bar .range-slide-left span:nth-child(1)').text(multipleMax);
    $('.balance-bar .range-slide-left span:nth-child(2) font').text('0');
    $('.balance-bar .range-slide-right').empty();
    if($(".swiper-container:visible [data-check_pos='N']").length == 0) {
      var payRate = $('[data-entry_id=' + id + ']').closest('.swiper-container').find('.pay_rate').data('pay_rate_max');
      $('[data-entry_id=' + id + ']').closest('.swiper-container').find('.pay_rate').data('pay_rate', Math.floor(Number(multipleMax * payRate * 10000 / multipleBase)) / 10000);
      var payRate2 = $('[data-entry_id=' + id + ']').closest('.swiper-container').find('.pay_rate').data('pay_rate2_max');
      $('[data-entry_id=' + id + ']').closest('.swiper-container').find('.pay_rate').data('pay_rate2', Math.floor(Number(multipleMax * payRate2 * 10000 / multipleBase)) / 10000);
      if(typeof payRate2 != 'undefined') {
        $('.balance-bar .range-slide-right')
        .append($('<span />').text(Math.floor(Number(multipleMax * payRate * 10000 / multipleBase)) / 10000))
        .append($('<span />').text(Math.floor(Number(multipleMax * payRate2 * 10000 / multipleBase)) / 10000));
      } else {
        $('.balance-bar .range-slide-right')
        .append($('<span />').text(Math.floor(Number(multipleMax * payRate * 10000 / multipleBase)) / 10000));
      }
    } else {
      $.each($('.swiper-container:visible .SUM_payRate'), function(entryIdx, entry) {
        $(this).text(Math.floor(Number(multipleMax * $(this).data('pay_rate_max') * 10000 / multipleBase)) / 10000);
      });
    }
    $('.balance-bar .range-slider-range').attr('min', multipleMin).attr('max', multipleMax);
    $('.balance-bar .range-slider-range').val(multipleMax);
  });
  
  $('.playtype-list').click(function() {
    layer.open({
      type : 1,
      title : false,
      shade : 0.8,
      area: ['90vw', '70vh'],
      shadeClose : true,
      id : 'LAY_layuipro', //设定一个id，防止重复弹出
      content : $('#play-type-modal')
    });
  });
  
}

function changeBallStyle(){
    $.each(ballStyle[0], function(className, typeOb){
        $.each(typeOb, function(entryIdx, entry){
            if(!entry.hasOwnProperty("pos")){
                var start = parseInt(entry.playTypeS.split(',')[0]);
                var end = parseInt(entry.playTypeS.split(',')[1]);
                for(var i = start; i <= end; i++){
                    $("[data-play_type_m='" + entry.playTypeM + "']")
                    .find("[data-play_type_s='" + i + "']")
                    .addClass(className);
                }
            } else {
            	var $posElement = $("[data-play_type_m='" + entry.playTypeM + "'][data-play_type_s='" + entry.playTypeS + "']");  
                if(!entry.hasOwnProperty("posColorOrder")){
                	$posElement
                    .find(".panel_wrap > div")
                    .addClass(className);
                } else {
                	$.each(entry.posColorOrder, function(posColorIdx, posColorEntry){
                		$posElement
                        .find(".panel_wrap > div:eq(" + posColorEntry + ")")
                        .addClass(className);
                	})
                }
                
            }
        })
    })
}

function bindPopup(){
  $('.game-rule').on('click', function(e){
    e.stopPropagation();
	$(this).find('.pop').stop().fadeToggle();
	switchRule($(this));
  });
	
  function switchRule(e){
    if(e.find('.pop').css('display') !== 'none'){
  	  $('body').addClass('open-rule');
  	  $('.open-rule').on('click', function(){
  	    e.find('.pop').stop().fadeOut();
  		$('.open-rule').off('click');
  		$('body').removeClass('open-rule');
  	  })	
  	} else {
  	    $('body').removeClass('open-rule');
  	}
  }
}

function afterAppendDom(response){
    //切換玩法的event
    changeElement();
    
    //滑動
//	callSwiper();
    
  //改變某些球的css
    changeBallStyle();
    
  //把第一個玩法相關dom打開
    openFirstBlock();
    
  //popup event
    bindPopup();
}