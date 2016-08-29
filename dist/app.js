(function() {
  var map, sv;

  map = document.getElementById('map');

  sv = new StreetView();

  map.appendChild(sv.render());

}).call(this);
