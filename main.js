var canvas = document.getElementById("gamecanvas");
var ctx = canvas.getContext("2d");

let p1width = 70
let p1height = 20
let p1x = canvas.width / 2 - (p1width / 2);
let p1y = canvas.height - 40;

let ballsize = 15
let ballx = canvas.width / 2
let bally = canvas.height / 2
let velx = -2
let vely = 2

let rightPressed = false;
let leftPressed = false;

function range(start, end) {
    var ans = [];
    for (let i = start; i <= end; i++) {
        ans.push(i);
    }
    return ans;
}
ballhbox = range(1, ballsize)
function ball() {
    ctx.beginPath();
    ctx.arc(ballx, bally, ballsize, 0, Math.PI*2, false);
    ctx.fillStyle = "#009933";
    ctx.fill();
    ctx.closePath();
}
function p1paddle() {
    ctx.beginPath();
    ctx.rect(p1x, p1y, p1width, p1height);
    ctx.fillStyle = "#FF0000";
    ctx.fill();
    ctx.closePath();
}
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ball()
    p1paddle()

    ballx = ballx + velx
    bally = bally + vely

    if(ballx + velx < ballsize || ballx + velx > canvas.width - ballsize) {
        velx = -velx;
    } else if(bally + vely < ballsize) {
        vely = -vely;
    } 

    if(ballx + velx === p1x + p1width + ballsize || ballx + velx === p1x - ballsize) {
        if (bally + vely + Array.every(ballhbox) >= p1y && bally + vely >= p1y) {
            velx = -velx;
            console.log("paddle side hit")
        }
    } else if(ballx + velx > p1x && ballx  < p1x + p1width && bally + vely > p1y - ballsize) {
        console.log("paddle top hit")
        vely = -vely;
    } 
    
    if(bally > canvas.height - ballsize) {
        alert("GAME OVER")
        document.location.reload()
        ballx = canvas.width / 2
        bally = canvas.height / 2
    }
    if (rightPressed) {
        if(p1x < canvas.width - p1width) {
            p1x = p1x + 3  
        }

    } else if (leftPressed) {
        if(p1x > 0) {
            p1x = p1x - 3
        }
    }
}
function keyDownHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = true;
    }
    else if(e.keyCode == 37) {
        leftPressed = true;
    }
}
function keyUpHandler(e) {
    if(e.keyCode == 39) {
        rightPressed = false;
    }
    else if(e.keyCode == 37) {
        leftPressed = false;
    }
}
setInterval(draw, 10)
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

