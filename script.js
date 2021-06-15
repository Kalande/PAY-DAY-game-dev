let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = 'lightgrey'
let brush = canvas.getContext('2d')
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector('#restartBtn')
restartBtn.style.display = 'none'
canvas.style.display = 'block'

//Game Variables
let gameOver = false;
let animate = null;
let ground = canvas.height - fg.height
let charX = 50,
    charY = ground - 180 - charIdle1.height;
let jump = false;
let isLeft = false;
let isRight = false;
let isIdleR = true;
let isIdleL = false;
let carR1X = 700,
    carR2X = 280,
    carR3X = -140;
let carL1X = 100,
    carL2X = 500,
    carL3X = 900;
let i = 0;
let count = 0;
let bossI = 0;
let bossCount = 0;
let charWidth = 50;
let platbase = canvas.height - fg.height + 30
let roadbase = canvas.height - 10
let level = 1;
let papers = 0;
let reqPaper = 0;
let paperCont = true;
let lives = 3;
let restart = false;
let movPlatX = 200;
let platDirection = '';
let movPlatY = platbase - 450;
let platVert = '';
let carsRight = [{
     x: carR1X,
     y: roadbase - carL1.height - 55
    }, {
     x: carR2X,
     y: roadbase - carL1.height - 80
    }, {
     x: carR3X,
     y: roadbase - carL1.height - 33
    }]
let carsLeft = [{
     x: carL1X,
     y: roadbase - carL1.height
    }, {
     x: carL2X,
     y: roadbase - carL1.height - 25
    }, {
     x: carL3X,
     y: roadbase - carL1.height + 10
    }]

//Functions

function animateIdleR() {

    brush.drawImage(charIdleR[i], charX, charY)
    count++;
    if (count > 20) {
        i++
        count = 0;
    }
    if (i > 3) {
        i = 0;
    }
}

function animateIdleL() {

    brush.drawImage(charIdleL[i], charX, charY)
    count++;
    if (count > 20) {
        i++
        count = 0;
    }
    if (i > 3) {
        i = 0;
    }
}

function animateRight() {
    brush.drawImage(charRight[i], charX, charY)
    count++;
    if (count > 5) {
        i++
        count = 0;
    }
    if (i > 3) {
        i = 0;
    }
}

function animateLeft() {
    brush.drawImage(charLeft[i], charX, charY)
    count++;
    if (count > 5) {
        i++
        count = 0;
    }
    if (i > 3) {
        i = 0;
    }
}

function carChar() {
    brush.drawImage(charIdleL[i], carsLeft[2].x + 130, roadbase - charIdleL3.height - 20)
    count++;
    if (count > 20) {
        i++
        count = 0;
    }
    if (i > 3) {
        i = 0;
    }
}

function bossAnimation(x,y){

    brush.drawImage(boss[bossI], x, y)
    bossCount++;
    if (bossCount > 25){
        bossI++
        bossCount = 0;
    }
    if (bossI > 11) {
        bossI = 0;
    }

    if (charX + charWidth > x && charX < x + charWidth && papers !== 0) {
        if (charY + charIdle1.height/2 < y || charY + charIdle1.height - 10 > y + charIdle1.height) {
            level += 1
            papers = 0;
            nextLevel = true;
        }
    }
}

function drawCollectable(x,y){
    
    
    if (charX + charWidth > x && charX < x + paper.width && paperCont) {
        if (charY + charIdle1.height/2 < y || charY + charIdle1.height - 10 > y + paper.height) {
            paperCont = false;
            papers += 1
        }
    }else if(paperCont){
        brush.drawImage(paper, x, y)
    }
}

function charJump() {
    charY -= 180
}
function drawStart(){
    brush.drawImage(startScr,0,0)
}
let frameI = 0
let frameCount = 0;
let endAnimation = null;
function drawEnd(){
    
    brush.drawImage(endScr,0,0)
    brush.drawImage(dizzy[frameI], 100, 0)
    frameCount++;
    if (frameCount > 15) {
        frameI++
        frameCount = 0;
    }
    if (frameI > 2) {
        frameI = 0;
    }
    
    endAnimation = requestAnimationFrame(drawEnd)
}

function animateGame() {
    brush.clearRect(0, 0, canvas.width, canvas.height)
    //Foreground and background
    brush.drawImage(bg, 0, 0)
    brush.drawImage(fg, 0, platbase - 30)
    //cars
    brush.drawImage(carR1, carsRight[0].x, carsRight[0].y)
    brush.drawImage(carR2, carsRight[1].x, carsRight[1].y)
    brush.drawImage(carR3, carsRight[2].x, carsRight[2].y)

    brush.drawImage(carL1, carsLeft[0].x, carsLeft[0].y)
    brush.drawImage(carL2, carsLeft[1].x, carsLeft[1].y)
    carChar()
    brush.drawImage(carL3, carsLeft[2].x, carsLeft[2].y)
    //Car movement
    for (let i = 0; i < carsRight.length; i++) {
        carsRight[i].x = carsRight[i].x + 3
        carsLeft[i].x = carsLeft[i].x - 3

        if (carsRight[i].x > canvas.width) {
            carsRight[i].x = -140;
        }
        if (carsLeft[i].x + 200 < 0) {
            carsLeft[i].x = 1200
        }
    }
    //Platforms Array
    let platforms = [{
        x: 50,
        y: platbase - 180
    }, {
        x: 800,
        y: movPlatY
    }, {
        x: movPlatX,
        y: platbase - 250
    }, {
        x: 600,
        y: platbase - 200
    }, {
        x: 1000,
        y: platbase - 350
    },{
        x: - 50,
        y: platbase - 180
    },{
        x: 300,
        y: platbase - 400
    }]
    let p = platforms.length - 1
    //Draw platforms from array values
    
    for (let i = 0; i < platforms.length; i++) {
        brush.drawImage(platform, platforms[i].x, platforms[i].y)
    }
    //Draw collectable
    let colX = platforms[4].x + 25;
    let colY = platforms[4].y 
 
    drawCollectable(colX, colY - paper.height)
    
    //Draw boss on last platform in array
    bossAnimation(platforms[p].x + 25, platforms[p].y - b1.height)

    //platform side to side movement - (put in function after mvp)
    if (platforms[2].x >= 450) {
        platDirection = 'left'
        movPlatX -= 1;
    } else if (platforms[2].x <= 200) {
        platDirection = 'right';
        movPlatX += 1;
    }

    if (platforms[2].x > 200 && platforms[2].x < 450) {
        if (platDirection === 'right') {
            movPlatX += 2;
        } else if (platDirection === 'left') {
            movPlatX -= 2;
        }
    }

    //platform up and down movement
    if (platforms[1].y >= (platbase - 250)) {
        platVert = 'down'
        movPlatY -= 1;
    } else if (platforms[1].y <= (platbase - 450)) {
        platVert = 'up';
        movPlatY += 1;
    }

    if (platforms[1].y > (platbase - 450) && platforms[1].y < (platbase - 250)) {
        if (platVert === 'up') {
            movPlatY += 2;
        } else if (platVert === 'down') {
            movPlatY -= 2;
        }
    }
    //to keep character on vertical moving platform
    if (charX + charWidth > platforms[1].x && charX < platforms[1].x + platform.width) {
        if (charY + charIdle1.height > platforms[1].y && charY + charIdle1.height < platforms[1].y + 10) {
            ground = movPlatY
            charY = movPlatY - charIdle1.height
        }
    }
    //Platform collisions
    for (let i = 0; i < platforms.length; i++) {
        if (charX + charWidth > platforms[i].x && charX < platforms[i].x + platform.width) {
            if (charY + charIdle1.height > platforms[i].y && charY + charIdle1.height < platforms[i].y + 10) {
                ground = platforms[i].y
                break;
            }
        } else {
            ground = canvas.height - fg.height + 30;
        }
    }

    //Gravity

    if (charY + charIdle1.height > ground) {
        charY += 0;
    } else {
        charY += 8
    }

    //Jump Mechanics

    if (jump && charY >= ground - charIdle1.height) {
        charJump();
    }
    if (charY !== ground - charIdle1.height) {
        jump = false;
    }

    //Character lateral movements and animation

    if (isLeft && charX > 0) {
        charX -= 5
        animateLeft()
    }
    if (isRight && charX + charWidth < canvas.width) {
        charX += 5
        animateRight()
    }
    //Score
    brush.beginPath()
    brush.font = '30px verdana'
    brush.fillText(`Level: ${level}`, 1000, 50)
    //brush.fillText(`Papers: ${papers}`, 1000, 100)
    brush.fillText(`Lives: ${lives}`, 50, 50)
    brush.closePath()
    //Requirement to finish level
    reqPaper = 1;
    if(papers !== 0){
        reqPaper -= papers; 
    }
    brush.font = '20px verdana'
    brush.fillText(`You need: ${reqPaper} Papers to pass this level`, canvas.width/2 - 200, 30)
    //Character Idle animations

    if (isIdleR) {
        animateIdleR()
    } else if (isIdleL) {
        animateIdleL()
    }
    
    carsRight.forEach((elem) => {
        if (charX + charWidth > elem.x && charX < elem.x + 200) {
            if (charY + charIdle1.height > elem.y + 50 && lives != 0) {
                restart = true;
                lives -= 1;
            } 
        }
    })
    carsLeft.forEach((elem) => {
        if (charX + charWidth > elem.x && charX < elem.x + 200) {
            if (charY + charIdle1.height > elem.y && lives != 0) {
                restart = true;
                lives -= 1;
            }
        }
    })

    if(restart){
        if(papers == 0){
        charX = 50
        charY = ground - 180 - charIdle1.height;
        }else{
            charX = colX
            charY = colY - charIdle1.height
        }
        restart = false;
    } else if(lives == 0){
        gameOver = true;
    }

    if (gameOver) {
        cancelAnimationFrame(animate)
        canvas.style.display = 'block'
        brush.clearRect(0,0, canvas.width, canvas.height)
        restartBtn.style.display = 'block'
        startBtn.style.display = 'none'
        gameOver = false;
        drawEnd()
    } else {
        animate = requestAnimationFrame(start)
        startBtn.style.display = 'none'
        restartBtn.style.display = 'none'
    }
}

function start(){
    animateGame()
}

window.addEventListener('load', () => {

    drawStart()
    
    document.addEventListener('keydown', (event) => {
        if (event.code == 'Space') {
            jump = true;
        }
        if (event.code == 'ArrowRight') {
            isRight = true;
            isLeft = false;
            isIdleR = false;
            isIdleL = false;
        } else if (event.code == 'ArrowLeft') {
            isLeft = true;
            isRight = false;
            isIdleL = false;
            isIdleR = false;
        }
    })

    document.addEventListener('keyup', (event) => {
        if (event.code == 'Space') {
            jump = false;
        }
        if (event.code == 'ArrowRight') {
            isRight = false;
            isIdleR = true;
            isIdleL = false;
        } else if (event.code == 'ArrowLeft') {
            isLeft = false;
            isIdleL = true;
            isIdleR = false;
        }
    })

    startBtn.addEventListener('click', () => {
      brush.clearRect(0,0,canvas.width, canvas.height)   
      start()  
    })
    
    restartBtn.addEventListener('click', () => {
        brush.clearRect(0,0,canvas.width,canvas.width)
        cancelAnimationFrame(endAnimation)
        drawStart()
        restartBtn.style.display = 'none'
        startBtn.style.display = 'block'
        gameOver = false;
        animate = null;
        ground = canvas.height - fg.height
        charX = 50,
        charY = ground - 180 - charIdle1.height;
        jump = false;
        isLeft = false;
        isRight = false;
        isIdleR = true;
        isIdleL = false;
        carR1X = 700
        carR2X = 280
        carR3X = -140
        carL1X = 100
        carL2X = 500
        carL3X = 900
        i = 0;
        count = 0;
        bossI = 0;
        bossCount = 0;
        charWidth = 50;
        platbase = canvas.height - fg.height + 30
        roadbase = canvas.height - 10
        level = 1;
        papers = 0;
        reqPaper = 0;
        paperCont = true;
        lives = 3;
        restart = false;
        movPlatX = 200;
        platDirection = '';
        movPlatY = platbase - 450;
        platVert = '';
    })
    
})