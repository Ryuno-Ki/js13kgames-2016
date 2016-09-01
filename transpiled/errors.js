(function() {
  var NotImplementedError, base, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  NotImplementedError = (function(superClass) {
    extend(NotImplementedError, superClass);

    function NotImplementedError() {
      this.name = 'NotImplementedError';
      this.message = 'Not implemented yet';
      this.stack = (new Error()).stack;
    }

    return NotImplementedError;

  })(Error);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).errors == null) {
    base.errors = {};
  }

  root.game.errors.NotImplemented = NotImplementedError;

}).call(this);
