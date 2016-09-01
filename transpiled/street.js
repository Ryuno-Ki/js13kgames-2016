(function() {
  var AbstractStreetView, NotImplementedError, StreetModel, StreetView, base, base1, errorsModule, root,
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

  AbstractStreetView = (function() {
    function AbstractStreetView() {
      this.precursor = null;
      this.successor = null;
    }

    AbstractStreetView.prototype.getTileBefore = function() {
      return this.precursor;
    };

    AbstractStreetView.prototype.getTileAfter = function() {
      return this.successor;
    };

    AbstractStreetView.prototype.getTileContext = function() {
      var svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = document.createElementNS(this.svgns, 'svg');
      svgNode.setAttribute('viewBox', '0 0 100 100');
      svgNode.setAttribute('xmlns', this.svgns);
      svgNode.setAttribute('version', '1.1');
      svgNode.setAttribute('height', '60');
      svgNode.setAttribute('width', '60');
      return svgNode;
    };

    AbstractStreetView.prototype.getTileContextNamespace = function() {
      return 'http://www.w3.org/2000/svg';
    };

    AbstractStreetView.prototype.render = function() {
      throw new NotImplementedError();
    };

    return AbstractStreetView;

  })();

  StreetView = (function(superClass) {
    extend(StreetView, superClass);

    function StreetView(precursor, successor) {
      this.precursor = precursor || null;
      this.successor = successor || null;
      return this;
    }

    StreetView.prototype.render = function() {
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
      return svgNode;
    };

    StreetView.prototype.enter = function() {
      var event;
      event = new global.window.CustomEvent('car-leaving');
      global.document.dispatchEvent(event);
    };

    StreetView.prototype.getCarsOnIt = function() {
      return 0;
    };

    return StreetView;

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

  root.game.views.Street = StreetView;

}).call(this);
