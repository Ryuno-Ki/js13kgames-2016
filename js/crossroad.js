unless StreetModel
  class StreetModel
    constructor: () ->

unless StreetView
  class StreetView
    constructor: () ->
      @svgns = 'http://www.w3.org/2000/svg'
      @svgNode = document.createElementNS(@svgns, 'svg')
      @svgNode.setAttribute('viewBox', '0 0 100 100')
      @svgNode.setAttribute('xmlns', @svgns)
      @svgNode.setAttribute('version', '1.1')
      @svgNode.setAttribute('height', '60')
      @svgNode.setAttribute('width', '60')

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
