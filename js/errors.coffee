class NotImplementedError extends Error
  constructor: () ->
    @name = 'NotImplementedError'
    @message = 'Not implemented yet'
    @stack = (new Error()).stack

root = exports ? this  # Node.js vs. Browser
root.game ?= {}
root.game.errors ?= {}
root.game.errors.NotImplemented = NotImplementedError
