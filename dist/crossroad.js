(function() {
  var CrossroadModel, StreetModel, base, root,
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

    CrossroadModel.prototype.getUtilisation = function() {
      return 0;
    };

    return CrossroadModel;

  })(StreetModel);

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Crossroad = CrossroadModel;

}).call(this);
