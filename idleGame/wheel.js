rotation = 0
spinning = false
timer = 0
length = 0
function preload(){
	spinner = loadImage("spinner.png")
}


function start(){
	createCanvas(300,300)
	background(220)
	pg = createGraphics(300, 280)
	pg.image(spinner, 0, 0, 300, 280)
	pg.text('+0', 70, 90)
	pg.text('+1', 120, 70)
	pg.text('+2', 200, 70)
	pg.text('-2', 230, 120)
	pg.text('+5', 230, 200)
	pg.text('-5', 170, 230)
	pg.text('+10', 100, 230)
	pg.text('-10', 70, 170)
	document.getElementById('result').innerHTML = 'result: '

}



function draw(){
	if(spinning == true){
		background(220)
		translate(150, 140)
		rotate(rotation)
		imageMode(CENTER)
		image(pg, 0, 0)
		rotation += 0.1
	}

	if(timer == length && spinning == true){
		switch(Math.floor(random(1, 9))){
			case 1:
				document.getElementById('result').innerHTML = 'result: +0'
				break;
			case 2:
				testers += 1
				document.getElementById('result').innerHTML = 'result: +1'
				break;
			case 3:
				testers += 2
				document.getElementById('result').innerHTML = 'result: +2'
				break;
			case 4:
				testers -= 2
				document.getElementById('result').innerHTML = 'result: -2'
				break;
			case 5:
				testers += 5
				document.getElementById('result').innerHTML = 'result: +5'
				break;
			case 6:
				testers -= 5
				document.getElementById('result').innerHTML = 'result: -5'
				break;
			case 7:
				testers += 10
				document.getElementById('result').innerHTML = 'result: +10'
				break;
			case 8:
				testers -= 10
				document.getElementById('result').innerHTML = 'result: -10'
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
		document.getElementById('result').innerHTML = 'result: '
}


window.setInterval(function(){
	timer++
}, 1000)