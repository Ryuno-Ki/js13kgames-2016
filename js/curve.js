unless AbstractStreetView
  if require
    streetModule = require('../transpiled/street.js').game
    AbstractStreetView = streetModule.views.AbstractStreet
  else
    AbstractStreetView = this.game.views.AbstractStreet

class AbstractCurveView extends AbstractStreetView
  constructor: () ->
    super()


class LeftTopCurveView extends AbstractCurveView
  constructor: () ->
    @cars = []

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    leftTopBoundary = document.createElementNS svgns, 'path'
    leftTopBoundary.setAttribute 'd', 'M0 33h33v-33'
    rightBottomBoundary = document.createElementNS svgns, 'path'
    rightBottomBoundary.setAttribute 'd', 'M0 67h67v-67'

    g.appendChild(leftTopBoundary)
    g.appendChild(rightBottomBoundary)

    svgNode.appendChild(g)
    svgNode.setAttribute 'class', 'left-top curve street'
    return svgNode


class RightTopCurveView extends AbstractCurveView
  constructor: () ->
    @cars = []

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    rightTopBoundary = document.createElementNS svgns, 'path'
    rightTopBoundary.setAttribute 'd', 'M100 33h-33v-33'
    leftBottomBoundary = document.createElementNS svgns, 'path'
    leftBottomBoundary.setAttribute 'd', 'M100 67h-67v-67'

    g.appendChild(rightTopBoundary)
    g.appendChild(leftBottomBoundary)

    svgNode.appendChild(g)
    svgNode.setAttribute 'class', 'right-top curve street'
    return svgNode


class LeftBottomCurveView extends AbstractCurveView
  constructor: () ->
    @cars = []

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    leftTopBoundary = document.createElementNS svgns, 'path'
    leftTopBoundary.setAttribute 'd', 'M0 33h67v67'
    rightBottomBoundary = document.createElementNS svgns, 'path'
    rightBottomBoundary.setAttribute 'd', 'M0 67h33v33'

    g.appendChild(leftTopBoundary)
    g.appendChild(rightBottomBoundary)

    svgNode.appendChild(g)
    svgNode.setAttribute 'class', 'left-bottom curve street'
    return svgNode


class RightBottomCurveView extends AbstractCurveView
  constructor: () ->
    @cars = []

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    rightTopBoundary = document.createElementNS svgns, 'path'
    rightTopBoundary.setAttribute 'd', 'M100 33h-67v67'
    leftBottomBoundary = document.createElementNS svgns, 'path'
    leftBottomBoundary.setAttribute 'd', 'M100 67h-33v67'

    g.appendChild(rightTopBoundary)
    g.appendChild(leftBottomBoundary)

    svgNode.appendChild(g)
    svgNode.setAttribute 'class', 'right-bottom curve street'
    return svgNode


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.views ?= {}
root.game.views.AbstractCurve = AbstractCurveView
root.game.views.LeftTopCurve = LeftTopCurveView
root.game.views.RightTopCurve = RightTopCurveView
root.game.views.LeftBottomCurve = LeftBottomCurveView
root.game.views.RightBottomCurve = RightBottomCurveView
