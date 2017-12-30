var template = Handlebars.compile($('#game-template').html());
var num = shuffle();

$('input').on('keyup', function(e) {
  $('div.wrapper').removeClass('error');
  var guess = $(this).val();
  var size = guess.length;
  var regex = /(?!.*(?:(\d)\1))\d{4}/;

  if (e.which === 13) {
    if (!(regex.test(guess) && size === 4)) {
      $('div.wrapper').addClass('error');
    } else if (guess === num) {
      $('.result').show();
      $('.close a').on('click', function() {
        location.reload();
      });
    } else {
      var bulls = 0;
      var cows = 0;
      for (i = 0; i < 4; i++) {
        if (num[i] === guess[i]) {
          cows += 1;
        }
      };
      for (i = 0; i < 4; i++) {
        if (num.includes(guess[i])) {
          bulls += 1;
        }
      };
      var game = {
        number: $('input').val(),
        bulls: bulls - cows,
        cows: cows,
      };
      $('input').val('');
      $('table tbody').prepend(template(game));
    };
  };
});

function shuffle() {
  nmb = '';
  while(nmb.length < 4) {
    digit = (Math.floor(Math.random() * 10)).toString();
    if (!(nmb.includes(digit))) {
      nmb += digit;
    }
  }
  return nmb;
};
