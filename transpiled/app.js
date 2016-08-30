(function() {
  var cr, i, map, pick, sv, tileNum;

  map = document.getElementById('map');

  sv = game.views.Street;

  cr = game.views.Crossroad;

  pick = function() {
    var choices, tile;
    choices = [sv, cr];
    tile = choices[Math.floor(Math.random() * choices.length)];
    return new tile();
  };

  for (tileNum = i = 1; i <= 25; tileNum = ++i) {
    map.appendChild(pick().render());
  }

}).call(this);
