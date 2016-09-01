(function() {
  var cr, hsv, i, map, pick, tileNum, vsv;

  map = document.getElementById('map');

  hsv = game.views.HorizontalStreet;

  vsv = game.views.VerticalStreet;

  cr = game.views.Crossroad;

  pick = function() {
    var choices, tile;
    choices = [hsv, vsv, cr];
    tile = choices[Math.floor(Math.random() * choices.length)];
    console.log("New tile", tile);
    return new tile();
  };

  for (tileNum = i = 1; i <= 25; tileNum = ++i) {
    map.appendChild(pick().render());
  }

}).call(this);
