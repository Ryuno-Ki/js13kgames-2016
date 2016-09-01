unless NotImplementedError
  if require
    errorsModule = require('../transpiled/errors.js').game.errors
    NotImplementedError = errorsModule.NotImplemented
  else
    NotImplementedError = this.game.errors.NotImplemented

class StreetModel
  constructor: () ->
    this.utilisation = 0
    return this

  getUtilisation: () ->
    return this.utilisation


class AbstractStreetView
  constructor: () ->
    @precursor = null
    @successor = null

  getTileBefore: () ->
    return this.precursor

  getTileAfter: () ->
    return this.successor

  getTileContext: () ->
    svgns = @getTileContextNamespace()
    svgNode = document.createElementNS(@svgns, 'svg')
    svgNode.setAttribute('viewBox', '0 0 100 100')
    svgNode.setAttribute('xmlns', @svgns)
    svgNode.setAttribute('version', '1.1')
    svgNode.setAttribute('height', '60')
    svgNode.setAttribute('width', '60')
    return svgNode

  getTileContextNamespace: () ->
    return 'http://www.w3.org/2000/svg'

  render: () ->
    throw new NotImplementedError()


class StreetView extends AbstractStreetView
  constructor: (precursor, successor) ->
    @precursor = precursor || null
    @successor = successor || null

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

    g.appendChild(leftBoundary)
    g.appendChild(middleBoundary)
    g.appendChild(rightBoundary)
    svgNode.appendChild(g)
    return svgNode

  enter: () ->
    event = new global.window.CustomEvent('car-leaving')
    global.document.dispatchEvent(event)
    return

  getCarsOnIt: () ->
    return 0

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Street = StreetModel

root.game.views ?= {}
root.game.views.AbstractStreet = AbstractStreetView
root.game.views.Street = StreetView
