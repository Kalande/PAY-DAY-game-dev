let canvas = document.querySelector('canvas')
canvas.style.backgroundColor = 'lightgrey'
let brush = canvas.getContext('2d')
let gameOver = false;
let animate = null;
let fgY = canvas.height - fg.height
let charX = canvas.width/2, charY = 100
let isfalling = false;
let jump = false;
let isLeft = false;
let isRight = false;
let isIdleR = true;
let isIdleL = false;
let i = 0;
let count = 0; 
let charWidth = 50;

function animateIdleR(){

 brush.drawImage(charIdleR[i],charX , charY)
 count ++;
 if(count > 10){
    i ++
    count = 0;
 }
 if(i > 3){
     i = 0;
 }
}

function animateIdleL(){

    brush.drawImage(charIdleL[i],charX , charY)
    count ++;
    if(count > 10){
       i ++
       count = 0;
    }
    if(i > 3){
        i = 0;
    }
}

function animateRight(){
    brush.drawImage(charRight[i],charX , charY)
    count ++;
    if(count > 5){
       i ++
       count = 0;
    }
    if(i > 3){
        i = 0;
    }
}

function animateLeft(){
    brush.drawImage(charLeft[i],charX , charY)
    count ++;
    if(count > 5){
       i ++
       count = 0;
    }
    if(i > 3){
        i = 0;
    }
}

function start(){
brush.drawImage(bg,0,0)
brush.drawImage(fg,0, fgY)

//Gravity

if(charY + charIdle1.height > fgY){
    charY += 0;
    isfalling = false;
}else{
    charY += 8
    isfalling = true;
}

//Jump Mechanics

if(jump){
    charY -= charIdle1.height
}
if(charY < fgY - charIdle1.height - 100){
    jump = false
}

//Character lateral movements and animation

if(isLeft && charX > 0){
    charX -= 5
    animateLeft()
}
if(isRight && charX + charWidth < canvas.width){
    charX += 5
    animateRight()
}



//Character Idle animations

if(isIdleR){
 animateIdleR()   
}else if(isIdleL){
 animateIdleL()
}

    if(gameOver){
        cancelAnimationFrame(animate)
    }
    else{
        animate = requestAnimationFrame(start)
    }
}

window.addEventListener('load', () => {
start()

document.addEventListener('keydown', (event) => {
    if(event.code == 'Space'){
        jump = true; 
    }
    if(event.code == 'ArrowRight'){
        isRight = true;
        isLeft = false;
        isIdleR = false;
        isIdleL = false;
    }
    else if(event.code == 'ArrowLeft'){
        isLeft = true;
        isRight = false;
        isIdleL = false;
        isIdleR = false;
    }
})

document.addEventListener('keyup', (event) => {
    if(event.code == 'Space'){
        jump = false; 
    }
    if(event.code == 'ArrowRight'){
        isRight = false;
        isIdleR = true;
        isIdleL = false;
    }
    else if(event.code == 'ArrowLeft'){
        isLeft = false;
        isIdleL = true;
        isIdleR = false;
    }
})

})