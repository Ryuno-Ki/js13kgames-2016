class StreetModel
  constructor: () ->
    this.utilisation = 0

  getUtilisation: () ->
    return this.utilisation

class StreetView
  constructor: (precursor, successor) ->

    this.precursor = precursor || null
    this.successor = successor || null

    @svgns = 'http://www.w3.org/2000/svg'
    @svgNode = document.createElementNS(@svgns, 'svg')
    @svgNode.setAttribute('viewBox', '0 0 100 100')
    @svgNode.setAttribute('xmlns', @svgns)
    @svgNode.setAttribute('version', '1.1')
    @svgNode.setAttribute('height', '60')
    @svgNode.setAttribute('width', '60')

  render: () ->
    svgns = @svgns
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
    @svgNode.appendChild(g)
    return @svgNode.cloneNode true

  enter: () ->
    event = new global.window.CustomEvent('car-leaving')
    global.document.dispatchEvent(event)
    console.log('Dispatched', event)
    return

  getCarsOnIt: () ->
    return 0

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Street = StreetModel

root.game.views ?= {}
root.game.views.Street = StreetView
