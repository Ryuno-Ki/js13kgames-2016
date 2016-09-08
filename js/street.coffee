unless NotImplementedError
  if require
    errorsModule = require('../transpiled/errors.js').game.errors
    NotImplementedError = errorsModule.NotImplemented
  else
    NotImplementedError = this.game.errors.NotImplemented


unless AbstractSvgView
  if require
    abstractSvgModule = require('../transpiled/svg.js').game
    AbstractSvgView = abstractSvgModule.views.AbstractSvg
  else
    AbstractSvgView = this.game.views.AbstractSvg


class StreetModel
  constructor: () ->
    this.utilisation = 0
    return this

  getUtilisation: () ->
    return this.utilisation


class AbstractStreetView extends AbstractSvgView
  constructor: () ->
    super()
    @cars = []

  render: () ->
    throw new NotImplementedError()

  getCarsOnIt: () ->
    return @cars.length

  enter: (vehicle) ->
    @cars.push(vehicle)
    event = new global.window.CustomEvent('car-leaving')
    global.document.dispatchEvent(event)
    return


class HorizontalStreetView extends AbstractStreetView
  constructor: () ->
    super()
    @cars = []
    return this

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    leftBoundary = document.createElementNS svgns, 'path'
    leftBoundary.setAttribute 'd', 'M0 33H100'
    middleBoundary = document.createElementNS svgns, 'path'
    middleBoundary.setAttribute 'd', 'M0 50H100'
    rightBoundary = document.createElementNS svgns, 'path'
    rightBoundary.setAttribute 'd', 'M0 67H100'

    g.appendChild leftBoundary
    g.appendChild middleBoundary
    g.appendChild rightBoundary

    svgNode.appendChild g
    svgNode.setAttribute 'height', '60'
    svgNode.setAttribute 'width', '60'
    svgNode.setAttribute 'class', 'horizontal street'
    return svgNode

class VerticalStreetView extends AbstractStreetView
  constructor: () ->
    super()
    @cars = []
    return this

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    topBoundary = document.createElementNS svgns, 'path'
    topBoundary.setAttribute 'd', 'M33 0v100'
    middleBoundary = document.createElementNS svgns, 'path'
    middleBoundary.setAttribute 'd', 'M50 0v100'
    bottomBoundary = document.createElementNS svgns, 'path'
    bottomBoundary.setAttribute 'd', 'M67 0v100'

    g.appendChild topBoundary
    g.appendChild middleBoundary
    g.appendChild bottomBoundary

    svgNode.appendChild g
    svgNode.setAttribute 'height', '60'
    svgNode.setAttribute 'width', '60'
    svgNode.setAttribute 'class', 'vertical street'
    return svgNode


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Street = StreetModel

root.game.views ?= {}
root.game.views.AbstractStreet = AbstractStreetView
root.game.views.HorizontalStreet = HorizontalStreetView
root.game.views.VerticalStreet = VerticalStreetView
