function level1(){
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

}