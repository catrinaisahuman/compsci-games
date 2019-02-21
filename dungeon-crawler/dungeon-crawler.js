var grid = []
resolution = 20
maxVel = 17
enemyMaxVel = 1
timer = 0
attackTimer = 4
attackActive = false
spawnTime = 0
levelSelect = 0

function setup(){
	createCanvas(720, 720)
	walls = new Group()
	enemies = new Group()
	attack = new Group()
	player = createSprite(500, 500, 30, 30)

	nWall = createSprite(width/2, 5, width, 30)
	nWall.shapeColor = color(0)
	sWall = createSprite(width/2, height -5, width, 30)
	sWall.shapeColor = color(0)
	eWall = createSprite(5, height/2, 30, width)
	eWall.shapeColor = color(0)
	wWall = createSprite(width -5, height/2, 30, height)
	wWall.shapeColor = color(0)

	walls.add(nWall)
	walls.add(sWall)
	walls.add(eWall)
	walls.add(wWall)


	for(i=0;i<resolution;i++){
		grid[i] = []
		for(z=0;z<resolution;z++){
			grid[i][z] = 0
		}
	}

	//one
	levelSelect = int(random(1,3))
 	if(levelSelect == 1){
	 	oneOne()
	}

	if(levelSelect == 2){
		oneTwo()
	}
	//two
	levelSelect = int(random(1,3))


	if(levelSelect == 2){
		twoOne()
	}
	//three
	levelSelect = int(random(1,4))
	if(levelSelect == 1){
		threeOne()
	}

	if(levelSelect == 2){
		threeTwo()
	}

	//four
	levelSelect = int(random(1,4))
	if(levelSelect == 1){
		fourOne()
	}

	if(levelSelect == 2){
		fourTwo()
	}




	for(i=0;i<resolution;i++){
		for(z=0;z<resolution;z++){
			if(grid[i][z] == 1){
				wall = createSprite((width/resolution)*z+width/resolution*0.5, (height/resolution)*i+height/resolution*0.5, width/resolution, height/resolution)
				wall.shapeColor = color(0)
				walls.add(wall)
			}
		}
	}

	 for(i=0;i<10;i++){
	 	spawnEnemy(50, 50, 1)
	 }

}

function draw(){
	background(220)

	player.velocity.x *= 0.9
	player.velocity.y *= 0.9
	

	if(keyDown('d') == true){
      player.velocity.x += 1;
    }

    if(keyDown('a')){
       player.velocity.x -= 1;
    }

   	if(keyDown('w') == true){
       player.velocity.y -= 1;
    }

    if(keyDown('s')){
       player.velocity.y += 1;
    }

    if(keyDown('space') == true && attackTimer > 1){
    	attackActivate()
    }

    if(player.velocity.x > maxVel){
    	player.velocity.x = maxVel
    }

     if(player.velocity.y > maxVel){
    	player.velocity.y = maxVel
    }

    if(player.velocity.x < -maxVel){
    	player.velocity.x = -maxVel
    }

     if(player.velocity.y < -maxVel){
    	player.velocity.y = -maxVel
    }

    for(i=0;i<enemies.length;i++){
   		if(enemies[i].velocity.x > enemyMaxVel){
    		enemies[i].velocity.x = enemyMaxVel
    	}

    	if(enemies[i].velocity.y > enemyMaxVel){
    		enemies[i].velocity.y = enemyMaxVel
    	}

    	if(enemies[i].velocity.x < -enemyMaxVel){
    		enemies[i].velocity.x = -enemyMaxVel
    	}

    	if(enemies[i].velocity.y < -enemyMaxVel){
    		enemies[i].velocity.y = -enemyMaxVel
    	}
    }  

    collision(player)


    for(j=0;j<enemies.length;j++){
    	if(p5.Vector.dist(enemies[j].position, player.position) > 20){
    		applyForce(enemies[j], seek(player.position, enemies[j].position, enemies[j].velocity))
    	} 
    	for(x=0;x<enemies.length;x++){
    		enemies[j].bounce(enemies[x])
    	}
    	collision(enemies[j])

    	if(player.collide(enemies[j]) == true && model.invulernable == false){
			model.health -= 1
			console.log(model.health)
			model.invulernable = true
			timer = 0
			knockback(player, enemies[j])
		}
	}

	for(j=0;j<enemies.length;j++){
		if(attackActive == true ){
			for(z=0;z<attack.length;z++){
				if(enemies[j].collide(attack[z])){
					enemies[j].health -= 1
			 		attack[z].remove()
			 		break;
				}
				
			}
		}
		if(enemies[j].health == 0){
			enemies[j].remove()
		}
	}
	if(timer == 1){
		model.invulernable = false
	}

	if(attackActive == true){
		for(i=0;i<attack.length;i++){
			if(attack[i].collide(walls) == true){
				attack[i].remove()
			}
		}
	}

	drawSprites()

	if(model.health <= 0){
		gameOver()
	}

	text('Health '+model.health, 0, 0)

}


function collision(sprite){
	for(i=0;i<walls.length;i++){
		if(sprite.collide(walls[i])){
			if(sprite.position.y <= walls[i].position.y - walls[i].height/2 && keyDown('w') == false){
				sprite.velocity.y = 0
			} 
			if(sprite.position.y >= walls[i].position.y + walls[i].height/2 && keyDown('s') == false){
				sprite.velocity.y = 0
			} 
			if(sprite.position.x <= walls[i].position.x - walls[i].width/2 && keyDown('a') == false){
				sprite.velocity.x = 0
			} 

			if(sprite.position.x >= walls[i].position.x + walls[i].width/2 && keyDown('d') == false){
				sprite.velocity.x = 0
			} 
		}

	}

	if(sprite.position.x > width){
		sprite.velocity.x -= 1
	}
	if(sprite.position.x < 0){
		sprite.velocity.x += 1
	}
	if(sprite.position.y > height){
		sprite.velocity.y -= 1
	}
	if(sprite.position.y < 0){
		sprite.velocity.x += 1
	}
}

function spawnEnemy(posX, posY, type){
	enemy = createSprite(posX, posY, 20, 20, 4)
	enemies.add(enemy)
}

function seek(target, seekerPos, seekerVel){
  	targetDir = p5.Vector.sub(target, seekerPos);
    steeringForce = p5.Vector.sub(targetDir, seekerVel).normalize();
    return steeringForce;
}

function applyForce(sprite, steeringForce){
  	sprite.velocity.x += steeringForce.x
  	sprite.velocity.y += steeringForce.y
}

function knockback(sprite, source){
	if(player.collide(walls) == false){
		applyForce(sprite, (p5.Vector.sub(sprite.position, source.position)).mult(0.5))
		//player.velocity.x -= (sprite.position.x - player.position.x)*50
		//player.velocity.y -= (sprite.position.y - player.position.y)*50
	}

}


function attackActivate(){
	sword = createSprite(player.position.x, player.position.y, 15, 15)
	attack.add(sword)
	sword.velocity.y = -4
	attackActive = true
	attackTimer = 0
}


function gameOver(){
	textSize(70)
	textAlign(CENTER, CENTER)
	text('Game Over', width/2, height/2)
}

window.setInterval(function(){
	timer++
	spawnEnemy(50, 50, 1)
}, 1000)

window.setInterval(function(){
	attackTimer++
}, 100)

