var canvas = document.getElementById("myCanvas");

var ctx = canvas.getContext("2d");

//Raio das bolas
var ballRadius = 10;

//Definir a posição da bola 1
var x = canvas.width/2;
var y = canvas.height-30;

// Definir a posição da bola 2
var a = canvas.width-50;
var b = canvas.height-50;

//Velocidade da bola 1
var dx = 2;
var dy = -2;

//Velocidade da bola 2
var da = 2;
var db = -2;

//Propriedades do retângulo
var paddleHeight = 10;
var paddleWidth = 75;
var paddleX = (canvas.width-paddleWidth) / 2;

//Controle do retângulo pelas setas
var rightPressed = false;
var leftPressed = false;

//Propriedades dos tijolos
var brickRowCount = 3;
var brickColumnCount = 5;
var brickWidth = 75;
var brickHeight = 20;
var brickPadding = 10;
var brickOffsetTop = 30;
var brickOffsetLeft = 30;

//Adicionando os tijolos
var bricks = [];
for(var c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(var r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, a: 0, b: 0, status: 1 };
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

function collisionDetection() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            var p = bricks[c][r];
            if(p.status == 1) {
                if(x > p.x && x < p.x+brickWidth && y > p.y && y < p.y+brickHeight) {
                    dy = -dy;
                    p.status = 0;
                }
                if(a > p.a && a < p.a+brickWidth && b > p.b && b < p.b+brickHeight) {
                    db = -db;
                    p.status = 0;
                }
            }
        }
    }
}

function drawBricks() {
    for(var c=0; c<brickColumnCount; c++) {
        for(var r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                bricks[c][r].a = brickX;
                bricks[c][r].b = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function keyDownHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = true;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if(e.key == "Right" || e.key == "ArrowRight") {
        rightPressed = false;
    }
    else if(e.key == "Left" || e.key == "ArrowLeft") {
        leftPressed = false;
    }
}

function drawPaddle() {

    ctx.beginPath();
    ctx.rect(paddleX, canvas.height-paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall1() {

    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#0095DD";
    ctx.fill();
    ctx.closePath();
}

function drawBall2(){

    ctx.beginPath();
    ctx.arc(a, b, ballRadius, 0, Math.PI*2);
    ctx.fillStyle = "#FF1493";
    ctx.fill();
    ctx.closePath();
}

function draw() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBall1();
    drawBall2();
    drawPaddle();
    drawBricks();
    collisionDetection();
    
    if(x + dx > canvas.width-ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if(y + dy < ballRadius) {
        dy = -dy;
    }
    else if(y + dy > canvas.height-ballRadius) {
        if(x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        }
        else {
            //alert("GAME OVER");
            //document.location.reload();
            //clearInterval(interval); // Needed for Chrome to end game
            dy = -dy;
        }
    }

    if(a + da > canvas.width-ballRadius || a + da < ballRadius) {
        da = -da;
    }
    if(b + db > canvas.height-ballRadius || b + db < ballRadius) {
        db = -db;
    }

    if(rightPressed) {
        paddleX += 7;
        if (paddleX + paddleWidth > canvas.width){
            paddleX = canvas.width - paddleWidth;
        }
    }
    else if(leftPressed) {
        paddleX -= 7;
        if (paddleX < 0){
            paddleX = 0;
        }
    }
    
    x += dx;
    y += dy;
    a += da;
    b += db;
}

setInterval(draw, 10);