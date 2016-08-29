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
    }

    StreetView.prototype.render = function() {
      var el, g, leftBoundary, middleBoundary, rightBoundary, svgns;
      svgns = 'http://www.w3.org/2000/svg';
      el = document.createElementNS(svgns, 'svg');
      el.setAttribute('viewBox', '0 0 100 100');
      el.setAttribute('xmlns', svgns);
      el.setAttribute('version', '1.1');
      el.setAttribute('height', '60');
      el.setAttribute('width', '60');
      g = document.createElementNS(svgns, 'g');
      leftBoundary = document.createElementNS(svgns, 'path');
      leftBoundary.setAttribute('d', 'M0 33H100');
      rightBoundary = document.createElementNS(svgns, 'path');
      leftBoundary.setAttribute('d', 'M0 67H100');
      middleBoundary = document.createElementNS(svgns, 'path');
      middleBoundary.setAttribute('d', 'M0 50H10');
      g.appendChild(leftBoundary);
      g.appendChild(middleBoundary);
      g.appendChild(rightBoundary);
      el.appendChild(g);
      return el;
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
