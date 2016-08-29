(function() {
  var StreetModel, StreetView, root;

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
      var el, g, leftBoundary, middleBoundary, rightBoundary;
      el = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      el.setAttribute('viewBox', '0 0 100 100');
      el.setAttribute('version', '1.1');
      el.setAttribute('height', '60');
      el.setAttribute('width', '60');
      g = document.createElement('g');
      leftBoundary = document.createElement('path');
      leftBoundary.setAttribute('d', 'M0 33H100');
      rightBoundary = document.createElement('path');
      leftBoundary.setAttribute('d', 'M0 67H100');
      middleBoundary = document.createElement('path');
      middleBoundary.setAttribute('d', 'M0 50H10');
      g.appendChild(leftBoundary);
      g.appendChild(middleBoundary);
      g.appendChild(rightBoundary);
      el.appendChild(g);
      return el;
    };

    StreetView.prototype.enter = function() {};

    return StreetView;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.StreetModel = StreetModel;

  root.StreetView = StreetView;

}).call(this);
