//=======================
// DOM MANIPULATIONS
//=======================

let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = 'lightgrey'
let brush = canvas.getContext('2d')
let startBtn = document.querySelector('#startBtn')
let restartBtn = document.querySelector('#restartBtn')
let introBtn = document.querySelector('#intro')
let backBtn = document.querySelector('#backBtn')
let soundBtn = document.querySelector('#sound')
let startSound = new Audio('./Music/Start music.mp3')
let gameOverSound = new Audio('./Music/Game Over.mp3')
let trafficSound = new Audio('./Music/Traffic.mp3')
restartBtn.style.display = 'none'
backBtn.style.display = 'none'
canvas.style.display = 'flex'
startBtn.style.display = 'flex'
soundBtn.style.display = 'flex'

//=======================
//Default Game Variables
//=======================

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
let charWidth = charIdle1.width;
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
let paperCont2 = true;
let paperCont = true;
let lives = 3;
let restart = false;
let movPlatX = 200;
let platDirection = '';
let movPlatY = platbase - 400;
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

//=======================
//Character Animation functions
//=======================

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

function bossAnimation(x, y) {

    brush.drawImage(boss[bossI], x, y)
    bossCount++;
    if (bossCount > 25) {
        bossI++
        bossCount = 0;
    }
    if (bossI > 11) {
        bossI = 0;
    }

    if (charX + charWidth > x && charX < x + charWidth && papers !== 0 && reqPaper == 0) {
        if (charY + charIdle1.height/2 > y && charY + charIdle1.height/2 < y + charIdle1.height) {
            level += 1
            papers = 0;
            charX = 50,
            charY = ground - 180 - charIdle1.height;
            lives = 3
            paperCont = true;
            paperCont2 = true;
        }
    }
}

//=======================
//Collectable function
//=======================

function drawCollectable(x, y) {


    if ((charX + charWidth > x && charX < x + paper.width) && paperCont && (charY + (charIdle1.height/2) + 25 > y && charY + charIdle1.height/2 + 25 < y + paper.height)){
            paperCont = false;
            papers += 1
    }
     else if (paperCont) {
        brush.drawImage(paper, x, y)
    }
}

function drawCollectable2(x2, y2) {


    if ((charX + charWidth > x2 && charX < x2 + paper.width) && paperCont2 && (charY + (charIdle1.height/2) + 25 > y2 && charY + charIdle1.height/2 + 25 < y2 + paper.height)) {
            paperCont2 = false;
            papers += 1
        }
    else if (paperCont2) {
        brush.drawImage(paper, x2, y2)
    }
}


//Jump function

function charJump() {
    charY -= 180
}

//=======================
//Start Screen
//=======================

function drawStart() {
    brush.drawImage(startScr, 0, 0)
}

//=======================
//Instructions Screen
//=======================

function drawIntro() {
    brush.drawImage(introScr, 0, 0)

    brush.beginPath()
    brush.fillStyle = '#ffee30'
    brush.font = '30px Hanson'
    brush.fillText(`USE THE LEFT AND RIGHT`, 490, 260)
    brush.fillText(`ARROW KEYS TO MOVE`, 520, 290)
    brush.fillText(`USE THE SPACE BAR TO JUMP`, 465, 440)
    brush.fillText('YOUR GOAL IS TO COLLECT ALL',265, 540)
    brush.fillText('PAPERS REQUIRED IN THE LEVEL',265, 580)
    brush.fillText('AND DELIVER THEM TO YOUR BOSS',235, 620)
    brush.closePath()
}



//=======================
//End Screen
//=======================

//End Screen Animation Variables
let frameI = 0
let frameCount = 0;
let endAnimation = null;

function drawEnd() {

    brush.drawImage(endScr, 0, 0)
    brush.drawImage(dizzy[frameI], 100, 0)
    frameCount++;
    if (frameCount > 15) {
        frameI++
        frameCount = 0;
    }
    if (frameI > 2) {
        frameI = 0;
    }

    brush.beginPath()
    brush.fillStyle = '#ffee30'
    brush.font = '120px Hanson'
    brush.fillText(`${level}`, 865, 350, 80)
    brush.strokeStyle = '#ffee30'
    brush.arc(906, 312, 70, 0, 2 * Math.PI)
    brush.stroke()
    brush.closePath()

    brush.beginPath()
    brush.font = '30px Hanson'
    if (level > 1) {
        brush.fillText(`LEVELS`, 830, 420)
    } else {
        brush.fillText(`LEVEL`, 844, 420)
    }
    brush.fillText(`COMPLETED`, 785, 460)
    brush.closePath()

    endAnimation = requestAnimationFrame(drawEnd)
}

//=======================
//Main Function - Game Core
//=======================

function animateGame() {

    brush.clearRect(0, 0, canvas.width, canvas.height)

    //Foreground and background

    brush.drawImage(bg, 0, 0)
    brush.drawImage(fg, 0, platbase - 30)
    //=======================
    //Drawing cars
    //=======================

    brush.drawImage(carR1, carsRight[0].x, carsRight[0].y)
    brush.drawImage(carR2, carsRight[1].x, carsRight[1].y)
    brush.drawImage(carR3, carsRight[2].x, carsRight[2].y)

    brush.drawImage(carL1, carsLeft[0].x, carsLeft[0].y)
    brush.drawImage(carL2, carsLeft[1].x, carsLeft[1].y)
    carChar()
    brush.drawImage(carL3, carsLeft[2].x, carsLeft[2].y)
    
    //=======================
    //Car movement
    //=======================

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
    //=======================
    //calling levels
    //=======================

    if(levelOne && level == 1) {
        level1()
        reqPaper = 1;
        levelTwo = true;
    }
    else if(levelTwo && level == 2){
        levelOne = false;
        level2()
        reqPaper = 2;
        levelThree = true;
    }
    else if(levelThree && level == 3){
        levelTwo = false;
        level3()
        reqPaper = 1;
    }


    //=======================
    //Gravity
    //=======================

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

    //=======================
    //Character lateral movements and animation
    //=======================

    if (isLeft && charX > 0) {
        charX -= 5
        animateLeft()
    }
    if (isRight && charX + charWidth < canvas.width) {
        charX += 5
        animateRight()
    }
    //=======================
    //Score
    //=======================

    brush.beginPath()
    brush.fillStyle = 'black'
    brush.font = '30px Hanson'
    brush.fillText(`Level: ${level}`, 1000, 50)
    brush.fillText(`Lives: ${lives}`, 50, 50)
    brush.closePath()

    //=======================
    //Requirement to finish level
    //=======================

    if (papers !== 0) {
        reqPaper -= papers;
    }
    brush.beginPath()
    brush.fillStyle = 'black'
    brush.font = '20px Hanson'
    brush.fillText(`You need: ${reqPaper} Papers to pass this level`, canvas.width / 2 - 250, 30)
    brush.closePath()

    //=======================
    //Character Idle animations
    //=======================

    if (isIdleR) {
        animateIdleR()
    } else if (isIdleL) {
        animateIdleL()
    }
    //=======================
    //Car Collisions
    //=======================

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
    //=======================
    //Gameover Check
    //=======================

    if (gameOver) {
        cancelAnimationFrame(animate)
        canvas.style.display = 'flex'
        brush.clearRect(0, 0, canvas.width, canvas.height)
        restartBtn.style.display = 'flex'
        startBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'none'
        soundBtn.style.display = 'none'
        gameOver = false;
        trafficSound.pause()
        trafficSound.currentTime = 0;
        if(soundBtn.innerHTML == 'MUSIC: ON'){
            startSound.pause()
            startSound.currentTime = 0;
         gameOverSound.play()
         gameOverSound.volume = 0.15   
        }
        drawEnd()

    } else {
        animate = requestAnimationFrame(start)
        startBtn.style.display = 'none'
        restartBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'none'
        soundBtn.style.display = 'none'
    }
}

//Start function

function start() {
    animateGame()
}

//=======================
//Event listeners
//=======================

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
        brush.clearRect(0, 0, canvas.width, canvas.height)
        start()
        //Looping traffic sound
        if(typeof trafficSound.loop == 'boolean'){
            trafficSound.loop = true;
        }else{
            trafficSound.addEventListener('ended', () => {
                this.currentTime = 0;
                this.play();
            }, false)
        }
        trafficSound.play()
        trafficSound.volume = 0.06
    })

    soundBtn.addEventListener('click', () => {
        if(soundBtn.innerHTML == 'MUSIC: OFF'){
            soundBtn.innerHTML = 'MUSIC: ON'
            //Looping music
            if(typeof startSound.loop == 'boolean'){
                startSound.loop = true;
            }else{
                startSound.addEventListener('ended', () => {
                    this.currentTime = 0;
                    this.play();
                }, false)
            }
            startSound.play()
            startSound.volume = 0.15

        }else{
            soundBtn.innerHTML = 'MUSIC: OFF'
            startSound.pause()
        }
    })

    introBtn.addEventListener('click', () => {
        brush.clearRect(0, 0, canvas.width, canvas.height)
        drawIntro()
        restartBtn.style.display = 'none'
        introBtn.style.display = 'none'
        backBtn.style.display = 'flex'
        startBtn.style.display = 'none'
        soundBtn.style.display = 'none'
    })

    backBtn.addEventListener('click', () => {
        brush.clearRect(0, 0, canvas.width, canvas.height)
        drawStart()
        restartBtn.style.display = 'none'
        startBtn.style.display = 'flex'
        introBtn.style.display = 'flex'
        backBtn.style.display = 'none'
        soundBtn.style.display = 'flex'
    })

    restartBtn.addEventListener('click', () => {
        brush.clearRect(0, 0, canvas.width, canvas.width)
        cancelAnimationFrame(endAnimation)
        drawStart()
        gameOverSound.pause()
        gameOverSound.currentTime = 0;
        restartBtn.style.display = 'none'
        startBtn.style.display = 'flex'
        introBtn.style.display = 'flex'
        soundBtn.style.display = 'flex'
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
        levelOne = true;
        levelTwo = false;
        levelThree = false;
        levelFour = false;
        levelFive = false;
        papers = 0;
        reqPaper = 0;
        paperCont = true;
        paperCont2 = true;
        lives = 3;
        restart = false;
        movPlatX = 200;
        platDirection = '';
        movPlatY = platbase - 450;
        platVert = '';
    })
})