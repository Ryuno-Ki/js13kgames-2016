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
    map[row][col] = @pickTile(environment)
    return map

  pickTile: (environment) ->
    allowedNeighborhood = {
      above: [
        MapModel.SIGNS.LEFT_TOP
        MapModel.SIGNS.RIGHT_TOP
        MapModel.SIGNS.VERTICAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
      below: [
        MapModel.SIGNS.RIGHT_BOTTOM
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.VERTICAL
        MapModel.SIGNS.CROSSROAD
        MapModel.SIGNS.ANY
      ]
      leftHand: [
        MapModel.SIGNS.LEFT_BOTTOM
        MapModel.SIGNS.LEFT_TOP
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

    # Copy of values
    tileCandidates = ([v for k, v of MapModel.SIGNS])[0]
    tileSet = ([s for s in tileCandidates when s isnt MapModel.SIGNS.ANY])[0]

    if environment.above is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.above

    if environment.rightHand is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.rightHand
    # else if tileCandidates.length > 1
    #   tileCandidates = tileCandidates.filter (tile) ->
    #     tile in allowedNeighborhood.rightHand

    if environment.leftHand is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.leftHand
    # else if tileCandidates.length > 1
    #   tileCandidates = tileCandidates.filter (tile) ->
    #     tile in allowedNeighborhood.leftHand

    if environment.below is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.below
    # else if tileCandidates.length > 1
    #   tileCandidates = tileCandidates.filter (tile) ->
    #     tile in allowedNeighborhood.below

    if MapModel.SIGNS.ANY in tileCandidates  # arbitrary tile
      tileCandidates = tileSet[Math.floor(Math.random() * tileSet.length)]
    return tileCandidates[0]


class MapView
  constructor: (node) ->
    @node = node

  render: (mapData) ->
    console.log 'Translating into DOM:'
    console.log mapData.map

    for row in [0...mapData.numRows]
      for col in [0...mapData.numCols]
        sign = mapData.map[row][col]
        view = @getViewForSign sign
        @node.appendChild view.render()

  getViewForSign: (sign) ->
    switch sign
      when MapModel.SIGNS.LEFT_TOP then view = LeftTopCurveView
      when MapModel.SIGNS.RIGHT_TOP then view = RightTopCurveView
      when MapModel.SIGNS.RIGHT_BOTTOM then view = RightBottomCurveView
      when MapModel.SIGNS.LEFT_BOTTOM then view = LeftBottomCurveView
      when MapModel.SIGNS.HORIZONTAL then view = HorizontalStreetView
      when MapModel.SIGNS.VERTICAL then view = VerticalStreetView
      when MapModel.SIGNS.CROSSROAD then view = CrossroadView
    return new view()


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Map = MapModel

root.game.views ?= {}
root.game.views.Map = MapView