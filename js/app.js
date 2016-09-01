map = document.getElementById 'map'
hsv = game.views.HorizontalStreet
vsv = game.views.VerticalStreet
ltc = game.views.LeftTopCurve
rtc = game.views.RightTopCurve
lbc = game.views.LeftBottomCurve
rbc = game.views.RightBottomCurve
cr = game.views.Crossroad

pick = () ->
  choices = [hsv, vsv, ltc, rtc, lbc, rbc, cr]
  tile = choices[Math.floor(Math.random() * choices.length)]
  return new tile()

for tileNum in [1..25]
  map.appendChild pick().render()
