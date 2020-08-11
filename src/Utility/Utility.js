function validAmount(number) {
	try {
		var result = parseAmountToInt(number);
		return !isNaN(result);
	} catch(error) {
		return false;
	}
}

function parseAmountToInt(number) {

	var decimal = number.indexOf(".");
	var startIndex = (number.indexOf("$") === -1 ? 0 : 1);
	var amount;
		
	if(decimal === -1)
		amount = parseInt(number.substring(startIndex)) * 100;
	else {
		var beforeDecimal = number.substring(startIndex,  decimal);
		var afterDecimal = number.substring(decimal + 1);
		if(afterDecimal.length > 2)
			throw new Error("Too Many Post-Decimal Values");
		amount = (parseInt(beforeDecimal) * 100) + parseInt(afterDecimal);
	}
	if(amount < 0)
		throw new Error("Negative Result");
	return amount;
}
	
function parseAmountToString(number) {
		
    var result = number.toString();
	if(result.length <= 2)
		return "0." + result;
	else {
		return result.substring(0, result.length - 2) + "." + result.substring(result.length - 2);
	}
}
	
function getTime() {
	return (new Date()).toString();
}

module.exports = {validAmount, parseAmountToInt, parseAmountToString, getTime};