unless AbstractSvgView
  if require
    abstractSvgModule = require('../transpiled/svg.js').game
    AbstractSvgView = abstractSvgModule.views.AbstractSvg
  else
    AbstractSvgView = this.game.views.AbstractSvg

class TrafficLightModel
  constructor: () ->
    this._states = ['red', 'yellow', 'green']
    this._currentState = this._states[0]
    this._redToGreen = true
    return

  getStates: () ->
    # Arrays are passed by reference. Don't leak internal state.
    return this._states.slice(0)

  getState: () ->
    return this._currentState

  cycle: () ->
    states = this._states
    current = this._currentState
    [red, yellow, green] = this._states
    currentPosition = states.indexOf(current)

    if this._redToGreen
      if current == red
        this._currentState = states[1]
      else if (current == yellow)
        this._currentState = states[2]
      else  # <=> currentPosition == 2
        # Reached upper limit
        this._redToGreen = false
        this._currentState = states[1]
    else
      # Cycling downwards
      if (current == green)
        this._currentState = states[1]
      else if (current == yellow)
        this._currentState = states[0]
      else # <=> currentPosition == 0
        this._redToGreen = true
        this._currentState = states[1]
    return this._currentState


class TrafficLightView extends AbstractSvgView
  constructor: () ->
    super()

  render: () ->
    svgns = @getTileContextNamespace()
    svgNode = @getTileContext()

    g = document.createElementNS svgns, 'g'
    device = document.createElementNS svgns, 'path'
    device.setAttribute 'd', 'M33 0h33v60h-11v40h-11v-40h-11z'
    device.setAttribute 'class', 'device'

    redLight = document.createElementNS svgns, 'circle'
    redLight.setAttribute 'r', '10'
    redLight.setAttribute 'cx', '50'
    redLight.setAttribute 'cy', '10'
    redLight.setAttribute 'class', 'red light'

    yellowLight = document.createElementNS svgns, 'circle'
    yellowLight.setAttribute 'r', '10'
    yellowLight.setAttribute 'cx', '50'
    yellowLight.setAttribute 'cy', '30'
    yellowLight.setAttribute 'class', 'yellow light'

    greenLight = document.createElementNS svgns, 'circle'
    greenLight.setAttribute 'r', '10'
    greenLight.setAttribute 'cx', '50'
    greenLight.setAttribute 'cy', '50'
    greenLight.setAttribute 'class', 'green light'

    g.appendChild redLight
    g.appendChild yellowLight
    g.appendChild greenLight

    svgNode.appendChild g
    svgNode.setAttribute 'height', '40'
    svgNode.setAttribute 'width', '40'
    svgNode.setAttribute 'class', 'traffic-light'
    return svgNode
 

root = exports ? this  # Nodejs. vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.TrafficLight = TrafficLightModel

root.game.views ?= {}
root.game.views.TrafficLight = TrafficLightView
