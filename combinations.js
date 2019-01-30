//get all possible combinations of letters having length greater than or equal to 2 and less than the original string
//this lists all 2^n-2 possibilities. //TODO optimize it for repeated letters
function getAllCombinations(word){
	var len = word.length
	var combcount = 2 ** len
	var combinations = []

	for(var i = 1; i<combcount-1; i++){
		var num = i
		var ctr=0
		var tempStr = []
		while(num!=0){
			var takeThis = num%2
			if(takeThis == 1){
				tempStr.push(word[ctr])
			}
			num=Math.floor(num/2)
			ctr++
		}
		combinations.push(tempStr.join(''))
	}
	return combinations
}

module.exports = {getAllCombinations}