class StartMessage {
  constructor(cb) {
    // this.callback = cb;
    $('#buttonDiv').mouseenter(function() {
      $(this).css('background-color', '#5b5b5b');
    })

    $('#buttonDiv').mouseleave(function() {
      $(this).css('background-color', '#4D4D4D');
    })

    $('#buttonDiv').click(function() {
      $('#startContainer').animate({
        top: -530
      }, 1000, 'linear');

      $('#shade').animate({
        opacity: 0
      }, 2000, 'linear', function() {
        $(this).hide();
      });

      cb();
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    $('#startContainer').css({left: width/2-300, top: -530});

    $('#startContainer').animate({
      top: height/2-265
    }, 4000, 'easeOutElastic');
  }
}

export default StartMessage;
