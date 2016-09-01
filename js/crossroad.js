unless StreetModel
  if require
    StreetModel = require('../transpiled/street.js').game.models.Street
  else
    StreetModel = this.game.models.Street

unless AbstractStreetView
  if require
    streetModule = require('../transpiled/street.js').game
    AbstractStreetView = streetModule.views.AbstractStreet
  else
    AbstractStreetView = this.game.views.AbstractStreet

class CrossroadModel extends StreetModel
  getUtilisation: () ->
    return 0

class CrossroadView extends AbstractStreetView
  constructor: () ->
    super()

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    leftTopBoundary = document.createElementNS svgns, 'path'
    leftTopBoundary.setAttribute 'd', 'M0 33h33v-33'
    leftBottomBoundary = document.createElementNS svgns, 'path'
    leftBottomBoundary.setAttribute 'd', 'M67 0v33h33'
    rightTopBoundary = document.createElementNS svgns, 'path'
    rightTopBoundary.setAttribute 'd', 'M0 67h33v33'
    rightBottomBoundary = document.createElementNS svgns, 'path'
    rightBottomBoundary.setAttribute 'd', 'M100 67h-33v33'
    leftRightCrossline = document.createElementNS svgns, 'path'
    leftRightCrossline.setAttribute 'd', 'M5 50 h90'
    topBottomCrossline = document.createElementNS svgns, 'path'
    topBottomCrossline.setAttribute 'd', 'M50 5 v90'

    g.appendChild(leftTopBoundary)
    g.appendChild(leftBottomBoundary)
    g.appendChild(rightTopBoundary)
    g.appendChild(rightBottomBoundary)
    g.appendChild(leftRightCrossline)
    g.appendChild(topBottomCrossline)
    svgNode.appendChild(g)
    return svgNode

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Crossroad = CrossroadModel

root.game.views ?= {}
root.game.views.Crossroad = CrossroadView
