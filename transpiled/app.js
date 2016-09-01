(function() {
  var car, cr, hsv, i, lbc, ltc, map, pick, rbc, rtc, tile, tileNum, vsv;

  map = document.getElementById('map');

  hsv = game.views.HorizontalStreet;

  vsv = game.views.VerticalStreet;

  ltc = game.views.LeftTopCurve;

  rtc = game.views.RightTopCurve;

  lbc = game.views.LeftBottomCurve;

  rbc = game.views.RightBottomCurve;

  cr = game.views.Crossroad;

  car = game.views.Car;

  pick = function() {
    var choices, tile;
    choices = [hsv, vsv, ltc, rtc, lbc, rbc, cr];
    tile = choices[Math.floor(Math.random() * choices.length)];
    return new tile();
  };

  for (tileNum = i = 1; i <= 25; tileNum = ++i) {
    tile = pick().render();
    tile.appendChild((new car()).render());
    map.appendChild(tile);
  }

}).call(this);
