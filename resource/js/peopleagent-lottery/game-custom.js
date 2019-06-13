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

function submitCallBack(response) {
  if (response.result == true) {
    showSuccessResult(response.message);
  } else {
    showErrorResult(response.message);
  }
  if (playMode == 'credit') {
    clearAfterCreditSubmit();
  } else {
    clearAfterSubmit();
  }
  getGameInfo();
  layer.closeAll('loading');
  $('#preorder-modal').modal('hide');
}

function resetChoose() {
  if(playMode == 'credit') {
    if($('.amount-group').data().bind != 2) {
      $('.ba').val('');
    }
    $('.ba-check').removeClass('ba-check');
  } else {
    $('.tab-pane .play-block li').removeClass('on');
  }
  
  if($('.play-block[data-entry_id=' + $('.playsubtype-list li.on').data('entry_id') + ']').data('check_pos') == 'N') {
    $('.scrollbar .pay-rate').text("");
    $('.scrollbar .result-money').text("");
  }
  if($('.scrollbar .slider').val() != 0) {
    $('.scrollbar .slider').val(0);
    $('.scrollbar .slider').trigger('change');
  }
  $('.scrollbar .rebat-rate').text(0);
  $('.bet-quantity').text(0);
  $('.bet-total-amount').text(0);
}

function clearAfterSubmit() {
  resetChoose();
  clearPlayBox();
  getBalance();
}

function clearAfterCreditSubmit() {
  resetChoose();
  getBalance();
  arr = [];
}

function clearPlayBox() {
  $('.cart .bet-table tbody tr.default').show().siblings().remove();
  $('#cart-modal .bet-table tbody tr.default').show().siblings().remove();
  clearQuantityAndAmt();
}

function clearQuantityAndAmt() {
  $('.data-box .bet-slip').text(0);
  $('.data-box .bet-count').text(0);
  $('.data-box .bet-total').text(0);
}

function cartQuantityAndAmt() {
  var orderNumber = $('.cart .bet-table tbody tr').length;
  if(orderNumber > 1) {
    var orderQuantity = 0;
    $('.cart .bet-table tbody tr .quantity').each(function() {
      orderQuantity += parseInt($(this).text());
    });
    var orderAmount = 0;
    $('.cart .bet-table tbody tr .amount').each(function() {
      orderAmount += Number($(this).text());
    });
    $('.data-box .bet-slip').text(orderNumber - 1);
    $('.data-box .bet-count').text(orderQuantity);
    $('.data-box .bet-total').text(orderAmount);
  } else {
    $('.data-box .bet-slip').text(0);
    $('.data-box .bet-count').text(0);
    $('.data-box .bet-total').text(0);
  }
}

function getBalance() {
  getJsonData(contextPath + "/Member/balance", null, updateBalance);
}

function updateBalance(response) {
  $('#balance').html('请稍后');
  setTimeout(function() {$('#balance').html(response)}, 1000);
}

var roadschemedata;
function getRoadDataSchemeCallBack(response) {
  if(response.data) {
    roadschemedata = response.data;
    $.each(roadschemedata.ballIndex, function(entryIdx, entry) {
      $('<option />', {'value': entry['Value']}).text(entry['Key']).appendTo($('[name=ballIndex]'));
    });
    $.each(roadschemedata.compareType[roadschemedata.ballIndex[0].Value], function(entryIdx, entry) {
      $('<dd />').append($('<a />', {'data-bind': entry['Value'], 'class': entryIdx == 0 ? 'active': ''}).text(entry['Key'])).appendTo($('.waybill-tab dl'));
    });
    roadEvent();
  } else {
    $('.waybill-wrap').hide();
  }
}

function getRoadDataCallBack(response) {
  if(response.result) {
    $('#dl tbody tr').empty();
    var dl_width = Math.floor($('#dl').parent().parent().width() / 18);
    dl_next = response.data.dalu.next;
    dl_max = response.data.dalu.maxX;
    for(var i = 0; i <= (dl_max > dl_width ? dl_max + 1 : dl_width); i++) {
      for(var j = 0; j < 6; j++) {
        if(response.data.dalu.data.hasOwnProperty(i + '-' + j)) {
          if($('.waybill-tab a.active').data().bind == 0) {
            $('#dl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.dalu.data[i + '-' + j].color == 0 ? 'background-blue' : 'background-red')}).text(response.data.dalu.data[i + '-' + j].num)));
          } else if($('.waybill-tab a.active').data().bind >= 1 && $('.waybill-tab a.active').data().bind <= 4) {
            $('#dl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.dalu.data[i + '-' + j].color == 0 ? 'background-blue' : 'background-red')})));
          } else {
            $('#dl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.dalu.data[i + '-' + j].color == 0 ? 'background-blue' : response.data.dalu.data[i + '-' + j].color == 1 ? 'background-red' : 'background-green')})));
          }
        } else {
          $('#dl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />')));
        }
      }
    }
    $('#dl').css("left", $('#dl').parent().outerWidth() - $('#dl').outerWidth());
    
    $('#zpl tbody tr').empty();
    var zpl_width = Math.floor($('#zpl').parent().parent().width() / 18);
    zpl_next = response.data.zhupanlu.next;
    zpl_max = response.data.zhupanlu.maxX;
    for(var i = 0; i <= (zpl_max > zpl_width ? zpl_max + 1 : zpl_width); i++) {
      for(var j = 0 ; j < 6; j++) {
        if(response.data.zhupanlu.data.hasOwnProperty(i + '-' + j)) {
          switch ($('.waybill-tab a.active').data().bind) {
            case 0:
              $('#zpl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.zhupanlu.data[i + '-' + j].color == 0 ? 'background-blue' : 'background-red')}).text(response.data.zhupanlu.data[i + '-' + j].num)));
              break;
            case 1:
            case 3:
              $('#zpl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.zhupanlu.data[i + '-' + j].color == 0) ? 'background-blue' : 'background-red'}).text(response.data.zhupanlu.data[i + '-' + j].num == 0 ? '单' : '双')));
              break;
            case 2:
            case 4:
              $('#zpl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.zhupanlu.data[i + '-' + j].color == 0) ? 'background-blue' : 'background-red'}).text(response.data.zhupanlu.data[i + '-' + j].num == 0 ? '小' : '大')));
              break;
            default:
              $('#zpl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.zhupanlu.data[i + '-' + j].color == 0) ? 'background-blue' : response.data.zhupanlu.data[i + '-' + j].color == 1 ? 'background-red' : 'background-green'}).text(response.data.zhupanlu.data[i + '-' + j].num == 0 ? '小' : response.data.zhupanlu.data[i + '-' + j].num == 1 ? '大' : '和')));
          }
        } else {
          $('#zpl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />')));
        }
      }
    }
    $('#zpl').css('left', $('#zpl').parent().outerWidth() - $('#zpl').outerWidth());
    
    $('#dyl tbody tr').empty();
    if(response.data.hasOwnProperty('dayanlu')) {
      var dyl_width = Math.floor($('#dyl').parent().parent().width() / 18);
      dyl_next = response.data.dayanlu.next;
      dyl_max = response.data.dayanlu.maxX;
      for(var i = 0; i <= (dyl_max > dyl_width ? dyl_max + 1 : dyl_width); i++) {
        for(var j = 0 ; j < 6; j++) {
          if(response.data.dayanlu.data.hasOwnProperty(i + '-' + j)) {
            $('#dyl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.dayanlu.data[i + '-' + j].color == 0 ? 'road-icon2-blue' : 'road-icon2-red')})));
          } else {
            $('#dyl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />')));
          }
        }
      }
      
      Object.values(response.data.dayanlu.next.beAsk)[0].color == 0 ? $('.w-side .even-road i:eq(0)').removeClass().addClass('icon-1-blue') : $('.w-side .even-road i:eq(0)').removeClass().addClass('icon-1-red');
      Object.values(response.data.dayanlu.next.soAsk)[0].color == 0 ? $('.w-side .odd-road i:eq(0)').removeClass().addClass('icon-1-blue') : $('.w-side .odd-road i:eq(0)').removeClass().addClass('icon-1-red'); 
    } else {
      $('.w-side .even-road i, .w-side .odd-road i').removeClass().addClass('icon-empty');
    }
    $('#dyl').css('left', $('#dyl').parent().outerWidth() - $('#dyl').outerWidth());
    
    $('#xl tbody tr').empty();
    if(response.data.hasOwnProperty('salu')) {
      var xl_width = Math.floor($('#xl').parent().parent().width() / 18);
      xl_next = response.data.salu.next;
      xl_max = response.data.salu.maxX;
      for(var i = 0; i <= (xl_max > xl_width ? xl_max + 1 : xl_width); i++) {
        for(var j = 0 ; j < 6; j++) {
          if(response.data.salu.data.hasOwnProperty(i + '-' + j)) {
            $('#xl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': (response.data.salu.data[i + '-' + j].color == 0 ? 'road-icon3-blue' : 'road-icon3-red')})));
          } else {
            $('#xl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />')));
          }
        }
      }
      Object.values(response.data.salu.next.beAsk)[0].color == 0 ? $('.w-side .even-road i:eq(1)').removeClass().addClass('icon-2-blue') : $('.w-side .even-road i:eq(1)').removeClass().addClass('icon-2-red');
      Object.values(response.data.salu.next.soAsk)[0].color == 0 ? $('.w-side .odd-road i:eq(1)').removeClass().addClass('icon-2-blue') : $('.w-side .odd-road i:eq(1)').removeClass().addClass('icon-2-red');
    }
    $('#xl').css('left', $('#xl').parent().outerWidth() - $('#xl').outerWidth());
    
    $('#yyl tbody tr').empty();
    if(response.data.hasOwnProperty('roachlu')) {
      var yyl_width = Math.floor($('#yyl').parent().parent().width() / 18);
      yyl_next = response.data.roachlu.next;
      yyl_max = response.data.roachlu.maxX;
      for(var i = 0; i <= (yyl_max > yyl_width ? yyl_max + 1 : yyl_width); i++) {
        for(var j = 0 ; j < 6; j++) {
          if(response.data.roachlu.data.hasOwnProperty(i + '-' + j)) {
            if(response.data.roachlu.data[i + '-' + j].color == 0) {
              $('#yyl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': 'road-icon1-blue'})));
            } else {
              $('#yyl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />', {'class': 'road-icon1-red'})));
            }
          } else {
            $('#yyl tr:nth-child(' + (j + 1) + ')').append($('<td />').append($('<i />')));
          }
        }
      }
      
      Object.values(response.data.roachlu.next.beAsk)[0].color == 0 ? $('.w-side .even-road i:eq(2)').removeClass().addClass('icon-3-blue') : $('.w-side .even-road i:eq(2)').removeClass().addClass('icon-3-red');
      Object.values(response.data.roachlu.next.soAsk)[0].color == 0 ? $('.w-side .odd-road i:eq(2)').removeClass().addClass('icon-3-blue') : $('.w-side .odd-road i:eq(2)').removeClass().addClass('icon-3-red');
    }
    $('#yyl').css('left', $('#yyl').parent().outerWidth() - $('#yyl').outerWidth());
  }
}

function askRoad(type) {
  if($('.waybill-tab a.active').data().bind == 0) {
    return;
  }
  if(type == 0) {
    $('#dl .font-prediction').removeClass().text('');
    var dl_next_key = Object.keys(dl_next.beAsk)[0].split('-');
    var dl_next_value = Object.values(dl_next.beAsk)[0];
    if($('#dl tr td').length <= dl_next_key[0]) $('#dl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        dl_next_value.color == 0 ? $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction') : $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-even font-prediction');
        break;
      case 2:
      case 4:
        dl_next_value.color == 0 ? $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction') : $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-even font-prediction');
        break;
    }
    
    $('#zpl .font-prediction').removeClass().text('');
    var zp_next_key = Object.keys(zpl_next.beAsk)[0].split('-');
    var zp_next_value = Object.values(zpl_next.beAsk)[0];
    if($('#zpl tr td').length <= zp_next_key[0]) $('#zpl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        zp_next_value.color == 0 ? $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction').text('单') : $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-even font-prediction').text('双');
        break;
      case 2:
      case 4:
        zp_next_value.color == 0 ? $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction').text('小') : $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-even font-prediction').text('大');
        break;
    }
    
    $('#dyl .font-prediction').removeClass().text('');
    var dyl_next_key = Object.keys(dyl_next.beAsk)[0].split('-');
    var dyl_next_value = Object.values(dyl_next.beAsk)[0];
    if($('#dyl tr:eq(0) td').length <= dyl_next_key[0]) $('#dyl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        dyl_next_value.color == 0 ? $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-blue font-prediction') : $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-red font-prediction');
        break;
      case 2:
      case 4:
        dyl_next_value.color == 0 ? $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-blue font-prediction') : $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-red font-prediction');
        break;
    }
    
    $('#xl .font-prediction').removeClass().text('');
    var xl_next_key = Object.keys(xl_next.beAsk)[0].split('-');
    var xl_next_value = Object.values(xl_next.beAsk)[0];
    if($('#xl tr:eq(0) td').length <= xl_next_key[0]) $('#xl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        xl_next_value.color == 0 ? $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-blue font-prediction') : $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-red font-prediction');
        break;
      case 2:
      case 4:
        xl_next_value.color == 0 ? $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-blue font-prediction') : $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-red font-prediction');
        break;
    }
    
    $('#yyl .font-prediction').removeClass().text('');
    var yyl_next_key = Object.keys(yyl_next.beAsk)[0].split('-');
    var yyl_next_value = Object.values(yyl_next.beAsk)[0];
    if($('#yyl tr:eq(0) td').length <= yyl_next_key[0]) $('#yyl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        yyl_next_value.color == 0 ? $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-blue font-prediction') : $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-red font-prediction');
        break;
      case 2:
      case 4:
        yyl_next_value.color == 0 ? $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-blue font-prediction') : $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-red font-prediction');
        break;
    }
  } else {
    $('#dl .font-prediction').removeClass().text('');
    var dl_next_key = Object.keys(dl_next.soAsk)[0].split('-');
    var dl_next_value = Object.values(dl_next.soAsk)[0];
    if($('#dl tr td').length <= dl_next_key[0]) $('#dl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        dl_next_value.color == 0 ? $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction') : $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-even font-prediction');
        break;
      case 2:
      case 4:
        dl_next_value.color == 0 ? $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction') : $('#dl tr:eq(' + dl_next_key[1] + ') td:eq(' + dl_next_key[0] + ') i').removeClass().addClass('font-even font-prediction');
        break;
    }
    
    $('#zpl .font-prediction').removeClass().text('');
    var zp_next_key = Object.keys(zpl_next.soAsk)[0].split('-');
    var zp_next_value = Object.values(zpl_next.soAsk)[0];
    if($('#zpl tr td').length <= zp_next_key[0]) $('#zpl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        zp_next_value.color == 0 ? $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction').text('单') : $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-even font-prediction').text('双');
        break;
      case 2:
      case 4:
        zp_next_value.color == 0 ? $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-odd font-prediction').text('小') : $('#zpl tr:eq(' + zp_next_key[1] + ') td:eq(' + zp_next_key[0] + ') i').removeClass().addClass('font-even font-prediction').text('大');
        break;
    }
    
    $('#dyl .font-prediction').removeClass().text('');
    var dyl_next_key = Object.keys(dyl_next.soAsk)[0].split('-');
    var dyl_next_value = Object.values(dyl_next.soAsk)[0];
    console.log($('#dyl tr:eq(0) td').length);
    if($('#dyl tr:eq(0) td').length <= dyl_next_key[0]) $('#dyl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        dyl_next_value.color == 0 ? $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-blue font-prediction') : $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-red font-prediction');
        break;
      case 2:
      case 4:
        dyl_next_value.color == 0 ? $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-blue font-prediction') : $('#dyl tr:eq(' + dyl_next_key[1] + ') td:eq(' + dyl_next_key[0] + ') i').removeClass().addClass('road-icon2-red font-prediction');
        break;
    }
    
    $('#xl .font-prediction').removeClass().text('');
    var xl_next_key = Object.keys(xl_next.soAsk)[0].split('-');
    var xl_next_value = Object.values(xl_next.soAsk)[0];
    if($('#xl tr:eq(0) td').length <= xl_next_key[0]) $('#xl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        xl_next_value.color == 0 ? $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-blue font-prediction') : $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-red font-prediction');
        break;
      case 2:
      case 4:
        xl_next_value.color == 0 ? $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-blue font-prediction') : $('#xl tr:eq(' + xl_next_key[1] + ') td:eq(' + xl_next_key[0] + ') i').removeClass().addClass('road-icon3-red font-prediction');
        break;
    }
    
    $('#yyl .font-prediction').removeClass().text('');
    var yyl_next_key = Object.keys(yyl_next.soAsk)[0].split('-');
    var yyl_next_value = Object.values(yyl_next.soAsk)[0];
    if($('#yyl tr:eq(0) td').length <= yyl_next_key[0]) $('#yyl tr').append($('<td />').append($('<i />')));
    
    switch ($('.waybill-tab a.active').data().bind) {
      case 1:
      case 3:
        yyl_next_value.color == 0 ? $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-blue font-prediction') : $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-red font-prediction');
        break;
      case 2:
      case 4:
        yyl_next_value.color == 0 ? $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-blue font-prediction') : $('#yyl tr:eq(' + yyl_next_key[1] + ') td:eq(' + yyl_next_key[0] + ') i').removeClass().addClass('road-icon1-red font-prediction');
        break;
    }
  }
}
