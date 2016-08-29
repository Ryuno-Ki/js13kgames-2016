map = document.getElementById 'map'
sv = game.views.Street
cr = game.views.Crossroad

pick = () ->
  choices = [sv, cr]
  tile = choices[Math.floor(Math.random() * choices.length)]
  return new tile()

for tileNum in [1..25]
  map.appendChild pick().render()
