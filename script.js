let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = 'lightgrey'
let brush = canvas.getContext('2d')
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector('#restartBtn')
let introBtn = document.querySelector('#intro')
let backBtn = document.querySelector('#backBtn')
restartBtn.style.display = 'none'
backBtn.style.display = 'none'
canvas.style.display = 'flex'
startBtn.style.display = 'flex'

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
let levelOne = true;
let levelTwo = false;
let levelThree = false;
let levelFour = false;
let levelFive = false;
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

function drawIntro(){
    brush.drawImage(introScr,0,0)
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
    //calling levels
    if(levelOne){
      level1()  
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
    brush.font = '30px Hanson'
    brush.fillText(`Level: ${level}`, 1000, 50)
    //brush.fillText(`Papers: ${papers}`, 1000, 100)
    brush.fillText(`Lives: ${lives}`, 50, 50)
    brush.closePath()
    //Requirement to finish level
    reqPaper = 1;
    if(papers !== 0){
        reqPaper -= papers; 
    }
    brush.font = '20px Hanson'
    brush.fillText(`You need: ${reqPaper} Papers to pass this level`, canvas.width/2 - 250, 30)
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

    if (gameOver) {
        cancelAnimationFrame(animate)
        canvas.style.display = 'flex'
        brush.clearRect(0,0, canvas.width, canvas.height)
        restartBtn.style.display = 'flex'
        startBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'none'
        gameOver = false;
        drawEnd()
    } else {
        animate = requestAnimationFrame(start)
        startBtn.style.display = 'none'
        restartBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'none'
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
    
    introBtn.addEventListener('click', () => {
        brush.clearRect(0,0,canvas.width, canvas.height)
        drawIntro()
        restartBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'flex'
        startBtn.style.display = 'none'
    })

    backBtn.addEventListener('click', () => {
        brush.clearRect(0,0,canvas.width,canvas.height)
        drawStart()
        restartBtn.style.display = 'none'
        startBtn.style.display = 'flex'
        introBtn.style.display = 'flex'
        backBtn.style.display = 'none'
    })
    
    restartBtn.addEventListener('click', () => {
        brush.clearRect(0,0,canvas.width,canvas.width)
        cancelAnimationFrame(endAnimation)
        drawStart()
        restartBtn.style.display = 'none'
        startBtn.style.display = 'flex'
        introBtn.style.display = 'flex'
        backBtn.style.display = 'none'
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