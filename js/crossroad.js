unless StreetModel
  class StreetModel
    constructor: () ->

class CrossroadModel extends StreetModel
  getTrafficLights: () ->
    return []

root = exports ? this  # Node.js vs Browser
root.CrossroadModel = CrossroadModel
