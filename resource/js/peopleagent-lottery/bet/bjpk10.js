var functionArray = {
    betOrderF1_P: function(a1) {
      type = 0;
      var betOrder = [];
      position = [];
      
      quantity = a1.length;
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderF2_P: function(a1, a2) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = 0;
      
      for(var i = 0; i < a1.length; i++) {
          b1 = a1[i];
          for(var j = 0; j < a2.length; j++) {
              if(b1 != a2[j]) {
                  quantity++;
              }
          }
      }
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push(a2.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderF3_P: function(a1, a2, a3) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = 0;
      
      if ((a1.length * a2.length * a3.length) > 0) {
          for (var i = 0; i < a1.length; i++) {
              var b1=a1[i];
              for (var j = 0; j < a2.length; j++) {
                  var b2=a2[j];
                  if (b2 != b1){
                      for (var k = 0; k < a3.length; k++) {
                          if (a3[k] != b1 && a3[k] !=b2) {
                              quantity++;
                          }
                      }
                  }
              }
          }
      }
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push(a2.join(','));
          betOrder.push(a3.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderFixed_P: function(a1, a2, a3, a4, a5, a6, a7, a8, a9, a10) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = a1.length + a2.length + a3.length + a4.length + a5.length + a6.length + a7.length + a8.length + a9.length + a10.length;
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push(a2.join(','));
          betOrder.push(a3.join(','));
          betOrder.push(a4.join(','));
          betOrder.push(a5.join(','));
          betOrder.push(a6.join(','));
          betOrder.push(a7.join(','));
          betOrder.push(a8.join(','));
          betOrder.push(a9.join(','));
          betOrder.push(a10.join(','));
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderBSOE_F1: function(a1) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = a1.length;
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderBSOE_F2: function(a1, a2) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = a1.length * a2.length;
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push(a2.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    },
    betOrderBSOE_F3: function(a1, a2, a3) {
      type = 0;
      var betOrder = [];
      position = [];
      quantity = a1.length * a2.length * a3.length;
      
      if(quantity > 0) {
          betOrder.push(a1.join(','));
          betOrder.push(a2.join(','));
          betOrder.push(a3.join(','));
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          betOrder.push("");
          position.push(betOrder);
          betOrder = [];
      }
      
      $('.bet-quantity').html(quantity);
      $('.bet-total-amount').html(quantity * $('.bet-amount').val());
    }
}