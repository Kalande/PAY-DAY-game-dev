let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = 'lightgrey'
let brush = canvas.getContext('2d')
let gameOver = false;
let animate = null;
let ground = canvas.height - fg.height
let charX = canvas.width / 2,
    charY = ground - 150 - charIdle1.height;
let jump = false;
let isLeft = false;
let isRight = false;
let isIdleR = true;
let isIdleL = false;
let carR1X = 700, carR2X = 280, carR3X = -140;
let carL1X = 100, carL2X = 500, carL3X = 900;
let i = 0;
let count = 0;
let charWidth = 50;
let platbase = canvas.height - fg.height + 30
let roadbase = canvas.height - 10
// let movPlatX = 300;

let carsRight = [carR1X,carR2X,carR3X,]
let carsLeft = [carL1X,carL2X,carL3X]

function animateIdleR() {

    brush.drawImage(charIdleR[i], charX, charY)
    count++;
    if (count > 10) {
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
    if (count > 10) {
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

function charJump() {
    charY -= 100  
}

function start() {
    brush.clearRect(0, 0, canvas.width, canvas.height)
    //Foreground and background
    brush.drawImage(bg, 0, 0)
    brush.drawImage(fg, 0, platbase - 30)
    //cars
    brush.drawImage(carR1, carsRight[0], roadbase - carL1.height - 55)
    brush.drawImage(carR2, carsRight[1], roadbase - carL1.height - 80)
    brush.drawImage(carR3, carsRight[2], roadbase - carL1.height - 33)
    
    brush.drawImage(carL1, carsLeft[0], roadbase - carL1.height)
    brush.drawImage(carL2, carsLeft[1], roadbase - carL1.height - 25)
    brush.drawImage(charJumpL2, carsLeft[2] + 130, roadbase - charIdleL3.height - 20 )
    brush.drawImage(carL3, carsLeft[2], roadbase - carL1.height + 10)
    //Car movement
    for(let i=0; i< carsRight.length; i++){
        carsRight[i] = carsRight[i] + 3
        carsLeft[i] = carsLeft[i] - 3

        if(carsRight[i] > canvas.width){
        carsRight[i] = -140;
        }
        if(carsLeft[i] + 200 < 0){
        carsLeft[i] = 1200
        }
    }
    let platforms = [{
        x: 600,
        y: platbase - 180
    }, {
        x: 800,
        y: platbase - 400
    }, {
        x: 300,
        y: platbase - 300
    }]
    //platform collisions

    for(let i=0; i < platforms.length; i++){
        brush.drawImage(platform, platforms[i].x, platforms[i].y)
    }
    
    for (let i = 0; i < platforms.length; i++){
        if (charX + charWidth > platforms[i].x && charX < platforms[i].x + platform.width){
            if(charY + charIdle1.height > platforms[i].y && charY + charIdle1.height < platforms[i].y + 10) {
                ground = platforms[i].y
                break;
            }    
        }
        else{
                ground = canvas.height - fg.height + 30;
            } 
    }
    
    //Gravity

    if (charY + charIdle1.height > ground) {
        charY += 0;
    } else {
        charY += 5
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



    //Character Idle animations

    if (isIdleR) {
        animateIdleR()
    } else if (isIdleL) {
        animateIdleL()
    }


    if (gameOver) {
        cancelAnimationFrame(animate)
    } else {
        animate = requestAnimationFrame(start)
    }
}

window.addEventListener('load', () => {
    start()

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

})