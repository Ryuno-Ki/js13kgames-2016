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
    allowedNeighborhood = {
      '+':
        name: 'crossroad'
        above: ['+', '|', '^', '>']
        below: ['+', '|', 'v', '<']
        leftHand: ['+', '-', '>', 'v']
        rightHand: ['+', '-', '^', '<']
      '-':
        name: 'horizontal'
        above: []
        below: []
        leftHand: ['+', '-', '>', 'v']
        rightHand: ['+', '-', '^', '<']
      '|':
        name: 'vertical'
        above: ['+', '|', '^', '>']
        below: ['+', '|', 'v', '<']
        leftHand: []
        rightHand: []
      '^':
        name: 'left-top'
        above: ['+', '|', '^', '>']
        below: []
        leftHand: ['+', '-', '>', 'v']
        rightHand: []
      '>':
        name: 'right-top'
        above: ['+', '|', '^', '>']
        below: []
        leftHand: []
        rightHand: ['+', '-', '^', '<']
      'v':
        name: 'right-bottom'
        above: []
        below: ['+', '|', 'v', '<']
        leftHand: []
        rightHand: ['+', '-', '^', '<']
      '<':
        name: 'left-bottom'
        above: []
        below: ['+', '|', 'v', '<']
        leftHand: ['+', '-', '>', 'v']
        rightHand: []
    }

    tileCandidates = []
    for direction, envSign of environment
      console.log 'sign is', direction, envSign
      if envSign is null
        continue
      for sign, details of allowedNeighborhood
        if envSign is ''
          tileCandidates.push sign
          continue

        console.log 'inclusion check', envSign, details[direction]
        if envSign in details[direction]
          tileCandidates.push sign

    console.log 'closer choice', tileCandidates
    return tileCandidates[0]


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Map = MapModel
