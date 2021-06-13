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
let isIdle = true;
let i = 0;
let count = 0; 

function animateIdle(){
   
 brush.drawImage(charIdle[i],charX , charY)
 count ++;
 if(count > 12){
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
if(isLeft){
    charX -= 5
}else if(isRight){
    charX += 5
}else{
    isIdle = true;
}
if(isIdle){
 animateIdle()   
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
        isIdle = false;
    }
    else if(event.code == 'ArrowLeft'){
        isLeft = true;
        isRight = false;
        isIdle = false
    }
})

document.addEventListener('keyup', (event) => {
    if(event.code == 'Space'){
        jump = false; 
    }
    if(event.code == 'ArrowRight'){
        isRight = false;
    }
    else if(event.code == 'ArrowLeft'){
        isLeft = false;
    }
})

})