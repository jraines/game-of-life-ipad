win = Ti.UI.createWindow()

wrapNorth = (y) -> 
  if y is 0
    36
  else
    y - 1

wrapSouth = (y) ->
  if y is 36
    0
  else
    y + 1

wrapEast = (x) ->
  if x is 26
    0
  else
    x + 1

wrapWest = (x) ->
  if x is 0
    26
  else
    x - 1

north = (x, y) -> [x, wrapNorth y]
northWest = (x, y) -> [wrapWest(x), wrapNorth(y)]
northEast = (x, y) -> [wrapEast(x), wrapNorth(y)]
east = (x, y) -> [wrapEast(x), y]
west = (x, y) -> [wrapWest(x), y]
south = (x, y) -> [x, wrapSouth(y)]
southEast = (x, y) -> [wrapEast(x), wrapSouth(y)]
southWest = (x, y) -> [wrapWest(x), wrapSouth(y)]

inspect = (x, y) ->
  grid[x][y].backgroundColor is 'black'

neighbors = (x, y) ->
  count = 0
  count += 1 if inspect north(x, y)...
  count += 1 if inspect northEast(x, y)...
  count += 1 if inspect northWest(x, y)...
  count += 1 if inspect east(x, y)...
  count += 1 if inspect west(x, y)...
  count += 1 if inspect south(x, y)...
  count += 1 if inspect southEast(x, y)...
  count += 1 if inspect southWest(x, y)...
  count

[grid, nextGen] = [[],[]]

for x in [0..26]
  grid[x] = []
  nextGen[x] = []
  for y in [0..36]
    color = 'white'
    color = 'black' if Math.random() > 0.5
    view = Ti.UI.createView
      height:25,
      width:25,
      backgroundColor:color,
      right: x * 26,
      top: y * 26
    grid[x].push view
    nextGen[x].push color
    win.add view

iterate = ->
  for x in [0..26]
    for y in [0..36]
      friends = neighbors(x, y)
      alive = nextGen[x][y] is 'black'
      if alive
        if friends is 3 or friends is 2 
          nextGen[x][y] = 'black'
        else
          nextGen[x][y] = 'white'
      else
        if friends is 3
          nextGen[x][y] = 'black'
  for x in [0..26]
    for y in [0..36]
      grid[x][y].backgroundColor = nextGen[x][y]

setInterval iterate, 2000
win.open()


