class TrafficLight
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
