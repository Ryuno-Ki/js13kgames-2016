(function() {
  var CrossroadView, HorizontalStreetView, LeftBottomCurveView, LeftTopCurveView, MapModel, MapView, RightBottomCurveView, RightTopCurveView, VerticalStreetView, base, base1, crossroadModule, curveModule, root, streetModule,
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
      var aboveIsCurve, allowedNeighborhood, belowIsCurve, candidates, curveTiles, k, leftHandIsCurve, ref, ref1, ref2, ref3, rightHandIsCurve, v;
      allowedNeighborhood = {
        above: [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.VERTICAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        below: [MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.VERTICAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        leftHand: [MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.HORIZONTAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY],
        rightHand: [MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.RIGHT_BOTTOM, MapModel.SIGNS.HORIZONTAL, MapModel.SIGNS.CROSSROAD, MapModel.SIGNS.ANY]
      };
      curveTiles = [MapModel.SIGNS.LEFT_TOP, MapModel.SIGNS.LEFT_BOTTOM, MapModel.SIGNS.RIGHT_TOP, MapModel.SIGNS.RIGHT_BOTTOM];
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
      aboveIsCurve = (ref = environment.above, indexOf.call(curveTiles, ref) >= 0);
      belowIsCurve = (ref1 = environment.below, indexOf.call(curveTiles, ref1) >= 0);
      leftHandIsCurve = (ref2 = environment.leftHand, indexOf.call(curveTiles, ref2) >= 0);
      rightHandIsCurve = (ref3 = environment.rightHand, indexOf.call(curveTiles, ref3) >= 0);
      if (aboveIsCurve || belowIsCurve || leftHandIsCurve || rightHandIsCurve) {
        candidates = candidates.filter(function(tile) {
          return indexOf.call(curveTiles, tile) < 0;
        });
      }
      return candidates;
    };

    return MapModel;

  })();

  MapView = (function() {
    function MapView(node) {
      this.node = node;
    }

    MapView.prototype.render = function(mapData) {
      var col, i, ref, results, row, sign, view;
      console.log('Translating into DOM:');
      console.log(mapData.map);
      results = [];
      for (row = i = 0, ref = mapData.numRows; 0 <= ref ? i < ref : i > ref; row = 0 <= ref ? ++i : --i) {
        results.push((function() {
          var j, ref1, results1;
          results1 = [];
          for (col = j = 0, ref1 = mapData.numCols; 0 <= ref1 ? j < ref1 : j > ref1; col = 0 <= ref1 ? ++j : --j) {
            sign = mapData.map[row][col];
            view = this.getViewForSign(sign);
            results1.push(this.node.appendChild(view.render()));
          }
          return results1;
        }).call(this));
      }
      return results;
    };

    MapView.prototype.getViewForSign = function(sign) {
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
      return new view();
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
