(function() {
  var CrossroadModel, StreetModel, root,
    extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
    hasProp = {}.hasOwnProperty;

  if (!StreetModel) {
    StreetModel = (function() {
      function StreetModel() {}

      return StreetModel;

    })();
  }

  CrossroadModel = (function(superClass) {
    extend(CrossroadModel, superClass);

    function CrossroadModel() {
      return CrossroadModel.__super__.constructor.apply(this, arguments);
    }

    CrossroadModel.prototype.getTrafficLights = function() {
      return [];
    };

    return CrossroadModel;

  })(StreetModel);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  root.CrossroadModel = CrossroadModel;

}).call(this);
