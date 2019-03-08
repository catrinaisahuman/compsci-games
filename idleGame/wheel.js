rotation = 1
spinning = false
timer = 0
length = 0

function preload(){
	spinner = loadImage("spinner.png")
}


function start(){
	createCanvas(300,300)
	background(220)
	console.log('hi')
}



function draw(){
	if(spinning == true){
		background(220)
		translate(150, 140)
		rotate(rotation)
		imageMode(CENTER)
		image(spinner, 0, 0, 300, 280)
		rotation += 0.1
	}

	if(timer == length && spinning == true){
		switch(Math.floor(random(1, 9))){
			case 1:
				break;
			case 2:
				testers += 1
				break;
			case 3:
				testers += 2
				break;
			case 4:
				testers -= 2
				break;
			case 5:
				testers += 5
				break;
			case 6:
				testers -= 5
				break;
			case 7:
				testers += 10
				break;
			case 8:
				testers -= 10
				break;
		}	
	}

	if(timer == length){
		spinning = false
	}
}


function spin(){
		count -= spinPrice
		spinning = true
		timer = 0
		length = Math.round(random(2, 5))
}


window.setInterval(function(){
	timer++
}, 1000)