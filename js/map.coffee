unless LeftTopCurveView
  if require
    curveModule = require('../transpiled/curve.js').game
    LeftTopCurveView = curveModule.views.LeftTopCurve
  else
    LeftTopCurveView = this.game.views.LeftTopCurve

unless CrossroadView
  if require
    curveModule = require('../transpiled/curve.js').game
    RightTopCurveView = curveModule.views.RightTopCurve
  else
    RightTopCurveView = this.game.views.RightTopCurve

unless LeftBottomCurveView
  if require
    curveModule = require('../transpiled/curve.js').game
    LeftBottomCurveView = curveModule.views.LeftBottomCurve
  else
    LeftBottomCurveView = this.game.views.LeftBottomCurve

unless RightBottomCurveView
  if require
    curveModule = require('../transpiled/curve.js').game
    RightBottomCurveView = curveModule.views.RightBottomCurve
  else
    RightBottomCurveView = this.game.views.RightBottomCurve

unless HorizontalStreetView
  if require
    streetModule = require('../transpiled/street.js').game
    HorizontalStreetView = streetModule.views.HorizontalStreet
  else
    HorizontalStreetView = this.game.views.HorizontalStreet

unless VerticalStreetView
  if require
    streetModule = require('../transpiled/street.js').game
    VerticalStreetView = streetModule.views.VerticalStreet
  else
    VerticalStreetView = this.game.views.VerticalStreet

unless CrossroadView
  if require
    crossroadModule = require('../transpiled/crossroad.js').game
    CrossroadView = crossroadModule.views.Crossroad
  else
    CrossroadView = this.game.views.Crossroad

unless TrafficLightView
  if require
    crossroadModule = require('../transpiled/trafficLight.js').game
    TrafficLightView = crossroadModule.views.TrafficLight
  else
    TrafficLightView = this.game.views.TrafficLight

unless CarView
  if require
    carModule = require('../transpiled/car.js').game
    CarView = carModule.views.Car
  else
    CarView = this.game.views.Car


class MapModel
  constructor: (canvasHeight, canvasWidth) ->
    @canvasHeight = canvasHeight or 300
    @canvasWidth = canvasWidth or 300
    @tileHeight = 60
    @tileWidth = 60

    MapModel.SIGNS = {
      LEFT_TOP: '^'
      RIGHT_TOP: '>'
      RIGHT_BOTTOM: 'v'
      LEFT_BOTTOM: '<'
      HORIZONTAL: '-'
      VERTICAL: '|'
      CROSSROAD: '+'
      ANY: '?'
    }

  getCanvasHeight: () ->
    return @canvasHeight

  getCanvasWidth: () ->
    return @canvasWidth

  calculateMap: () ->
    map = @_initMap()
    numRows = map.numRows
    numCols = map.numCols

    for row in [0...numRows]
      for col in [0...numCols]
        @_setTile [row, col], map

    return JSON.stringify {
      "map": map
      "numRows": map.numRows
      "numCols": map.numCols
    }

  _initMap: () ->
    numRows = Math.floor(@canvasHeight / @tileHeight)
    numCols = Math.floor(@canvasWidth / @tileWidth)
    map = []
    map.numRows = numRows
    map.numCols = numCols

    for row in [0...numRows]
      map[row] = []
      for col in [0...numCols]
        map[row][col] = MapModel.SIGNS.ANY

    return map

  _setTile: (position, map) ->
    [row, col] = position
    numRows = map.numRows - 1
    numCols = map.numCols - 1

    environment = {
      above: if row > 0 then map[row - 1][col] else null
      below: if row < numRows then map[row + 1][col] else null
      leftHand: if col > 0 then map[row][col - 1] else null
      rightHand: if col < numCols then map[row][col + 1] else null
    }
    map[row][col] = @pickTile environment
    return map

  pickTile: (environment) ->
    candidates = @filterTileCandidates environment
    tileSet = (s for s in candidates when s isnt MapModel.SIGNS.ANY)

    if MapModel.SIGNS.ANY in candidates  # arbitrary tile
      candidates = tileSet[Math.floor(Math.random() * tileSet.length)]
    else if candidates.length > 1
      candidates = candidates[Math.floor(Math.random() * candidates.length)]

    return candidates[0]

  filterTileCandidates: (environment) ->
    allowedNeighborhood = {
      above: [
        MapModel.SIGNS.LEFT_TOP
        MapModel.SIGNS.RIGHT_TOP
        MapModel.SIGNS.VERTICAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
      below: [
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.RIGHT_BOTTOM
        MapModel.SIGNS.VERTICAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
      leftHand: [
        MapModel.SIGNS.LEFT_TOP
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.HORIZONTAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
      rightHand: [
        MapModel.SIGNS.RIGHT_TOP
        MapModel.SIGNS.RIGHT_BOTTOM
        MapModel.SIGNS.HORIZONTAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
    }

    notAccessibleFrom =
      top: [
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.RIGHT_BOTTOM
        MapModel.SIGNS.HORIZONTAL
      ]
      bottom: [
        MapModel.SIGNS.LEFT_TOP
        MapModel.SIGNS.RIGHT_TOP
        MapModel.SIGNS.HORIZONTAL
      ]
      left: [
        MapModel.SIGNS.RIGHT_TOP
        MapModel.SIGNS.RIGHT_BOTTOM
        MapModel.SIGNS.VERTICAL
      ]
      right: [
        MapModel.SIGNS.LEFT_TOP
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.VERTICAL
      ]

    # Copy of values
    candidates = (v for k, v of MapModel.SIGNS)

    envList = (v for k, v of environment)
    numOfNulls = envList.reduce (sum, item) ->
      sum + (item == null)
    , 0

    if numOfNulls == 2  # Vertex
      if environment.above is null
        candidates = candidates.filter (tile) ->
          tile not in allowedNeighborhood.above

      if environment.rightHand is null
        candidates = candidates.filter (tile) ->
          tile not in allowedNeighborhood.rightHand

      if environment.leftHand is null
        candidates = candidates.filter (tile) ->
          tile not in allowedNeighborhood.leftHand

      if environment.below is null
        candidates = candidates.filter (tile) ->
          tile not in allowedNeighborhood.below

    else if numOfNulls == 1  # Edge
      if environment.above is null
        candidates = notAccessibleFrom.top
      if environment.rightHand is null
        candidates = notAccessibleFrom.right
      if environment.leftHand is null
        candidates = notAccessibleFrom.left
      if environment.below is null
        candidates = notAccessibleFrom.bottom

    else
      if environment.above in notAccessibleFrom.bottom
        if environment.leftHand in notAccessibleFrom.right
          candidates = [MapModel.SIGNS.RIGHT_BOTTOM]
        else
          candidates = [MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.HORIZONTAL]

      else if environment.leftHand in notAccessibleFrom.right
        if environment.above in notAccessibleFrom.bottom
          candidates = [MapModel.SIGNS.RIGHT_BOTTOM]
        else
          candidates = [MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.VERTICAL]

      else  # Environment is accessible from both: above and left
        candidates = [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.CROSSROAD]

    return candidates


class MapView
  constructor: (node) ->
    @node = node

  render: (mapData) ->
    console.log 'Translating into DOM:'
    console.log mapData.map

    for row in [0...mapData.numRows]
      for col in [0...mapData.numCols]
        sign = mapData.map[row][col]
        # FIXME This case should never occur!
        if sign is null
          continue
        tile = @addTrafficLight(@getTileForSign sign)
        @node.appendChild tile
    return

  getTileForSign: (sign) ->
    switch sign
      when MapModel.SIGNS.LEFT_TOP then view = LeftTopCurveView
      when MapModel.SIGNS.RIGHT_TOP then view = RightTopCurveView
      when MapModel.SIGNS.RIGHT_BOTTOM then view = RightBottomCurveView
      when MapModel.SIGNS.LEFT_BOTTOM then view = LeftBottomCurveView
      when MapModel.SIGNS.HORIZONTAL then view = HorizontalStreetView
      when MapModel.SIGNS.VERTICAL then view = VerticalStreetView
      when MapModel.SIGNS.CROSSROAD then view = CrossroadView
    return (new view()).render()

  addTrafficLight: (tile) ->
    if not /crossroad/.test(tile.getAttribute 'class')
      return tile

    trafficLight = (new TrafficLightView()).render()
    tile.appendChild trafficLight
    trafficLight = (new TrafficLightView()).render()
    tile.appendChild trafficLight
    trafficLight = (new TrafficLightView()).render()
    tile.appendChild trafficLight
    trafficLight = (new TrafficLightView()).render()
    tile.appendChild trafficLight
    return tile

  spawnCar: (mapData) ->
    numTiles = mapData.numRows * mapData.numCols
    indexOfTile = Math.floor(Math.random() * numTiles)
    tileWithNewCar = @node.children.item indexOfTile
    tileWithNewCar.appendChild (new CarView()).render()
    return tileWithNewCar


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Map = MapModel

root.game.views ?= {}
root.game.views.Map = MapView
