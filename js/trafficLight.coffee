unless AbstractSvgView
  if require
    abstractSvgModule = require('../transpiled/svg.js').game
    AbstractSvgView = abstractSvgModule.views.AbstractSvg
  else
    AbstractSvgView = this.game.views.AbstractSvg


class TrafficLightModel
  constructor: () ->
    @_states = ['red', 'yellow', 'green']
    @_currentState = @_states[0]
    @_redToGreen = true
    return

  getStates: () ->
    # Arrays are passed by reference. Don't leak internal state.
    return @_states.slice(0)

  getState: () ->
    return @_currentState

  setState: (newState) ->
    @._currentState = @_states[@_states.indexOf newState]
    return

  cycle: () ->
    states = @_states
    current = @_currentState
    [red, yellow, green] = @_states
    currentPosition = states.indexOf(current)

    if @_redToGreen
      if current == red
        @_currentState = states[1]
      else if (current == yellow)
        @_currentState = states[2]
      else  # <=> currentPosition == 2
        # Reached upper limit
        @_redToGreen = false
        @_currentState = states[1]
    else
      # Cycling downwards
      if (current == green)
        @_currentState = states[1]
      else if (current == yellow)
        @_currentState = states[0]
      else # <=> currentPosition == 0
        @_redToGreen = true
        @_currentState = states[1]
    return @_currentState


class TrafficLightView extends AbstractSvgView
  constructor: () ->
    super()
    @node = null
    @model = null
    @state = 'red'

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
    redLight.setAttribute 'class', 'current red light'

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
    @node = svgNode
    @on 'click'
    return svgNode

  bindTo: (model) =>
    @model = model
    Object.defineProperty this, 'state', {
      enumerable: true
      get: () ->
        return model.getState()
      set: (state) ->
        model.setState state

        currentLight = @node.querySelector '.current.light'
        currentLight.classList.remove 'current'

        newLight = @node.querySelector('.' + state)
        newLight.classList.add 'current'
        return
    }

  on: (event, callback) ->
    @node.addEventListener event, (ev) =>
      switch ev.type
        when 'click' then @cycleState()

      if callback
        callback()
    return

  cycleState: () ->
    @state = @model.cycle()
 

root = exports ? this  # Nodejs. vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.TrafficLight = TrafficLightModel

root.game.views ?= {}
root.game.views.TrafficLight = TrafficLightView
