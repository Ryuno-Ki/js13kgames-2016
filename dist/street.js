(function() {
  var StreetModel, StreetView, base, base1, root;

  StreetModel = (function() {
    function StreetModel() {
      this.utilisation = 0;
    }

    StreetModel.prototype.getUtilisation = function() {
      return this.utilisation;
    };

    return StreetModel;

  })();

  StreetView = (function() {
    function StreetView(precursor, successor) {
      this.precursor = precursor || null;
      this.successor = successor || null;
      this.svgns = 'http://www.w3.org/2000/svg';
      this.svgNode = document.createElementNS(this.svgns, 'svg');
      this.svgNode.setAttribute('viewBox', '0 0 100 100');
      this.svgNode.setAttribute('xmlns', this.svgns);
      this.svgNode.setAttribute('version', '1.1');
      this.svgNode.setAttribute('height', '60');
      this.svgNode.setAttribute('width', '60');
    }

    StreetView.prototype.render = function() {
      var g, leftBoundary, middleBoundary, rightBoundary, svgns;
      svgns = this.svgns;
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
      this.svgNode.appendChild(g);
      return this.svgNode.cloneNode(true);
    };

    StreetView.prototype.enter = function() {
      var event;
      event = new global.window.CustomEvent('car-leaving');
      global.document.dispatchEvent(event);
      console.log('Dispatched', event);
    };

    StreetView.prototype.getCarsOnIt = function() {
      return 0;
    };

    return StreetView;

  })();

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

  root.game.views.Street = StreetView;

}).call(this);
