node = document.getElementById 'map'
mapModel = new game.models.Map(300, 360)
mapView = new game.views.Map node
mapData = JSON.parse mapModel.calculateMap()
mapView.render mapData

# car = game.views.Car
#
# for tileNum in [1..25]
#   tile = pick().render()
#   tile.appendChild (new car()).render()
#   map.appendChild tile
