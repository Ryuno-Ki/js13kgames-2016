map = document.getElementById 'map'
for tileNum in [1..25]
  sv = new game.views.Street()
  map.appendChild sv.render()
