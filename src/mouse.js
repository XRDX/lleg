const canvas = require('./canvas.js').canvas
const Key = require('./keys.js').Key
const clickShapes = require('./util.js').clickShapes

let Mouse = {
  x: 0,
  y: 0
}

let TouchStart = {}
TouchStart.init = function () {
  TouchStart.x = Mouse.x
  TouchStart.y = Mouse.y
}

function windowToCanvas (canvas, x, y) {
  let box = canvas.getBoundingClientRect()
  return {
    x: x - box.left * (canvas.width / box.width),
    y: y - box.top * (canvas.height / box.height)
  }
}

function updateEvent (e) {
  // e.preventDefault();
  // update e if it is on phone
  if (e.touches) e = e.touches.item(0)

  let point = windowToCanvas(canvas, e.clientX, e.clientY)
  Mouse.x = Math.floor(point.x)
  Mouse.y = Math.floor(point.y)
}

canvas.onmousedown = function (e) {
  updateEvent(e)
  if (Mouse.down) Mouse.down()

  // handle events of all shapes, LIFO
  // IMPORTANT
  let i = clickShapes.getLength()
  let shape
  while (i--) {
    shape = clickShapes.get(i)
    if (shape.touched()) { break }
  }
  if (i >= 0 && shape.click) { shape.click() }
}

let preventDefault = false
canvas.preventDefaultEvent = function () {
  preventDefault = true
}

canvas.ontouchstart = function (e) {
  if (preventDefault) { e.preventDefault() }
  canvas.onmousedown(e)
  TouchStart.init()
}

canvas.onmousemove = function (e) {
  updateEvent(e)
  if (Mouse.move) Mouse.move()
}

canvas.ontouchmove = function (e) {
  if (preventDefault) { e.preventDefault() }
  canvas.onmousemove(e)
  if (Mouse.x - TouchStart.x > 50 && Key.ArrowRight.down) {
    Key.ArrowRight.down()
    TouchStart.init()
  } else if (TouchStart.x - Mouse.x > 50 && Key.ArrowLeft.down) {
    Key.ArrowLeft.down()
    TouchStart.init()
  }

  if (TouchStart.y - Mouse.y > 50 && Key.ArrowUp.down) {
    Key.ArrowUp.down()
    TouchStart.init()
  } else if (Mouse.y - TouchStart.y > 50 && Key.ArrowDown.down) {
    Key.ArrowDown.down()
    TouchStart.init()
  }
}

canvas.ontouchend = canvas.onmouseup = function (e) {
  if (preventDefault) { e.preventDefault() }
  updateEvent(e)
  if (Mouse.up) Mouse.up()
}

canvas.onclick = function (e) {
  updateEvent(e)
  if (Mouse.click) Mouse.click()
}

module.exports = {
  Mouse: Mouse
}
