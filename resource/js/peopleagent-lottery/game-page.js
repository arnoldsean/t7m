$(function(){
	$(window).bind("pageshow", function(event) {
	    if (event.originalEvent.persisted) {
	        window.location.reload();
	    }
	});

})

$('.option_slide span').add('.special_option input:checkbox').on('click', function(){
	//一次只允許提交一個玩法(快投,特殊投法 event)
	$(this).parents('.bet_panel_wrapper').siblings().find('.bet_panel_content_item_official').removeClass("focus");

})

$('.reset .trash').on('click', function(){
	$('.focus').removeClass('focus');
	$('.bet_box .bet_count').text(0);
})

$('.bet_panel_header').on('click', function(){
	console.log($(this).offset());
	console.log($('.show_slide_right').offset());
	if($(this).parent().find('.bet_panel_content').hasClass('visible')){
		$(this).parent().find('.bet_panel_content').removeClass('visible').removeClass('bet_panel_fix');
	} else {
		$(this).parent().find('.bet_panel_content').addClass('visible').addClass('bet_panel_fix');
		$(this).parent().siblings().find('.bet_panel_content').removeClass('visible').removeClass('bet_panel_fix');
		var top = $(this).offset().top - $('.show_slide_right').offset().top;
		$('.show_slide_right').scrollTop(top);
	}
	if($(this).find('.arrow').hasClass('arrow_transform')){
		$(this).find('.arrow').removeClass('arrow_transform');
	} else {
		$(this).find('.arrow').addClass('arrow_transform');
		$(this).parent().siblings().find('.arrow').removeClass('arrow_transform');
	}
	
})

$('.arrow_back').on('click', function(){
	transBetPage();
})

$('.bet_btn .detail').on('click', function(){
	if(typeof modalInterval !== 'undefined') clearInterval(modalInterval);
	$('.bet_page').off('transitionend');
	if($('.focus').length == 0 || $('.bet_box .bet_count').text() == 0){
		var title = $('.title-text').text();
		var modalIssueNo = $('#issueNo').text();
		var content = '您还未选择';
		normalModal(warningModal, title, modalIssueNo, content);
	} else {
		if ($('#login').val() === "false") {
  	  		var title = $('.title-text').text();
  			var modalIssueNo = $('#issueNo').text();
  			var content = '请先进行登录';
  			normalModal(warningModal, title, modalIssueNo, content, goLogin);
  			return false;
  	    }
		$('.type-menu').css('display','none');
		$('.type-menu-toggle').removeClass('title_arrow_transform');
		$('.menu_item').removeClass('active');
		if(playMode == 'credit'){
			//信用
			var $onBall = $('.bet_panel_content_item.focus');
			var onBallLen = $onBall.length;
			for(var i = 0; i < onBallLen; i++){
				var $thisBall = $onBall.eq(i);
				var order = new Object();
				//把各個值帶到輸入金額的投注頁面
          		var $betContent = $thisBall.closest('.bet_panel_content');
          		var playTypeM = $betContent.data('play_type_m');
          		var playTypeS = $thisBall.data('play_type_s');
          		var payRate = $thisBall.find('.payrate').data('pay_rate_max');
          		var checkPos = $thisBall.closest('.bet_panel_content').data('check_pos');
	            var position = $thisBall.data('position');
	            var posLength = $thisBall.data('pos_length');
				var payRate = $thisBall.find('div').last().text();
				var dataTitle = $('header .title').text().trim();
				var $thisContainer = $thisBall.parents('.swiper-container');
				var containerId = $thisContainer.attr('id');
				var gameType = $('.play-type.' + containerId).text();
				if($thisBall.hasClass('dt-ball')) {
					var dtOption = $thisBall.closest('.dt-wrap').find('.dt-header').text();
					gameType += '<br />' + dtOption;
				}
				var betOption = $thisBall.find('div.t-text').first().text();
				$('.order_view_bet_data_item.now_issue').after($('<div/>',{'class':'view_bet_data ' + playTypeM})
											.append($('<div/>',{'class':'bet_data_input'})
													.append($('<input/>',{
																			'type':'number',
																			'class':'order-input',
																			'pattern':'\d*',
																			'placeholder':'输入金额', 
																			'data-play_type_m': playTypeM, 
																			'data-play_type_s': playTypeS,
																			'data-pay_rate_max': payRate,
																			'data-check_pos':checkPos,
																			'data-position': position,
																			'data-pos_length': posLength})))
											.append($('<div/>',{'class':'bet_data_text'})
													.append($('<div/>',{'class':'data_title gray_color'}).html(dataTitle))
												    .append($('<div/>',{'class':'data_content'})
															.append($('<div/>',{'class':'game_type'}).html(gameType))
															.append($('<div/>',{'class':'bet_option'}).html(betOption))
															.append($('<div/>',{'class':'pay_rate red_color'}).html(payRate)))));
		  
				}
			$('.mid_item_div span').eq(0).text($('.bet_data_input').length);
			var now_money = $('.bet_box .bet_value').val();
			$('#apply_value').val(now_money);
			$('#apply').trigger('touchstart');
		} else {
			//官方
			$('.data_wrap').remove();
			appendDom(null);
			$('.play_type_content').text(playText);
			$('<div />', {'class':'order_view_bet_data_item ui_switch'})
				.append($('<div />', {'class':'ui_switch_title issue'})
						.append($('<span />',{'class':'issueNo'}).text(issueNo)).append('期'))
				.append($('<div />', {'class':'ui_switch_content'})
						.append($('<span />',{'class':'mark numDec'}).text('-'))
						.append($('<span />')
								.append($('<input />', {'type':'number','class':'quantity','id':'multiple','style':'color:#ef4f4f','min':'1','value':'1','placeholder':'1'})))
						.append($('<span />',{'class':'mark numAdd'}).text('+')))
			.appendTo($('.disable_ui_switch'));			
			$('.ui_switch_title.issue span').text(issueNo);
			$('.mid_item_div span').eq(0).text($('.bet_box .bet_count').text());
			
			var now_money = $('.bet_box .bet_value').val();
			$('#bet_input').val(now_money);
			var bet_money = $('#bet_input').val();
			var bet_count = parseInt($('.mid_item_div span').eq(0).text());
			var bet_total = bet_money * bet_count;
			$('#bet-total-amount').text('¥ ' + (bet_total));
		}
		$('.bet_page').removeClass('bet_page_transform');
	}
	putIssueNo();
})

$('.balance-bar .range-slider-range').change(function() {
  var value = $(this).val();
  if(playMode == 'credit') {
    $.each($('.swiper-container:visible .payrate'), function(entryIdx, entry) {
      $(this).text(Math.floor(Number(value * $(this).data('pay_rate_max') * 10000 / multipleBase)) / 10000);
    });
    $('.balance-bar .range-slide-left span:nth-child(1)').text(value);
    $('.balance-bar .range-slide-left span:nth-child(2) font').text(Number(rebatRate - Number(((value - multipleMin) / multipleBase) * 100).toFixed(1)).toFixed(1));
  } else {
    if($(".swiper-container:visible [data-check_pos='N']").length > 0) {
      $.each($('.swiper-container:visible .SUM_payRate'), function(entryIdx, entry) {
        $(this).text(Math.floor(Number(value * $(this).data('pay_rate_max') * 10000 / multipleBase)) / 10000);
      });
      $('.balance-bar .range-slide-left span:nth-child(1)').text(value);
      $('.balance-bar .range-slide-left span:nth-child(2) font').text(Number(rebatRate - Number(((value - multipleMin) / multipleBase) * 100).toFixed(1)).toFixed(1));
    } else {
      var payRate = $('.swiper-container:visible').find('.pay_rate').data('pay_rate_max');
      $('.balance-bar .range-slide-left span:nth-child(1)').text(value);
      $('.balance-bar .range-slide-left span:nth-child(2) font').text(Number(rebatRate - Number(((value - multipleMin) / multipleBase) * 100).toFixed(1)).toFixed(1));
      $('.balance-bar .range-slide-right').text(Math.floor(Number(value * payRate * 10000 / multipleBase)) / 10000);
      $('.swiper-container:visible').find('.pay_rate').data('pay_rate', Math.floor(Number(value * payRate * 10000 / multipleBase)) / 10000);
    }
  }
  
  adjustCheckedOrder();
});

function adjustCheckedOrder() {
  if(typeof sarray != 'undefined') {
    if(sarray.length > 0) {
      $.each(sarray, function(entryIdx, entry) {
        var playTypeM = entry.playTypeM;
        var playTypeS = entry.playTypeS;
        entry.payRate = Math.floor(Number($('.balance-bar .range-slider-range').val() * $('[data-play_type_m=' + playTypeM + '] [data-play_type_s=' + playTypeS + '] .SUM_payRate').data('pay_rate_max') * 10000 / multipleBase)) / 10000;
        entry.rebatRate = Number(rebatRate - (($('.balance-bar .range-slider-range').val() - multipleMin) / multipleBase) * 100).toFixed(1);
      })
    }
  }
}

function appendDom(response, count){
	var $target = $('.bet_panel_content_item_official.focus:eq(0)');
	var $targetBlock = $target.parents('.bet_panel_wrapper');
	var $targetSection = $target.parents('.section');
	var $targetInfoRow = $targetBlock.siblings('.info-row');
	var $playTypeMAct = $targetSection.find('.playtype-list .m-name');
	var $playTypeSAct = $targetSection.find('.playtype-list .s-name');
	if($targetBlock.data('check_pos') == 'Y'){
		//官方 非 和值.混合
		var	playTypeMName = $playTypeMAct.text();
		var	playType = $playTypeSAct.text();
			playText = playTypeMName + '/' + playType;
		    payRate = $targetInfoRow.find('.pay_rate').text();
		var order = "";

		var specialLen = $targetBlock.find('.special').length;
		if(specialLen > 0){
			//時時彩選位
			var program = "[方案]: "
				order = "[号码]: "
				$targetBlock.find('.special_option input:checked+span').each(function(){
					program += $(this).text() + ' ';
				})
				$targetBlock.find('.classification').each(function(entryIdx, entry){
					order += $(this).find('span').text()+ ':' + position[0][entryIdx + 1] + " ";
				})
				order = program + ';<br />' + order;
				getDataWrap(order, payRate, response);
		} else {
			//一般官方非和值
			
			var $targetBlockItem = $targetBlock.find('.bet_panel_content');
			var orderAr = [];
			$.each($targetBlockItem, function(entryIdx, entry){
				var $focusBall = $(entry).find('.bet_panel_content_item_official.focus');
				var focusBallLen = $focusBall.length;
				if(focusBallLen > 0){
				var prefixName = $(entry).find('.classification span').text();
				var focusBallAr = [];
				
				$.each($focusBall, function(childEntryIdx, childEntry){
					focusBallAr.push($(childEntry).find('div').first().text());
				})
				orderAr.push(prefixName + ':' + focusBallAr.join(','))
				}
			})
			order = orderAr.join('<br />');
			getDataWrap(order, payRate, response);
		}
	} else {
		//官方 和值.混合
		var $onBall = $('.bet_panel_content_item_official.focus');
		var onBallLen = $('.bet_panel_content_item_official.focus').length;
		for(var i = 0; i < onBallLen; i++){
			var $target = $onBall.eq(i);
			var number = $target.find('div:first').text();
			var	playTypeMName = $playTypeMAct.text();
			var	playType = $playTypeSAct.text();
			    playText = playTypeMName + '/' + playType;
			var payRate = '赔率: ' + $target.find('.SUM_payRate').text();
			var order = $target.parents('.section').find('.s-name').text() + ':' + number;
			getDataWrap(order, payRate, response);
			
		}
	}
}

function getDataWrap(order, payRate, response){
		$('<div />',{'class':'data_wrap'})
		.append($('<div />', {'class':'order_data_info'})
				.append($('<div />').html(order))
				.append($('<div />').html(payRate)))
		.appendTo($('.order_data'));	
}

function putIssueNo(){
	$('.now_issue').find('.now_issue_content').html('<font>' + issueNo + '</font>&nbsp期');
}

function transBetPage(){
	$('.order_view_bet_data input[type="checkbox"]').prop('checked',false);
	$('#myconswitch').prop('checked', true);
	$('.disable_ui_switch').css('display','none');
	$('.condition').css('display','none');
	$('#acLimit').val(0);
	$('.data_wrap').remove();
	$('.bet_page').addClass('bet_page_transform');
	$('.bet_page').on('transitionend',function(){
		$('.view_bet_data').remove();
		$('.mid_item_div span').eq(1).text('¥ 0');
		$('.bet_page').off('transitionend');
	})
}

$('.option_btn').on('click', function(){
	if($(this).siblings().find('.option_slide').hasClass('show_option_slide')){
		$(this).siblings().find('.option_slide').removeClass('show_option_slide');
	} else {
		$(this).siblings().find('.option_slide').addClass('show_option_slide');
	}
})



function fContentVisible(){
	$('.slide_right').find('.bet_panel_wrapper:eq(0) .bet_panel_content').addClass('visible').addClass('bet_panel_fix');
	$('.slide_right').find('.arrow:eq(0)').addClass('arrow_transform');
}

function callSwiper(){
	var mySwiper = new Swiper('.swiper-container',{
		//loop 設為true 會導致複製的DOM沒有 bind event ,尚未解決
	     loop:false,
	     grabCursor: true,
	     paginationClickable: true,
	     observer:true,//修改swiper自己或子元素时，自动初始化swiper
	     observeParents:true,//修改swiper的父元素时，自动初始化swiper
	     uniqueNavElements: false,
	     on: {
	    	 slideChange: function(){
	    		 if(playMode == 'official'){
		    		 $('.focus').removeClass('focus');
		    		 $('.option_focus').removeClass('option_focus');
	    			 $('.bet_box .bet_count').text(0);
	    		 }
	    	 },
	    	 slideChangeTransitionStart: function(){
	    		 $(".swiper-slide").scrollTop(0);
	    	 }
	     }
	})
	
	//校正有margin时的偏移量
	var marginR = parseInt($('.play_type_container .slide_list_item').first().css('margin-right').replace('px',''));
	var mySwiper2 = [];
	$(".header_swiper").each(function(index, element){
	    var $this = $(this);
	    $this.addClass("instance-" + index);
	    $this.parents('.header_swiper_wrap').find(".swiper-button-prev").addClass("btn-prev-" + index);
	    $this.parents('.header_swiper_wrap').find(".swiper-button-next").addClass("btn-next-" + index);
	    var swiper = new Swiper(".instance-" + index, {
	    	//loop 設為true 會導致複製的DOM沒有 bind event ,尚未解決
		     loop:false,
		     slidesOffsetBefore: -40,
		     spaceBetween: marginR,
		     slidesPerView: 4,
		     centeredSlides: true,
		     grabCursor: true,
		     paginationClickable: true,
		     observer:true,//修改swiper自己或子元素时，自动初始化swiper
		     observeParents:true,//修改swiper的父元素时，自动初始化swiper
		     uniqueNavElements: false,
		     slideToClickedSlide: true,
	         navigation: {
	    	     nextEl: ".btn-next-" + index,
	    	     prevEl: ".btn-prev-" + index
	    	   },
	    });
	    mySwiper2.push(swiper);
	});
	if(Array.isArray(mySwiper) == true && Array.isArray(mySwiper2) == true){
		$.each(mySwiper, function(entryIdx, entry){
			mySwiper[entryIdx].controller.control = mySwiper2[entryIdx];
			mySwiper2[entryIdx].controller.control = mySwiper[entryIdx];
		})
	} else {
			mySwiper.controller.control = mySwiper2[0];
			mySwiper2[0].controller.control = mySwiper
	}
	
	$('.swiper-button-next').add('.swiper-button-prev').on('click', function(event){
		event.preventDefault();
	})
	
//	mySwiper.controller.control = mySwiper2;
//	mySwiper2.controller.control = mySwiper;
	
	var mySwiper3 = new Swiper('.play_type_container',{
		//loop 設為true 會導致複製的DOM沒有 bind event ,尚未解決
	     loop:false,
	     slidesOffsetBefore: -40,
	     spaceBetween: marginR,
	     centerInsufficientSlides: true,
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
	 			if(playMode == 'official'){
	 				$('.focus').removeClass('focus');
	 				$('.option_focus').removeClass('option_focus');
		 			$('.bet_box .bet_count').text(0);
	 			}
	    	 },
			 slideChangeTransitionEnd: function(){
				 $('.slide_list_item.swiper-slide-active').addClass('active').siblings().removeClass("active");
				 if(playMode == 'official'){
		    		 var toggle_target = $('.slide_list_item.swiper-slide-active').data('play_code_m');
				 } else {
		    		 var toggle_target = $('.slide_list_item.swiper-slide-active').data('tag_m');
				 }
	 			 $('.slide_right').removeClass('show_slide_right');
	 			 $('#' + toggle_target).addClass('show_slide_right');
			 }
	     }
	})
	$('.arrow-left').on('click', function(e){
	     e.preventDefault()
	     mySwiper.swipePrev()
	})
	$('.arrow-right').on('click', function(e){
	     e.preventDefault()
	     mySwiper.swipeNext()
	})
}
