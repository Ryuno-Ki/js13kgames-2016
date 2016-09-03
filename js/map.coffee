class MapModel
  constructor: (canvasHeight, canvasWidth) ->
    @canvasHeight = canvasHeight or 360
    @canvasWidth = canvasWidth or 300
    @tileHeight = 60
    @tileWidth = 60

  getCanvasHeight: () ->
    return @canvasHeight

  getCanvasWidth: () ->
    return @canvasWidth

  calculateMap: () ->
    map = @_initMap()
    numRows = map.numRows
    numCols = map.numCols

    for row in [0..numRows]
      for col in [0..numCols]
        @_setTile [row, col], map

    console.log '\n', map, '\n'
    return JSON.stringify map

  _initMap: () ->
    map = []
    numRows = Math.floor(@canvasHeight / @tileHeight)
    numCols = Math.floor(@canvasWidth / @tileWidth)
    map.numRows = numRows
    map.numCols = numCols

    for row in [0..numRows]
      map[row] = []
      for col in [0..numCols]
        map[row][col] = ''

    return map

  _setTile: (position, map) ->
    [x, y] = position
    numRows = map.numRows
    numCols = map.numCols

    environment = {
      above: if x > 0 then map[x - 1][y] else null
      below: if x < numRows then map[x + 1][y] else null
      leftHand: if y > 0 then map[x][y - 1] else null
      rightHand: if y < numCols then map[x][y + 1] else null
    }
    map[x][y] = @_pickTile(environment)
    return map

  _pickTile: (environment) ->
    # ^ is left-top curve
    # > is right-top curve
    # v is right-bottom curve
    # < is left-bottom curve
    # - is horizontal street
    # | is vertical street
    # + is a crossroad
    allowedNeighborhood = {
      above: ['^', '>', '|', '+', '']
      below: ['v', '<', '|', '+', '']
      leftHand: ['v', '>', '-', '+', '']
      rightHand: ['^', '<', '-', '+', '']
    }
    tileCandidates = ['^', '>', 'v', '<', '-', '|', '+']
    tileSet = tileCandidates[..]  # Copy of values
    tileCandidates.push('')

    if environment.above is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.above

    if environment.leftHand is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.leftHand
    else if tileCandidates.length > 1
      tileCandidates = tileCandidates.filter (tile) ->
        tile in allowedNeighborhood.leftHand

    if environment.below is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.below
    else if tileCandidates.length > 1
      tileCandidates = tileCandidates.filter (tile) ->
        tile in allowedNeighborhood.below

    if environment.rightHand is null
      tileCandidates = tileCandidates.filter (tile) ->
        tile not in allowedNeighborhood.rightHand
    else if tileCandidates.length > 1
      tileCandidates = tileCandidates.filter (tile) ->
        tile in allowedNeighborhood.rightHand

    if '' in tileCandidates  # arbitrary tile
      tileCandidates = tileSet[Math.floor(Math.random() * tileSet.length)]
    return tileCandidates[0]


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Map = MapModel
