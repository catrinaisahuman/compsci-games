count = 0
price = 10
tps = 1
testers = 0
testerRate = 1
autoTester = false
upgradeLevel = 1000
spinPrice = 50
spinnerAct = false
riskPrice = price/2
riskAvl = false

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

function spin(){
		start()
		count -= spinPrice
		spinPrice += Math.round(spinPrice/4)
		spinning = true
		timer = 0
		length = Math.round(random(2, 5))
		document.getElementById('result').innerHTML = 'result: '
}

function risk(){
	count -= riskPrice
	result = Math.floor(random(0, 9))
	if(result == 0){
		testers = 0
	} else {
		testers += Math.round(testers/10)
	}
}

function update(){
	tps = testers * testerRate
	riskPrice = Math.floor(price/2)


	if(testers < 0){
		testers = 0
	}
	document.getElementById("count").innerHTML = Math.round(count)
	document.getElementById("price").innerHTML = price + " tests" 
	document.getElementById("improvePrice").innerHTML = upgradeLevel + " tests"

	document.getElementById("riskPrice").innerHTML = riskPrice + " tests |"
	document.getElementById("riskResult").innerHTML = "9/10 gain "+ Math.round(testers/10) +" testers, 1/10 lose all testers"

	if(testers == 10){
		document.getElementById("riskResult").innerHTML = "9/10 gain "+ Math.round(testers/10) +" tester, 1/10 lose all testers"
	}

	if(testers < 10 && riskAvl == false){
		document.getElementById("riskDiv").style.display = "none"
	} else {
		document.getElementById("riskDiv").style.display = "block"
		riskAvl = true
	}

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


	if(count >= riskPrice){
		document.getElementById('risk').disabled = false
	} else {
		document.getElementById('risk').disabled = true
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
