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
      console.log('Received', event, 'so firing', callback);
      callback();
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
