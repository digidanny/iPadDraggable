/*
 * iPad Draggable
 * --------------
 * Maps touch events to mouse events for jQuery UI Draggable elements.
 *
 * Based on code samples from:
 * http://vetruvet.blogspot.com/2010/12/converting-single-touch-events-to-mouse.html
 *
 * Dependencies:
 *   - jQuery
 *   - jQuery UI
 *
 */
 
(function() { 

  if (!jQuery) {
    console.log( 'jQuery required.' )
    return;
  }
  
  var iPadDraggable = function() {
    var self = this;
    
    self.init = function() {      
      $( ".ui-draggable, .ui-draggable-dragging" )
        .live( 'touchstart',  self.touchHandler, true )
        .live( 'touchmove',   self.touchHandler, true )
        .live( 'touchend',    self.touchHandler, true )                
        .live( 'touchcancel', self.touchHandler, true );                        
    };
    
    self.touchHandler = function( event ) {
      var touches = event.originalEvent.changedTouches,
          first = touches[0],
          type;

      switch(event.type) {
        case "touchstart": 
          type="mousedown"; 
          break;
        case "touchmove":  
          type="mousemove"; 
          break;        
        case "touchend":   
          type="mouseup"; 
          break;
        default: 
          return;
      }

      var screenX = first.screenX || first.pageX;
      var screenY = first.screenY || first.pageY;

      var simulatedEvent = document.createEvent("MouseEvent");
      
      simulatedEvent.initMouseEvent(
          type, true, true, window, 1, 
          screenX, screenY, 
          first.clientX, first.clientY, false, 
          false, false, false, 0, null);

      first.target.dispatchEvent(simulatedEvent);
      event.preventDefault();
    };
    
    self.init();
    
    return self;
  };
  
  $(function() {
    new iPadDraggable();
  });
  
})();