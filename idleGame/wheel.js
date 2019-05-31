rotation = 0
spinning = false
timer = 0
length = 0
under50 = true

t0 = 0
t1 = 1
t2 = 2
t3 = 2
t4 = 5
t5 = 5
t6 = 10
t7 = 10

function preload(){
	spinner = loadImage("spinner.png")
}


function start(){
	createCanvas(300,300)
	background(220)
	pg = createGraphics(300, 280)
	pg.image(spinner, 0, 0, 300, 280)
	pg.text('+'+t0, 70, 90)
	pg.text('+'+t1, 120, 70)
	pg.text('+'+t2, 200, 70)
	pg.text('-'+t3, 230, 120)
	pg.text('+'+t4, 230, 200)
	pg.text('-'+t5, 170, 230)
	pg.text('+'+t6, 100, 230)
	pg.text('-'+t7, 70, 170)
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

	t1 = Math.round(map(testers, 0, 50, 1, 5))
	t2 = Math.round(map(testers, 0, 50, 2, 10))
	t3 = Math.round(map(testers, 0, 50, 2, 10))
	t4 = Math.round(map(testers, 0, 50, 5, 15))
	t5 = Math.round(map(testers, 0, 50, 5, 15))
	t6 = Math.round(map(testers, 0, 50, 10, 20))
	t7 = Math.round(map(testers, 0, 50, 10, 20))

	document.getElementById('spinPrice').innerHTML = spinPrice + ' tests'

	if(timer == length && spinning == true){
		switch(Math.floor(random(1, 9))){
			case 1:
				document.getElementById('result').innerHTML = 'result: +0'
				break;
			case 2:
				testers += t1
				document.getElementById('result').innerHTML = 'result: +'+t1
				break;
			case 3:
				testers += t2
				document.getElementById('result').innerHTML = 'result: +'+t2
				break;
			case 4:
				testers -= t3
				document.getElementById('result').innerHTML = 'result: -'+t3
				break;
			case 5:
				testers += t4
				document.getElementById('result').innerHTML = 'result: +'+t4
				break;
			case 6:
				testers -= t5
				document.getElementById('result').innerHTML = 'result: -'+t5
				break;
			case 7:
				testers += t6
				document.getElementById('result').innerHTML = 'result: +'+t6
				break;
			case 8:
				testers -= t7
				document.getElementById('result').innerHTML = 'result: -'+t7
				break;
		}	
	}

	if(timer == length){
		spinning = false
	}
}





window.setInterval(function(){
	timer++
}, 1000)