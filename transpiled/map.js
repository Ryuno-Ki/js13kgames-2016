(function() {
  var CarView, CrossroadView, HorizontalStreetView, LeftBottomCurveView, LeftTopCurveView, MapModel, MapView, RightBottomCurveView, RightTopCurveView, TrafficLightView, VerticalStreetView, base, base1, carModule, crossroadModule, curveModule, root, streetModule,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  if (!LeftTopCurveView) {
    if (require) {
      curveModule = require('../transpiled/curve.js').game;
      LeftTopCurveView = curveModule.views.LeftTopCurve;
    } else {
      LeftTopCurveView = this.game.views.LeftTopCurve;
    }
  }

  if (!CrossroadView) {
    if (require) {
      curveModule = require('../transpiled/curve.js').game;
      RightTopCurveView = curveModule.views.RightTopCurve;
    } else {
      RightTopCurveView = this.game.views.RightTopCurve;
    }
  }

  if (!LeftBottomCurveView) {
    if (require) {
      curveModule = require('../transpiled/curve.js').game;
      LeftBottomCurveView = curveModule.views.LeftBottomCurve;
    } else {
      LeftBottomCurveView = this.game.views.LeftBottomCurve;
    }
  }

  if (!RightBottomCurveView) {
    if (require) {
      curveModule = require('../transpiled/curve.js').game;
      RightBottomCurveView = curveModule.views.RightBottomCurve;
    } else {
      RightBottomCurveView = this.game.views.RightBottomCurve;
    }
  }

  if (!HorizontalStreetView) {
    if (require) {
      streetModule = require('../transpiled/street.js').game;
      HorizontalStreetView = streetModule.views.HorizontalStreet;
    } else {
      HorizontalStreetView = this.game.views.HorizontalStreet;
    }
  }

  if (!VerticalStreetView) {
    if (require) {
      streetModule = require('../transpiled/street.js').game;
      VerticalStreetView = streetModule.views.VerticalStreet;
    } else {
      VerticalStreetView = this.game.views.VerticalStreet;
    }
  }

  if (!CrossroadView) {
    if (require) {
      crossroadModule = require('../transpiled/crossroad.js').game;
      CrossroadView = crossroadModule.views.Crossroad;
    } else {
      CrossroadView = this.game.views.Crossroad;
    }
  }

  if (!TrafficLightView) {
    if (require) {
      crossroadModule = require('../transpiled/trafficLight.js').game;
      TrafficLightView = crossroadModule.views.TrafficLight;
    } else {
      TrafficLightView = this.game.views.TrafficLight;
    }
  }

  if (!CarView) {
    if (require) {
      carModule = require('../transpiled/car.js').game;
      CarView = carModule.views.Car;
    } else {
      CarView = this.game.views.Car;
    }
  }

  MapModel = (function() {
    function MapModel(canvasHeight, canvasWidth) {
      this.canvasHeight = canvasHeight || 300;
      this.canvasWidth = canvasWidth || 300;
      this.tileHeight = 60;
      this.tileWidth = 60;
      MapModel.SIGNS = {
        LEFT_TOP: '^',
        RIGHT_TOP: '>',
        RIGHT_BOTTOM: 'v',
        LEFT_BOTTOM: '<',
        HORIZONTAL: '-',
        VERTICAL: '|',
        CROSSROAD: '+',
        ANY: '?'
      };
    }

    MapModel.prototype.getCanvasHeight = function() {
      return this.canvasHeight;
    };

    MapModel.prototype.getCanvasWidth = function() {
      return this.canvasWidth;
    };

    MapModel.prototype.calculateMap = function() {
      var col, i, j, map, numCols, numRows, ref, ref1, row;
      map = this._initMap();
      numRows = map.numRows;
      numCols = map.numCols;
      for (row = i = 0, ref = numRows; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
        for (col = j = 0, ref1 = numCols; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          this._setTile([row, col], map);
        }
      }
      return JSON.stringify({
        "map": map,
        "numRows": map.numRows,
        "numCols": map.numCols
      });
    };

    MapModel.prototype._initMap = function() {
      var col, i, j, map, numCols, numRows, ref, ref1, row;
      numRows = Math.floor(this.canvasHeight / this.tileHeight);
      numCols = Math.floor(this.canvasWidth / this.tileWidth);
      map = [];
      map.numRows = numRows;
      map.numCols = numCols;
      for (row = i = 0, ref = numRows; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
        map[row] = [];
        for (col = j = 0, ref1 = numCols; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          map[row][col] = MapModel.SIGNS.ANY;
        }
      }
      return map;
    };

    MapModel.prototype._setTile = function(position, map) {
      var col, environment, numCols, numRows, row;
      row = position[0], col = position[1];
      numRows = map.numRows - 1;
      numCols = map.numCols - 1;
      environment = {
        above: row > 0 ? map[row - 1][col] : null,
        below: row < numRows ? map[row + 1][col] : null,
        leftHand: col > 0 ? map[row][col - 1] : null,
        rightHand: col < numCols ? map[row][col + 1] : null
      };
      map[row][col] = this.pickTile(environment);
      return map;
    };

    MapModel.prototype.pickTile = function(environment) {
      var candidates, ref, s, tileSet;
      candidates = this.filterTileCandidates(environment);
      tileSet = (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = candidates.length; i < len; i++) {
          s = candidates[i];
          if (s !== MapModel.SIGNS.ANY) {
            results.push(s);
          }
        }
        return results;
      })();
      if (ref = MapModel.SIGNS.ANY, indexOf.call(candidates, ref) >= 0) {
        candidates = tileSet[Math.floor(Math.random() * tileSet.length)];
      } else if (candidates.length > 1) {
        candidates = candidates[Math.floor(Math.random() * candidates.length)];
      }
      return candidates[0];
    };

    MapModel.prototype.filterTileCandidates = function(environment) {
      var allowedNeighborhood, candidates, envList, k, notAccessibleFrom, numOfNulls, ref, ref1, ref2, ref3, v;
      allowedNeighborhood = {
        above: [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.VERTICAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        below: [MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.VERTICAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        leftHand: [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.HORIZONTAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        rightHand: [MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.HORIZONTAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY]
      };
      notAccessibleFrom = {
        top: [MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.HORIZONTAL],
        bottom: [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.HORIZONTAL],
        left: [MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.VERTICAL],
        right: [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.VERTICAL]
      };
      candidates = (function() {
        var ref, results;
        ref = MapModel.SIGNS;
        results = [];
        for (k in ref) {
          v = ref[k];
          results.push(v);
        }
        return results;
      })();
      envList = (function() {
        var results;
        results = [];
        for (k in environment) {
          v = environment[k];
          results.push(v);
        }
        return results;
      })();
      numOfNulls = envList.reduce(function(sum, item) {
        return sum + (item === null);
      }, 0);
      if (numOfNulls === 2) {
        if (environment.above === null) {
          candidates = candidates.filter(function(tile) {
            return indexOf.call(allowedNeighborhood.above, tile) < 0;
          });
        }
        if (environment.rightHand === null) {
          candidates = candidates.filter(function(tile) {
            return indexOf.call(allowedNeighborhood.rightHand, tile) < 0;
          });
        }
        if (environment.leftHand === null) {
          candidates = candidates.filter(function(tile) {
            return indexOf.call(allowedNeighborhood.leftHand, tile) < 0;
          });
        }
        if (environment.below === null) {
          candidates = candidates.filter(function(tile) {
            return indexOf.call(allowedNeighborhood.below, tile) < 0;
          });
        }
      } else if (numOfNulls === 1) {
        if (environment.above === null) {
          candidates = notAccessibleFrom.top;
        }
        if (environment.rightHand === null) {
          candidates = notAccessibleFrom.right;
        }
        if (environment.leftHand === null) {
          candidates = notAccessibleFrom.left;
        }
        if (environment.below === null) {
          candidates = notAccessibleFrom.bottom;
        }
      } else {
        if (ref = environment.above, indexOf.call(notAccessibleFrom.bottom, ref) >= 0) {
          if (ref1 = environment.leftHand, indexOf.call(notAccessibleFrom.right, ref1) >= 0) {
            candidates = [MapModel.SIGNS.RIGHT_BOTTOM];
          } else {
            candidates = [MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.HORIZONTAL];
          }
        } else if (ref2 = environment.leftHand, indexOf.call(notAccessibleFrom.right, ref2) >= 0) {
          if (ref3 = environment.above, indexOf.call(notAccessibleFrom.bottom, ref3) >= 0) {
            candidates = [MapModel.SIGNS.RIGHT_BOTTOM];
          } else {
            candidates = [MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.VERTICAL];
          }
        } else {
          candidates = [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.CROSSROAD];
        }
      }
      return candidates;
    };

    return MapModel;

  })();

  MapView = (function() {
    function MapView(node) {
      this.node = node;
      this.mapData = null;
    }

    MapView.prototype.render = function(mapData) {
      var col, i, j, ref, ref1, row, sign, tile;
      for (row = i = 0, ref = mapData.numRows; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
        for (col = j = 0, ref1 = mapData.numCols; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
          sign = mapData.map[row][col];
          tile = this.addTrafficLight(this.getTileForSign(sign));
          this.node.appendChild(tile);
        }
      }
      this.mapData = mapData;
      this.on('click');
      return this.node;
    };

    MapView.prototype.getTileForSign = function(sign) {
      var view;
      switch (sign) {
        case MapModel.SIGNS.LEFT_TOP:
          view = LeftTopCurveView;
          break;
        case MapModel.SIGNS.RIGHT_TOP:
          view = RightTopCurveView;
          break;
        case MapModel.SIGNS.RIGHT_BOTTOM:
          view = RightBottomCurveView;
          break;
        case MapModel.SIGNS.LEFT_BOTTOM:
          view = LeftBottomCurveView;
          break;
        case MapModel.SIGNS.HORIZONTAL:
          view = HorizontalStreetView;
          break;
        case MapModel.SIGNS.VERTICAL:
          view = VerticalStreetView;
          break;
        case MapModel.SIGNS.CROSSROAD:
          view = CrossroadView;
      }
      return (new view()).render();
    };

    MapView.prototype.addTrafficLight = function(tile) {
      var trafficLight;
      if (!/crossroad/.test(tile.getAttribute('class'))) {
        return tile;
      }
      trafficLight = (new TrafficLightView()).render();
      tile.appendChild(trafficLight);
      trafficLight = (new TrafficLightView()).render();
      tile.appendChild(trafficLight);
      trafficLight = (new TrafficLightView()).render();
      tile.appendChild(trafficLight);
      trafficLight = (new TrafficLightView()).render();
      tile.appendChild(trafficLight);
      return tile;
    };

    MapView.prototype.on = function(event, callback) {
      this.node.addEventListener(event, (function(_this) {
        return function(ev) {
          _this.spawnCar();
          if (callback) {
            return callback();
          }
        };
      })(this));
    };

    MapView.prototype.spawnCar = function() {
      var indexOfTile, numTiles, tileWithNewCar;
      numTiles = this.mapData.numRows * this.mapData.numCols;
      indexOfTile = Math.floor(Math.random() * numTiles);
      tileWithNewCar = this.node.children.item(indexOfTile);
      tileWithNewCar.appendChild((new CarView()).render());
      return tileWithNewCar;
    };

    return MapView;

  })();

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Map = MapModel;

  if ((base1 = root.game).views == null) {
    base1.views = {};
  }

  root.game.views.Map = MapView;

}).call(this);
