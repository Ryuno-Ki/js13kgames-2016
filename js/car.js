class Car
  constructor: () ->
    this._id = null
    this._driving = false
    return

  accelerate: () ->
    this._driving = true
    return this.isDriving()

  isDriving: () ->
    return this._driving

  stop: () ->
    this._driving = false
    return this.isDriving()

root = exports ? this  # Node.js vs. Browser
root.Car = Car
