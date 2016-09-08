(function() {
  var AbstractSvgView, TrafficLightModel, TrafficLightView, abstractSvgModule, base, base1, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (!AbstractSvgView) {
    if (require) {
      abstractSvgModule = require('../transpiled/svg.js').game;
      AbstractSvgView = abstractSvgModule.views.AbstractSvg;
    } else {
      AbstractSvgView = this.game.views.AbstractSvg;
    }
  }

  TrafficLightModel = (function() {
    function TrafficLightModel() {
      this._states = ['red', 'yellow', 'green'];
      this._currentState = this._states[0];
      this._redToGreen = true;
      return;
    }

    TrafficLightModel.prototype.getStates = function() {
      return this._states.slice(0);
    };

    TrafficLightModel.prototype.getState = function() {
      return this._currentState;
    };

    TrafficLightModel.prototype.cycle = function() {
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

    return TrafficLightModel;

  })();

  TrafficLightView = (function(superClass) {
    extend(TrafficLightView, superClass);

    function TrafficLightView() {
      TrafficLightView.__super__.constructor.call(this);
    }

    TrafficLightView.prototype.render = function() {
      var device, g, greenLight, redLight, svgNode, svgns, yellowLight;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      device = document.createElementNS(svgns, 'path');
      device.setAttribute('d', 'M33 0h33v60h-11v40h-11v-40h-11z');
      device.setAttribute('class', 'device');
      redLight = document.createElementNS(svgns, 'circle');
      redLight.setAttribute('r', '10');
      redLight.setAttribute('cx', '50');
      redLight.setAttribute('cy', '10');
      redLight.setAttribute('class', 'red light');
      yellowLight = document.createElementNS(svgns, 'circle');
      yellowLight.setAttribute('r', '10');
      yellowLight.setAttribute('cx', '50');
      yellowLight.setAttribute('cy', '30');
      yellowLight.setAttribute('class', 'yellow light');
      greenLight = document.createElementNS(svgns, 'circle');
      greenLight.setAttribute('r', '10');
      greenLight.setAttribute('cx', '50');
      greenLight.setAttribute('cy', '50');
      greenLight.setAttribute('class', 'green light');
      g.appendChild(redLight);
      g.appendChild(yellowLight);
      g.appendChild(greenLight);
      svgNode.appendChild(g);
      svgNode.setAttribute('height', '40');
      svgNode.setAttribute('width', '40');
      svgNode.setAttribute('class', 'traffic-light');
      return svgNode;
    };

    return TrafficLightView;

  })(AbstractSvgView);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.TrafficLight = TrafficLightModel;

  if ((base1 = root.game).views == null) {
    base1.views = {};
  }

  root.game.views.TrafficLight = TrafficLightView;

}).call(this);
