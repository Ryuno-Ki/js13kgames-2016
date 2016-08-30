(function() {
  var CrossroadModel, CrossroadView, StreetModel, StreetView, base, base1, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (!StreetModel) {
    if (require) {
      StreetModel = require('../transpiled/street.js').game.models.Street;
    } else {
      StreetModel = this.game.models.Street;
    }
  }

  if (!StreetView) {
    if (require) {
      StreetView = require('../transpiled/street.js').game.views.Street;
    } else {
      StreetView = this.game.views.Street;
    }
  }

  CrossroadModel = (function(superClass) {
    extend(CrossroadModel, superClass);

    function CrossroadModel() {
      return CrossroadModel.__super__.constructor.apply(this, arguments);
    }

    CrossroadModel.prototype.getUtilisation = function() {
      return 0;
    };

    return CrossroadModel;

  })(StreetModel);

  CrossroadView = (function(superClass) {
    extend(CrossroadView, superClass);

    function CrossroadView() {
      CrossroadView.__super__.constructor.call(this);
    }

    CrossroadView.prototype.render = function() {
      var g, leftBottomBoundary, leftTopBoundary, rightBottomBoundary, rightTopBoundary, svgns;
      svgns = this.svgns;
      g = document.createElementNS(svgns, 'g');
      leftTopBoundary = document.createElementNS(svgns, 'path');
      leftTopBoundary.setAttribute('d', 'M0 33h33v-33');
      leftBottomBoundary = document.createElementNS(svgns, 'path');
      leftBottomBoundary.setAttribute('d', 'M67 0v33h33');
      rightTopBoundary = document.createElementNS(svgns, 'path');
      rightTopBoundary.setAttribute('d', 'M0 67h33v33');
      rightBottomBoundary = document.createElementNS(svgns, 'path');
      rightBottomBoundary.setAttribute('d', 'M100 67h-33v33');
      g.appendChild(leftTopBoundary);
      g.appendChild(leftBottomBoundary);
      g.appendChild(rightTopBoundary);
      g.appendChild(rightBottomBoundary);
      this.svgNode.appendChild(g);
      return this.svgNode.cloneNode(true);
    };

    return CrossroadView;

  })(StreetView);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Crossroad = CrossroadModel;

  if ((base1 = root.game).views == null) {
    base1.views = {};
  }

  root.game.views.Crossroad = CrossroadView;

}).call(this);
