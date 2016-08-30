(function() {
  var TrafficLight, base, root;

  TrafficLight = (function() {
    function TrafficLight() {
      this._states = ['red', 'yellow', 'green'];
      this._currentState = this._states[0];
      this._redToGreen = true;
      return;
    }

    TrafficLight.prototype.getStates = function() {
      return this._states.slice(0);
    };

    TrafficLight.prototype.getState = function() {
      return this._currentState;
    };

    TrafficLight.prototype.cycle = function() {
      var current, currentPosition, green, red, ref, states, yellow;
      states = this._states;
      current = this._currentState;
      ref = this._states, red = ref[0], yellow = ref[1], green = ref[2];
      currentPosition = states.indexOf(current);
      if (this._redToGreen) {
        if (current === red) {
          this._currentState = states[1];
        } else if (current === yellow) {
          this._currentState = states[2];
        } else {
          this._redToGreen = false;
          this._currentState = states[1];
        }
      } else {
        if (current === green) {
          this._currentState = states[1];
        } else if (current === yellow) {
          this._currentState = states[0];
        } else {
          this._redToGreen = true;
          this._currentState = states[1];
        }
      }
      return this._currentState;
    };

    return TrafficLight;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.TrafficLight = TrafficLight;

}).call(this);
