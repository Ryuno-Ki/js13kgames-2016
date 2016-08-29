(function() {
  var Car, root;

  Car = (function() {
    function Car() {
      this._id = null;
      this._driving = false;
      return;
    }

    Car.prototype.accelerate = function() {
      this._driving = true;
      return this.isDriving();
    };

    Car.prototype.isDriving = function() {
      return this._driving;
    };

    Car.prototype.stop = function() {
      this._driving = false;
      return this.isDriving();
    };

    return Car;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.Car = Car;

}).call(this);
