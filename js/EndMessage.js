class EndMessage {
  constructor(score, restartCB) {
    $('#restartButtonDiv').mouseenter(function() {
      $(this).css('background-color', '#5b5b5b');
    })

    $('#restartButtonDiv').mouseleave(function() {
      $(this).css('background-color', '#4D4D4D');
    })

    $('#restartButtonDiv').click(function() {
      $('#endContainer').animate({
        top: -550
      }, 1000, 'linear');
      console.log('hii');
      $('#shade2').animate({
        opacity: 0
      }, 1000, 'linear', function() {

        $('#shade2').hide();
      });

      restartCB();
    });

    let width = window.innerWidth;
    let height = window.innerHeight;
    $('#endContainer').css({left: width/2-300, top: height/2-275});
    $('#endScore').text(parseFloat(score).toFixed(0));

    $('#shade2').show();
    $('#shade2').animate({
      opacity: 1
    }, 1000, 'linear');

  }
}

export default EndMessage;
