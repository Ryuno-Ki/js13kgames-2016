(function() {
  var i, map, sv, tileNum;

  map = document.getElementById('map');

  for (tileNum = i = 1; i <= 25; tileNum = ++i) {
    sv = new game.views.Street();
    map.appendChild(sv.render());
  }

}).call(this);
