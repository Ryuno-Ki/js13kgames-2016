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
      this.canvasHeight = canvasHeight || 360;
      this.canvasWidth = canvasWidth || 300;
      this.tileHeight = 60;
      this.tileWidth = 60;
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
      for (row = i = 0, ref = numRows; 0 <= ref ? i <= ref : i >= ref; row = 0 <= ref ? ++i : --i) {
        for (col = j = 0, ref1 = numCols; 0 <= ref1 ? j <= ref1 : j >= ref1; col = 0 <= ref1 ? ++j : --j) {
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
      map = [];
      numRows = Math.floor(this.canvasHeight / this.tileHeight);
      numCols = Math.floor(this.canvasWidth / this.tileWidth);
      map.numRows = numRows;
      map.numCols = numCols;
      for (row = i = 0, ref = numRows; 0 <= ref ? i <= ref : i >= ref; row = 0 <= ref ? ++i : --i) {
        map[row] = [];
        for (col = j = 0, ref1 = numCols; 0 <= ref1 ? j <= ref1 : j >= ref1; col = 0 <= ref1 ? ++j : --j) {
          map[row][col] = '';
        }
      }
      return map;
    };

    MapModel.prototype._setTile = function(position, map) {
      var environment, numCols, numRows, x, y;
      x = position[0], y = position[1];
      numRows = map.numRows;
      numCols = map.numCols;
      environment = {
        above: x > 0 ? map[x - 1][y] : null,
        below: x < numRows ? map[x + 1][y] : null,
        leftHand: y > 0 ? map[x][y - 1] : null,
        rightHand: y < numCols ? map[x][y + 1] : null
      };
      map[x][y] = this._pickTile(environment);
      return map;
    };

    MapModel.prototype._pickTile = function(environment) {
      var allowedNeighborhood, tileCandidates, tileSet;
      allowedNeighborhood = {
        above: ['^', '>', '|', '+', ''],
        below: ['v', '<', '|', '+', ''],
        leftHand: ['v', '>', '-', '+', ''],
        rightHand: ['^', '<', '-', '+', '']
      };
      tileCandidates = ['^', '>', 'v', '<', '-', '|', '+'];
      tileSet = tileCandidates.slice(0);
      tileCandidates.push('');
      if (environment.above === null) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.above, tile) < 0;
        });
      }
      if (environment.leftHand === null) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.leftHand, tile) < 0;
        });
      } else if (tileCandidates.length > 1) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.leftHand, tile) >= 0;
        });
      }
      if (environment.below === null) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.below, tile) < 0;
        });
      } else if (tileCandidates.length > 1) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.below, tile) >= 0;
        });
      }
      if (environment.rightHand === null) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.rightHand, tile) < 0;
        });
      } else if (tileCandidates.length > 1) {
        tileCandidates = tileCandidates.filter(function(tile) {
          return indexOf.call(allowedNeighborhood.rightHand, tile) >= 0;
        });
      }
      if (indexOf.call(tileCandidates, '') >= 0) {
        tileCandidates = tileSet[Math.floor(Math.random() * tileSet.length)];
      }
      return tileCandidates[0];
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
        case '^':
          view = LeftTopCurveView;
          break;
        case '>':
          view = RightTopCurveView;
          break;
        case 'v':
          view = RightBottomCurveView;
          break;
        case '<':
          view = LeftBottomCurveView;
          break;
        case '-':
          view = HorizontalStreetView;
          break;
        case '|':
          view = VerticalStreetView;
          break;
        case '+':
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
