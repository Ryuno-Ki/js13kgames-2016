unless StreetModel
  if require
    StreetModel = require('../transpiled/street.js').game.models.Street
  else
    StreetModel = this.game.models.Street

unless StreetView
  if require
    StreetView = require('../transpiled/street.js').game.views.Street
  else
    StreetView = this.game.views.Street

class CrossroadModel extends StreetModel
  getUtilisation: () ->
    return 0

class CrossroadView extends StreetView
  constructor: () ->
    super()

  render: () ->
    svgns = @svgns
    g = document.createElementNS svgns, 'g'
    leftTopBoundary = document.createElementNS svgns, 'path'
    leftTopBoundary.setAttribute 'd', 'M0 33h33v-33'
    leftBottomBoundary = document.createElementNS svgns, 'path'
    leftBottomBoundary.setAttribute 'd', 'M67 0v33h33'
    rightTopBoundary = document.createElementNS svgns, 'path'
    rightTopBoundary.setAttribute 'd', 'M0 67h33v33'
    rightBottomBoundary = document.createElementNS svgns, 'path'
    rightBottomBoundary.setAttribute 'd', 'M100 67h-33v33'

    g.appendChild(leftTopBoundary)
    g.appendChild(leftBottomBoundary)
    g.appendChild(rightTopBoundary)
    g.appendChild(rightBottomBoundary)
    @svgNode.appendChild(g)
    return @svgNode.cloneNode true

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Crossroad = CrossroadModel

root.game.views ?= {}
root.game.views.Crossroad = CrossroadView
