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
    console.log('Received', event, 'so firing', callback)
    callback()
    return

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.models ?= {}
root.game.models.Car = CarModel

root.game.views ?= {}
root.game.views.Car = CarView
