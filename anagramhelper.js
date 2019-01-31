var dictFilter = require('./dictionaryfilter')
var anagramDictionary = require('./anagramdictionary')

//filter dictionary
dictFilter.filterDictionary(saveDictionaryToFile)

//save anagram dictionary to file
function saveDictionaryToFile(){
	anagramDictionary.saveAnagramDictionaryToFile(readAnagramDictionaryFile)
}
//load anagram dictionary to memory
function readAnagramDictionaryFile(){
	anagramDictionary.readAnagramDictionaryFile(doOperations)
}

//perform operations
function doOperations(){
	var anagrams = anagramDictionary.getAllValidSubAnagrams('ampleap')
	anagrams.sort(lengthCompare)
	for (var anagram of anagrams){
		console.log(anagram)
	}
}

function lengthCompare(a,b){
	return a.length-b.length
}
