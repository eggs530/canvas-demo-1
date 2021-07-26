let canvas = document.getElementById("canvas")
canvas.width = document.documentElement.clientWidth
canvas.height = document.documentElement.clientHeight
let ctx = canvas.getContext('2d');
ctx.fillStyle = "blue";
ctx.lineWidth = 10;
ctx.lineCap = "round";

let pen = document.getElementById("pen")
let eraser = document.getElementById("eraser")
let eraserEnable = false
pen.onclick = () => {
    eraserEnable = false
    pen.classList.add('active')
    eraser.classList.remove('active')
}
eraser.onclick = () => {
    eraserEnable = true
    eraser.classList.add('active')
    pen.classList.remove('active')
}

let painting = false
let last

function drawLine(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
}

let isTouchDevice = 'ontouchstart' in document.documentElement;
if (isTouchDevice) {
    canvas.ontouchstart = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (eraserEnable === true) {
            ctx.clearRect(x - 5, y - 5, 10, 10);
        } else {
            last = [x, y]
        }
    }
    canvas.ontouchmove = (e) => {
        let x = e.touches[0].clientX
        let y = e.touches[0].clientY
        if (eraserEnable === true) {
            ctx.clearRect(x-5, y-5, 10, 10);
        } else {
            drawLine(last[0], last[1], x, y)
            last = [x, y]
        }
    }

} else {
    canvas.onmousedown = (e) => {
        painting = true
        if (eraserEnable === true) {
            ctx.clearRect(e.clientX - 5, e.clientY - 5, 10, 10);
        } else {
            last = [e.clientX, e.clientY]
        }
    }
    canvas.onmousemove = (e) => {
        if (painting === false) {
            return
        }
        if (eraserEnable === true) {
            ctx.clearRect(e.clientX - 5, e.clientY - 5, 10, 10);
        } else {
            drawLine(last[0], last[1], e.clientX, e.clientY)
            last = [e.clientX, e.clientY]
        }
    }
    canvas.onmouseup = () => {
        painting = false
    }
}
let black = document.getElementById("black")
let red = document.getElementById("red")
let green = document.getElementById("green")
let blue = document.getElementById("blue")
black.onclick=()=>{
    ctx.strokeStyle = "black"
    black.classList.add("active")
    red.classList.remove("active")
    green.classList.remove("active")
    blue.classList.remove("active")
}
red.onclick=()=>{
    ctx.strokeStyle = "red"
    red.classList.add("active")
    green.classList.remove("active")
    blue.classList.remove("active")
    black.classList.remove("active")
}
green.onclick=()=>{
    ctx.strokeStyle = "green"
    green.classList.add("active")
    red.classList.remove("active")
    blue.classList.remove("active")
    black.classList.remove("active")
}
blue.onclick=()=>{
    ctx.strokeStyle = "blue"
    blue.classList.add("active")
    green.classList.remove("active")
    red.classList.remove("active")
    black.classList.remove("active")
}