function getCreditAppendJson() {
  getDomForTypeM(allType);
}

//SubType架構          SubTypeParent -> SubTypeList -> SubTypeChild
function getDomForTypeM(response){
    
    //要把內容串在哪一個prefix區塊底下的 變數
    thisPrefixDom = "";
    
  //判斷[玩法識別]的subTypeChild 要串在哪裡的flag
    targetForSubType = "";
    
    //需不需要串新的list 的 flag
    subTypeChildCount = 0;
    
    //需不需要串新的playTypeM區塊  的 flag
    var playTypeMFlag = -1;
    
    getTagDom();
    
    //to do faster amount and rule
    
    $.each(response, function(entryIdx, entry){
        
        //playTypeM 有改變時, 就串接新的TypeM區塊
        if(entry.playTypeM != playTypeMFlag){
            playTypeMFlag = entry.playTypeM;
            
            subTypeChildCount = 0;
            getMainTypeDom(entryIdx, entry);
        }
//        
        getSubTypeChildDom(entryIdx, entry);
    })
    
}

function getTagDom() {
  $.each(tag, function(entryIdx, entry) {
    $('<div />', {'class': 'play-type-content credit-type'})
    .append($('<div />', {'class': 'play-type ' + entry.playCodeM, 'data-tag_m': entry.playCodeM})
    		.append($('<div />')
    				.append($('<span />').text(entry.tagName))))
    .appendTo($('#play-type-modal'));
    getTabBlock(entry);
    
    if(entry.hasOwnProperty('triangleMax')) {
      triangleCount = entry.triangleMax;
    }
  });
}

function getMainTypeDom(entryIdx, entry){
  var belong = tag.filter(function(item) { return $.inArray(entry.playTypeM, item.playTypeM) > -1;});
  for(var x = 0; x < belong.length; x++) {
      switch(entry.checkPos) {
      case "Y":
          for(var i = 0; i < 10; i++) {
              if(belong[x].hasOwnProperty('posContent')) {
                if($.inArray(i, belong[x].posContent) == -1) {
                  continue;
                }
              }
              
	          if(entry.hasOwnProperty('pos' + i + 'Prefix')) {
	            $('<div />', {'class': 'bet_panel_content', 'data-check_pos': entry.checkPos, 'data-play_type_m': entry.playTypeM, 'data-pos': i, 'data-tag': belong[x].tagPage})
	            .appendTo($('.' + belong[x].playCodeM + ' .bet_panel_wrapper'));
	          }
            }
        break;
      case "N":
        if(belong[x].hasOwnProperty('TriangleMax')) {
        	$('<div />', {'class': 'bet_panel_content dt', 'data-check_pos': entry.checkPos, 'data-play_type_m': entry.playTypeM, 'data-pos': i, 'data-tag': belong[x].tagPage})
            .appendTo($('.' + belong[x].playCodeM + ' .bet_panel_wrapper')); 
        } else if(belong[x].hasOwnProperty('bac')){
            var bac = belong[x].bac;
            $('<div />', {'class': 'bet_panel_content bac', 'data-check_pos': entry.checkPos, 'data-play_type_m': entry.playTypeM, 'data-pos': i, 'data-tag': belong[x].tagPage})
            	.append($('<div />', {'class':'bet_panel_content_item list-1 player', 'data-bac': bac[0]}))
            	.append($('<div />', {'class':'bet_panel_content_item list-1 tie', 'data-bac': bac[1]}))
            	.append($('<div />', {'class':'bet_panel_content_item list-1 banker', 'data-bac': bac[2]}))
            	.append($('<div />', {'class':'bet_panel_content_item list-2 player', 'data-bac': bac[3]}))
            	.append($('<div />', {'class':'bet_panel_content_item list-2 banker', 'data-bac': bac[4]}))
        	.appendTo($('.' + belong[x].playCodeM + ' .bet_panel_wrapper'));
        } else {
        	$('<div />', {'class': 'bet_panel_content', 'data-check_pos': entry.checkPos, 'data-play_type_m': entry.playTypeM, 'data-pos': i, 'data-tag': belong[x].tagPage})
            .appendTo($('.' + belong[x].playCodeM + ' .bet_panel_wrapper'));
        }
        break;
      }
  }
}

function getTabBlock(entry){
	$('<div />', {'class':'swiper-container ' + entry.playCodeM, 'id': entry.playCodeM})
	.append($('<div />', {'class': 'swiper-wrapper game-body'}))
	.appendTo('.section .game');
	
	getBetPanelWrapper(entry)
	
}


function getSubTypeChildDom(entryIdx, entry){
  var belong = tag.filter(function(item) { return $.inArray(entry.playTypeM, item.playTypeM) > -1;});
  for(var x = 0; x < belong.length; x++) {
//    var colspan = Object.keys(belong[x].lengthSpec).find(key => $.inArray(entry.playTypeM, belong[x].lengthSpec[key]) > -1);
      switch(entry.checkPos) {
      case "Y":
        for(var i = 0; i < 10; i++) {
          if(belong[x].hasOwnProperty('posContent')) {
              if($.inArray(i, belong[x].posContent) == -1) {
                continue;
              }
            }
          if(entry.hasOwnProperty('pos' + i + 'Prefix')) {
        	  var content = entry['pos' + i + 'Content'].split(',');
              var contentData = entry['pos' + i + 'Data'].split(',');
              for(var j = 0; j < content.length; j++) {
                $('[data-play_type_m=' + entry.playTypeM + '][data-pos=' + i + '][data-tag=' + belong[x].tagPage + ']')
                .append($('<div />', {'class':'bet_panel_content_item', 'data-play_type_s':entry.playTypeS, 'data-position': i + ',' + contentData[j], 'data-pos_length': entry.posLength})
                		.append($('<div />', {'class':'t-text'}).text(content[j])))
                    
                
                subTypeChildCount++;
              }
          }
        }
        subTypeChildCount = 0;
        break;
      case "N":
        if(belong[x].hasOwnProperty('TriangleMax')) {
        	if(subTypeChildCount % 3 == 0){
    		$('[data-play_type_m=' + entry.playTypeM + '][data-tag=' + belong[x].tagPage + ']')
    	        .append($('<div />', {'class':'dt-wrap'})
    	        		.append($('<div />', {'class':'dt-header'}).text(entry.playTypeSName.split('-').pop()))
    	        		.append($('<div />', {'class':'dt-content'})))
        	}
        	var dtSort = $('.dt-wrap').length;
        	$('<div />', {'class':'bet_panel_content_item dt-ball', 'data-play_type_s':entry.playTypeS, 'data-pos_length': entry.posLength})
    		.append($('<div />', {'class':'t-text'}).text(entry.playTypeSName.split('-').shift()))
    		.appendTo('.dt-wrap:nth-child(' + dtSort + ') .dt-content');
    		subTypeChildCount++;
        } else if(belong[x].hasOwnProperty('bac')){
        	$('[data-play_type_m=' + entry.playTypeM + '][data-tag=' + belong[x].tagPage + '] [data-bac=' + entry.playTypeS + ']').attr('data-play_type_s', entry.playTypeS).attr('data-pos_length', entry.posLength)
        	.append($('<div />', {'class':'t-text'}).text(entry.playTypeSName.split('-').pop()));
        } else {
	        $('[data-play_type_m=' + entry.playTypeM + '][data-tag=' + belong[x].tagPage + ']')
	        .append($('<div />', {'class':'bet_panel_content_item', 'data-play_type_s':entry.playTypeS, 'data-pos_length': entry.posLength})
	        		.append($('<div />', {'class':'t-text'}).text(entry.playTypeSName.split('-').pop())))
          
    
        }
      }
  }
}

function getBetPanelWrapper(entry){
	
    var $cont = $('<div />', {'class': 'bet_panel_wrapper'});
    if(entry.hasOwnProperty('rule')){
    	$cont.append($('<div />', {'class':'vice_title_wrap'})
    					.append($('<div />', {'class':'bet_panel_vice_title'}).html(entry['rule'])));
    }
    $cont.appendTo('.' + entry.playCodeM + ' .game-body');
}

function openFirstBlock(){
	$('.play-type').first().find('div').first().find('span').click();
	
}

function changeElement(){
  $('.play-type > div').on('click', 'span', function(e) {
    $('.play-type > div').removeClass('active');
    $(e.delegateTarget).addClass('active');
    var $toggle_target = $(e.delegateTarget).parents('.play-type');
    var m = $toggle_target.data('tag_m')
    $('.swiper-container').hide();
    $('#' + m).show();
    $('.playtype-list .m-name').addClass('only-type').text($toggle_target.find('span').text());
    layer.closeAll();
    
    $.each($('.swiper-container:visible .payrate'), function(entryIdx, entry) {
      $(this).text(Math.floor(Number(multipleMax * $(this).data('pay_rate_max') * 10000 / multipleBase)) / 10000);
    });
    $('.balance-bar .range-slide-left span:nth-child(1)').text(multipleMax);
    $('.balance-bar .range-slide-left span:nth-child(2) font').text('0');
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

function bottomBorder(){
    $('<div />', {'class':'hr2 mt10'}).appendTo('.main_lt_list');
}

function bindEventHelp(){
  $('.rule span').hover(function(){
    $(this).find('font:last-child').stop().fadeToggle();
  })
}

function changeBallStyle(){
    $.each(ballStyle[0], function(className, typeOb){
      $.each(typeOb, function(entryIdx, entry) {
        $('[data-play_type_m=' + entry.playTypeM + '][data-tag=' + entry.tag + '] ul li').addClass(className);
      })
    })
}

function bindEventAmount() {
  $('.ba').blur(function() {
       
       if($(this).val() < 1 && $(this).val() != "") {
         $(this).val(1);
       }
       
       var quantity = 0, totalAmt = 0;
       $('.ba').each(function() {
         if($(this).val() != "") {
           quantity++;
           totalAmt += parseInt($(this).val());
         }
       });
       
       $('.bet-quantity').text(quantity);
       $('.bet-total-amount').text(totalAmt);
 });
  
  $('.ba').mousedown(function() {
    moneyValue = $(this).val();
    $(this).val('');
  });
  
  $('.ba').mouseup(function() {
    $(this).val(moneyValue);
  });
  
  $('.ba').keyup(function() {
    $(this).val($(this).val().replace(/\D/g,''));
  });
  
  $('.cell').click(function() {
    if($('.amount-group').data().bind == 2) {
      var tag = $(this).closest('.body').data('tag');
      if($(this).hasClass('ba-check')) {
        var a = $(this).data('faster_amount');
        $('[data-tag=' + tag + '] [data-faster_amount=' + a + ']').removeClass('ba-check');
      } else {
        var a = $(this).data('faster_amount');
        $('[data-tag=' + tag + '] [data-faster_amount=' + a + ']').addClass('ba-check');
      }
      
      var quantity = 0;
      $('[data-tag=' + tag + '] .cell').each(function() {
        if($(this).hasClass('ba-check')) {
          quantity++;
        }
      });
      
      $('.bet-quantity').text(quantity);
      $('.bet-total-amount').text(quantity * Number($('.faster-amount').val()));
    }
  });
  
  $('.faster-amount').change(function() {
    $('.ba').val($(this).val());
    $('.bet-total-amount').text($('.bet-quantity').text() * Number($('.faster-amount').val()));
  });
}


function changeToDice() {
  $('.body li .name span').each(function() {
    if(!isNaN($(this).text())) {
      $(this).addClass('number credit ' + gameCode + '-' + $(this).text());
    }
  })
}

function afterAppendDom(response){
    
    //切換玩法的event
    changeElement();
    
    //改變某些球的css
    changeBallStyle();
    
//    callSwiper();
    
    //input的click事件
//    bindEventAmount();
    
//    addAdditionBetButton();
    
    //把第一個玩法相關dom打開
    openFirstBlock();
    
    if(gameType == 4 || gameType == 14) {
      changeToDice();
    }
}