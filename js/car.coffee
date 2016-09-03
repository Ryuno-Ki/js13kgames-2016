class CarModel
  constructor: () ->
    this._id = null
    this._driving = false
    return this

  accelerate: () ->
    this._driving = true
    return this.isDriving()

  isDriving: () ->
    return this._driving

  stop: () ->
    this._driving = false
    return this.isDriving()


class CarView
  constructor: () ->

  on: (event, callback) ->
    callback()
    return

  getTileContext: () ->
    svgns = @getTileContextNamespace()
    svgNode = document.createElementNS svgns, 'svg'
    svgNode.setAttribute 'viewBox', '0 0 100 100'
    svgNode.setAttribute 'xmlns', svgns
    svgNode.setAttribute 'version', '1.1'
    svgNode.setAttribute 'height', '15'
    svgNode.setAttribute 'width', '15'
    return svgNode

  getTileContextNamespace: () ->
    return 'http://www.w3.org/2000/svg'

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    topLeftWheel = document.createElementNS svgns, 'rect'
    topLeftWheel.setAttribute 'x', 10
    topLeftWheel.setAttribute 'y', 10
    topLeftWheel.setAttribute 'height', 20
    topLeftWheel.setAttribute 'width', 10
    topLeftWheel.setAttribute 'class', 'wheel'

    topRightWheel = document.createElementNS svgns, 'rect'
    topRightWheel.setAttribute 'x', 80
    topRightWheel.setAttribute 'y', 10
    topRightWheel.setAttribute 'height', 20
    topRightWheel.setAttribute 'width', 10
    topRightWheel.setAttribute 'class', 'wheel'

    bottomLeftWheel = document.createElementNS svgns, 'rect'
    bottomLeftWheel.setAttribute 'x', 10
    bottomLeftWheel.setAttribute 'y', 70
    bottomLeftWheel.setAttribute 'height', 20
    bottomLeftWheel.setAttribute 'width', 10
    bottomLeftWheel.setAttribute 'class', 'wheel'

    bottomRightWheel = document.createElementNS svgns, 'rect'
    bottomRightWheel.setAttribute 'x', 80
    bottomRightWheel.setAttribute 'y', 70
    bottomRightWheel.setAttribute 'height', 20
    bottomRightWheel.setAttribute 'width', 10
    bottomRightWheel.setAttribute 'class', 'wheel'

    chassis = document.createElementNS svgns, 'rect'
    chassis.setAttribute 'x', 20
    chassis.setAttribute 'y', 5
    chassis.setAttribute 'height', 90
    chassis.setAttribute 'width', 60
    chassis.setAttribute 'class', 'chassis'

    g.appendChild topLeftWheel
    g.appendChild topRightWheel
    g.appendChild bottomLeftWheel
    g.appendChild bottomRightWheel
    g.appendChild chassis

    svgNode.appendChild g
    svgNode.setAttribute 'class', 'car'
    return svgNode


root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Car = CarModel

root.game.views ?= {}
root.game.views.Car = CarView
