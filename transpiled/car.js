(function() {
  var CarModel, CarView, base, base1, root;

  CarModel = (function() {
    function CarModel() {
      this._id = null;
      this._driving = false;
      return this;
    }

    CarModel.prototype.accelerate = function() {
      this._driving = true;
      return this.isDriving();
    };

    CarModel.prototype.isDriving = function() {
      return this._driving;
    };

    CarModel.prototype.stop = function() {
      this._driving = false;
      return this.isDriving();
    };

    return CarModel;

  })();

  CarView = (function() {
    function CarView() {}

    CarView.prototype.on = function(event, callback) {
      callback();
    };

    CarView.prototype.handleEvent = function(event) {
      switch (event.type) {
        case 'change':
          return this.change(event.target);
      }
    };

    CarView.prototype.change = function(target) {};

    CarView.prototype.bindTo = function(element) {
      return Object.defineProperty(this, 'value', {
        enumerable: true,
        get: function() {
          return element.value;
        },
        set: function(val) {
          return element.value = val;
        }
      });
    };

    CarView.prototype.getTileContext = function() {
      var svgNode, svgns;
      svgns = this.getTileContextNamespace();
      svgNode = document.createElementNS(svgns, 'svg');
      svgNode.setAttribute('viewBox', '0 0 100 100');
      svgNode.setAttribute('xmlns', svgns);
      svgNode.setAttribute('version', '1.1');
      svgNode.setAttribute('height', '15');
      svgNode.setAttribute('width', '15');
      return svgNode;
    };

    CarView.prototype.getTileContextNamespace = function() {
      return 'http://www.w3.org/2000/svg';
    };

    CarView.prototype.render = function() {
      var bottomLeftWheel, bottomRightWheel, chassis, g, svgNode, svgns, topLeftWheel, topRightWheel;
      svgns = this.getTileContextNamespace();
      svgNode = this.getTileContext();
      g = document.createElementNS(svgns, 'g');
      topLeftWheel = document.createElementNS(svgns, 'rect');
      topLeftWheel.setAttribute('x', 10);
      topLeftWheel.setAttribute('y', 10);
      topLeftWheel.setAttribute('height', 20);
      topLeftWheel.setAttribute('width', 10);
      topLeftWheel.setAttribute('class', 'wheel');
      topRightWheel = document.createElementNS(svgns, 'rect');
      topRightWheel.setAttribute('x', 80);
      topRightWheel.setAttribute('y', 10);
      topRightWheel.setAttribute('height', 20);
      topRightWheel.setAttribute('width', 10);
      topRightWheel.setAttribute('class', 'wheel');
      bottomLeftWheel = document.createElementNS(svgns, 'rect');
      bottomLeftWheel.setAttribute('x', 10);
      bottomLeftWheel.setAttribute('y', 70);
      bottomLeftWheel.setAttribute('height', 20);
      bottomLeftWheel.setAttribute('width', 10);
      bottomLeftWheel.setAttribute('class', 'wheel');
      bottomRightWheel = document.createElementNS(svgns, 'rect');
      bottomRightWheel.setAttribute('x', 80);
      bottomRightWheel.setAttribute('y', 70);
      bottomRightWheel.setAttribute('height', 20);
      bottomRightWheel.setAttribute('width', 10);
      bottomRightWheel.setAttribute('class', 'wheel');
      chassis = document.createElementNS(svgns, 'rect');
      chassis.setAttribute('x', 20);
      chassis.setAttribute('y', 5);
      chassis.setAttribute('height', 90);
      chassis.setAttribute('width', 60);
      chassis.setAttribute('class', 'chassis');
      g.appendChild(topLeftWheel);
      g.appendChild(topRightWheel);
      g.appendChild(bottomLeftWheel);
      g.appendChild(bottomRightWheel);
      g.appendChild(chassis);
      svgNode.appendChild(g);
      svgNode.setAttribute('class', 'car');
      return svgNode;
    };

    return CarView;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Car = CarModel;

  if ((base1 = root.game).views == null) {
    base1.views = {};
  }

  root.game.views.Car = CarView;

}).call(this);
