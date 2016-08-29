unless StreetModel
  class StreetModel
    constructor: () ->

class CrossroadModel extends StreetModel
  getUtilisation: () ->
    return 0

root = exports ? this  # Node.js vs Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Crossroad = CrossroadModel
