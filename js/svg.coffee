class AbstractSvgView
  constructor: () ->

  getTileContext: () ->
    svgns = @getTileContextNamespace()
    svgNode = document.createElementNS svgns, 'svg'
    svgNode.setAttribute 'viewBox', '0 0 100 100'
    svgNode.setAttribute 'xmlns', svgns
    svgNode.setAttribute 'version', '1.1'
    svgNode.setAttribute 'height', '40'
    svgNode.setAttribute 'width', '40'
    return svgNode

  getTileContextNamespace: () ->
    return 'http://www.w3.org/2000/svg'

  
root = exports ? this  # Nodejs. vs. Browser
root.game ?= {}
root.game.views ?= {}
root.game.views.AbstractSvg = AbstractSvgView
