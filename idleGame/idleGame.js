count = 0
price = 10
tps = 1
testers = 0
testerRate = 1
autoTester = false
upgradeLevel = 1000
spinPrice = 50
spinnerAct = false
document.getElementById('wheel').style.display = "none"



function up(){
	count++
}

function buy(){
	count -= price
	price += Math.round(price/4)
	testers++
	autoTester = true
}

function improve(){
	count -= upgradeLevel
	testerRate++
	upgradeLevel *= 2
}

function update(){
	tps = testers * testerRate

	if(testers < 0){
		testers = 0
	}
	document.getElementById("count").innerHTML = Math.round(count)
	document.getElementById("price").innerHTML = price + " tests" 
	document.getElementById("improvePrice").innerHTML = upgradeLevel + " tests"


	if(autoTester == true){
		document.getElementById("tps").innerHTML = "tests per second: "+tps
		document.getElementById("testerCount").innerHTML = testers+" testers"
	}

	if(testers == 1){
		document.getElementById("testerCount").innerHTML = testers+" tester"
	}

	if(count >= spinPrice){
		document.getElementById('spin').disabled = false
		if(spinnerAct == false){
			document.getElementById('wheel').style.display = "block"
			start()
			console.log('yes')
			spinnerAct = true
		}
	} else {
		document.getElementById('spin').disabled = true
	}

	if(count >= upgradeLevel){
		document.getElementById('improve').disabled = false
	} else {
		document.getElementById('improve').disabled = true
	}

	if(count >= price){
		document.getElementById('tester').disabled = false
	} else {
		document.getElementById('tester').disabled = true
	}
}



window.setInterval(function(){
	update()
},1)

window.setInterval(function(){
	if(autoTester == true){
		count += tps/200
	}
}, 1)
