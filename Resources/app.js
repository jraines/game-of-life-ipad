var color, east, grid, inspect, iterate, neighbors, nextGen, north, northEast, northWest, south, southEast, southWest, view, west, win, wrapEast, wrapNorth, wrapSouth, wrapWest, x, y, _ref;
win = Ti.UI.createWindow();
wrapNorth = function(y) {
  if (y === 0) {
    return 36;
  } else {
    return y - 1;
  }
};
wrapSouth = function(y) {
  if (y === 36) {
    return 0;
  } else {
    return y + 1;
  }
};
wrapEast = function(x) {
  if (x === 26) {
    return 0;
  } else {
    return x + 1;
  }
};
wrapWest = function(x) {
  if (x === 0) {
    return 26;
  } else {
    return x - 1;
  }
};
north = function(x, y) {
  return [x, wrapNorth(y)];
};
northWest = function(x, y) {
  return [wrapWest(x), wrapNorth(y)];
};
northEast = function(x, y) {
  return [wrapEast(x), wrapNorth(y)];
};
east = function(x, y) {
  return [wrapEast(x), y];
};
west = function(x, y) {
  return [wrapWest(x), y];
};
south = function(x, y) {
  return [x, wrapSouth(y)];
};
southEast = function(x, y) {
  return [wrapEast(x), wrapSouth(y)];
};
southWest = function(x, y) {
  return [wrapWest(x), wrapSouth(y)];
};
inspect = function(x, y) {
  return grid[x][y].backgroundColor === 'black';
};
neighbors = function(x, y) {
  var count;
  count = 0;
  if (inspect.apply(null, north(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, northEast(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, northWest(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, east(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, west(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, south(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, southEast(x, y))) {
    count += 1;
  }
  if (inspect.apply(null, southWest(x, y))) {
    count += 1;
  }
  return count;
};
_ref = [[], []], grid = _ref[0], nextGen = _ref[1];
for (x = 0; x <= 26; x++) {
  grid[x] = [];
  nextGen[x] = [];
  for (y = 0; y <= 36; y++) {
    color = 'white';
    if (Math.random() > 0.5) {
      color = 'black';
    }
    view = Ti.UI.createView({
      height: 25,
      width: 25,
      backgroundColor: color,
      right: x * 26,
      top: y * 26
    });
    grid[x].push(view);
    nextGen[x].push(color);
    win.add(view);
  }
}
iterate = function() {
  var alive, friends, x, y, _results;
  for (x = 0; x <= 26; x++) {
    for (y = 0; y <= 36; y++) {
      friends = neighbors(x, y);
      alive = nextGen[x][y] === 'black';
      if (alive) {
        if (friends === 3 || friends === 2) {
          nextGen[x][y] = 'black';
        } else {
          nextGen[x][y] = 'white';
        }
      } else {
        if (friends === 3) {
          nextGen[x][y] = 'black';
        }
      }
    }
  }
  _results = [];
  for (x = 0; x <= 26; x++) {
    _results.push((function() {
      var _results2;
      _results2 = [];
      for (y = 0; y <= 36; y++) {
        _results2.push(grid[x][y].backgroundColor = nextGen[x][y]);
      }
      return _results2;
    })());
  }
  return _results;
};
setInterval(iterate, 2000);
win.open();