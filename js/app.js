map = document.getElementById 'map'
hsv = game.views.HorizontalStreet
vsv = game.views.VerticalStreet
cr = game.views.Crossroad

pick = () ->
  choices = [hsv, vsv, cr]
  tile = choices[Math.floor(Math.random() * choices.length)]
  console.log("New tile", tile)
  return new tile()

for tileNum in [1..25]
  map.appendChild pick().render()
