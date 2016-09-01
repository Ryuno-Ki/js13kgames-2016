(function() {
  var AbstractCurveView, AbstractStreetView, LeftBottomCurveView, LeftTopCurveView, RightBottomCurveView, RightTopCurveView, base, root, streetModule,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (!AbstractStreetView) {
    if (require) {
      streetModule = require('../transpiled/street.js').game;
      AbstractStreetView = streetModule.views.AbstractStreet;
    } else {
      AbstractStreetView = this.game.views.AbstractStreet;
    }
  }

  AbstractCurveView = (function(superClass) {
    extend(AbstractCurveView, superClass);

    function AbstractCurveView() {
      AbstractCurveView.__super__.constructor.call(this);
    }

    return AbstractCurveView;

  })(AbstractStreetView);

  LeftTopCurveView = (function(superClass) {
    extend(LeftTopCurveView, superClass);

    function LeftTopCurveView() {
      LeftTopCurveView.__super__.constructor.call(this);
    }

    LeftTopCurveView.prototype.render = function() {
      var g, leftTopBoundary, rightBottomBoundary, svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      leftTopBoundary = document.createElementNS(svgns, 'path');
      leftTopBoundary.setAttribute('d', 'M0 33h33v-33');
      rightBottomBoundary = document.createElementNS(svgns, 'path');
      rightBottomBoundary.setAttribute('d', 'M0 67h67v-67');
      g.setAttribute('class', 'left-top curve');
      g.appendChild(leftTopBoundary);
      g.appendChild(rightBottomBoundary);
      svgNode.appendChild(g);
      return svgNode;
    };

    return LeftTopCurveView;

  })(AbstractCurveView);

  RightTopCurveView = (function(superClass) {
    extend(RightTopCurveView, superClass);

    function RightTopCurveView() {
      RightTopCurveView.__super__.constructor.call(this);
    }

    RightTopCurveView.prototype.render = function() {
      var g, leftBottomBoundary, rightTopBoundary, svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      rightTopBoundary = document.createElementNS(svgns, 'path');
      rightTopBoundary.setAttribute('d', 'M100 33h-33v-33');
      leftBottomBoundary = document.createElementNS(svgns, 'path');
      leftBottomBoundary.setAttribute('d', 'M100 67h-67v-67');
      g.setAttribute('class', 'right-top curve');
      g.appendChild(rightTopBoundary);
      g.appendChild(leftBottomBoundary);
      svgNode.appendChild(g);
      return svgNode;
    };

    return RightTopCurveView;

  })(AbstractCurveView);

  LeftBottomCurveView = (function(superClass) {
    extend(LeftBottomCurveView, superClass);

    function LeftBottomCurveView() {
      LeftBottomCurveView.__super__.constructor.call(this);
    }

    LeftBottomCurveView.prototype.render = function() {
      var g, leftTopBoundary, rightBottomBoundary, svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      leftTopBoundary = document.createElementNS(svgns, 'path');
      leftTopBoundary.setAttribute('d', 'M0 33h67v67');
      rightBottomBoundary = document.createElementNS(svgns, 'path');
      rightBottomBoundary.setAttribute('d', 'M0 67h33v33');
      g.setAttribute('class', 'left-bottom curve');
      g.appendChild(leftTopBoundary);
      g.appendChild(rightBottomBoundary);
      svgNode.appendChild(g);
      return svgNode;
    };

    return LeftBottomCurveView;

  })(AbstractCurveView);

  RightBottomCurveView = (function(superClass) {
    extend(RightBottomCurveView, superClass);

    function RightBottomCurveView() {
      RightBottomCurveView.__super__.constructor.call(this);
    }

    RightBottomCurveView.prototype.render = function() {
      var g, leftBottomBoundary, rightTopBoundary, svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      rightTopBoundary = document.createElementNS(svgns, 'path');
      rightTopBoundary.setAttribute('d', 'M100 33h-67v67');
      leftBottomBoundary = document.createElementNS(svgns, 'path');
      leftBottomBoundary.setAttribute('d', 'M100 67h-33v67');
      g.setAttribute('class', 'right-bottom curve');
      g.appendChild(rightTopBoundary);
      g.appendChild(leftBottomBoundary);
      svgNode.appendChild(g);
      return svgNode;
    };

    return RightBottomCurveView;

  })(AbstractCurveView);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).views == null) {
    base.views = {};
  }

  root.game.views.AbstractCurve = AbstractCurveView;

  root.game.views.LeftTopCurve = LeftTopCurveView;

  root.game.views.RightTopCurve = RightTopCurveView;

  root.game.views.LeftBottomCurve = LeftBottomCurveView;

  root.game.views.RightBottomCurve = RightBottomCurveView;

}).call(this);
