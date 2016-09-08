(function() {
  var AbstractStreetView, AbstractSvgView, HorizontalStreetView, NotImplementedError, StreetModel, VerticalStreetView, abstractSvgModule, base, base1, errorsModule, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (!NotImplementedError) {
    if (require) {
      errorsModule = require('../transpiled/errors.js').game.errors;
      NotImplementedError = errorsModule.NotImplemented;
    } else {
      NotImplementedError = this.game.errors.NotImplemented;
    }
  }

  if (!AbstractSvgView) {
    if (require) {
      abstractSvgModule = require('../transpiled/svg.js').game;
      AbstractSvgView = abstractSvgModule.views.AbstractSvg;
    } else {
      AbstractSvgView = this.game.views.AbstractSvg;
    }
  }

  StreetModel = (function() {
    function StreetModel() {
      this.utilisation = 0;
      return this;
    }

    StreetModel.prototype.getUtilisation = function() {
      return this.utilisation;
    };

    return StreetModel;

  })();

  AbstractStreetView = (function(superClass) {
    extend(AbstractStreetView, superClass);

    function AbstractStreetView() {
      AbstractStreetView.__super__.constructor.call(this);
      this.cars = [];
    }

    AbstractStreetView.prototype.render = function() {
      throw new NotImplementedError();
    };

    AbstractStreetView.prototype.getCarsOnIt = function() {
      return this.cars.length;
    };

    AbstractStreetView.prototype.enter = function(vehicle) {
      var event;
      this.cars.push(vehicle);
      event = new global.window.CustomEvent('car-leaving');
      global.document.dispatchEvent(event);
    };

    return AbstractStreetView;

  })(AbstractSvgView);

  HorizontalStreetView = (function(superClass) {
    extend(HorizontalStreetView, superClass);

    function HorizontalStreetView() {
      HorizontalStreetView.__super__.constructor.call(this);
      this.cars = [];
      return this;
    }

    HorizontalStreetView.prototype.render = function() {
      var g, leftBoundary, middleBoundary, rightBoundary, svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      leftBoundary = document.createElementNS(svgns, 'path');
      leftBoundary.setAttribute('d', 'M0 33H100');
      middleBoundary = document.createElementNS(svgns, 'path');
      middleBoundary.setAttribute('d', 'M0 50H100');
      rightBoundary = document.createElementNS(svgns, 'path');
      rightBoundary.setAttribute('d', 'M0 67H100');
      g.appendChild(leftBoundary);
      g.appendChild(middleBoundary);
      g.appendChild(rightBoundary);
      svgNode.appendChild(g);
      svgNode.setAttribute('height', '60');
      svgNode.setAttribute('width', '60');
      svgNode.setAttribute('class', 'horizontal street');
      return svgNode;
    };

    return HorizontalStreetView;

  })(AbstractStreetView);

  VerticalStreetView = (function(superClass) {
    extend(VerticalStreetView, superClass);

    function VerticalStreetView() {
      VerticalStreetView.__super__.constructor.call(this);
      this.cars = [];
      return this;
    }

    VerticalStreetView.prototype.render = function() {
      var bottomBoundary, g, middleBoundary, svgNode, svgns, topBoundary;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      topBoundary = document.createElementNS(svgns, 'path');
      topBoundary.setAttribute('d', 'M33 0v100');
      middleBoundary = document.createElementNS(svgns, 'path');
      middleBoundary.setAttribute('d', 'M50 0v100');
      bottomBoundary = document.createElementNS(svgns, 'path');
      bottomBoundary.setAttribute('d', 'M67 0v100');
      g.appendChild(topBoundary);
      g.appendChild(middleBoundary);
      g.appendChild(bottomBoundary);
      svgNode.appendChild(g);
      svgNode.setAttribute('height', '60');
      svgNode.setAttribute('width', '60');
      svgNode.setAttribute('class', 'vertical street');
      return svgNode;
    };

    return VerticalStreetView;

  })(AbstractStreetView);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Street = StreetModel;

  if ((base1 = root.game).views == null) {
    base1.views = {};
  }

  root.game.views.AbstractStreet = AbstractStreetView;

  root.game.views.HorizontalStreet = HorizontalStreetView;

  root.game.views.VerticalStreet = VerticalStreetView;

}).call(this);
