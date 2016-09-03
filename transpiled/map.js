(function() {
  var MapModel, base, root,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

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
      console.log('\n', map, '\n');
      return JSON.stringify(map);
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

  root = typeof exports !== "undefined" && exports !== null ? exports : this;

  if (root.game == null) {
    root.game = {};
  }

  if ((base = root.game).models == null) {
    base.models = {};
  }

  root.game.models.Map = MapModel;

}).call(this);
