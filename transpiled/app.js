(function() {
  var mapData, mapModel, mapView, node;

  node = document.getElementById('map');

  mapModel = new game.models.Map(300, 360);

  mapView = new game.views.Map(node);

  mapData = JSON.parse(mapModel.calculateMap());

  mapView.render(mapData);

  setInterval(function() {
    return mapView.spawnCar(mapData);
  }, 1000);

}).call(this);
