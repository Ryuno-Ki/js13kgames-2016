class StreetModel
  constructor: () ->
    this.utilisation = 0

  getUtilisation: () ->
    return this.utilisation

class StreetView
  constructor: (precursor, successor) ->
    this.precursor = precursor || null
    this.successor = successor || null

  render: () ->
    svgns = 'http://www.w3.org/2000/svg'
    el = document.createElementNS(svgns, 'svg')
    el.setAttribute('viewBox', '0 0 100 100')
    el.setAttribute('xmlns', svgns)
    el.setAttribute('version', '1.1')
    el.setAttribute('height', '60')
    el.setAttribute('width', '60')

    g = document.createElementNS(svgns'g')
    leftBoundary = document.createElementNS(svgns, 'path')
    leftBoundary.setAttribute('d', 'M0 33H100')
    rightBoundary = document.createElementNS(svgns, 'path')
    leftBoundary.setAttribute('d', 'M0 67H100')
    middleBoundary = document.createElementNS(svgns, 'path')
    middleBoundary.setAttribute('d', 'M0 50H10')

    g.appendChild(leftBoundary)
    g.appendChild(middleBoundary)
    g.appendChild(rightBoundary)
    el.appendChild(g)
    return el

  enter: () ->

root = exports ? this  # Node.js vs. Browser
root.StreetModel = StreetModel
root.StreetView = StreetView
