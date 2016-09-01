(function() {
  var cr, hsv, i, lbc, ltc, map, pick, rbc, rtc, tileNum, vsv;

  map = document.getElementById('map');

  hsv = game.views.HorizontalStreet;

  vsv = game.views.VerticalStreet;

  ltc = game.views.LeftTopCurve;

  rtc = game.views.RightTopCurve;

  lbc = game.views.LeftBottomCurve;

  rbc = game.views.RightBottomCurve;

  cr = game.views.Crossroad;

  pick = function() {
    var choices, tile;
    choices = [hsv, vsv, ltc, rtc, lbc, rbc, cr];
    tile = choices[Math.floor(Math.random() * choices.length)];
    return new tile();
  };

  for (tileNum = i = 1; i <= 25; tileNum = ++i) {
    map.appendChild(pick().render());
  }

}).call(this);
