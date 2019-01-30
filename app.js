const express = require('express')

const app = express()
const port = 3000

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
	anagramDictionary.readAnagramDictionaryFile()
}

app.get('/', (req, res) => {
	var word = req.query.word
	if(word === undefined){
		res.send('send some word dude!!!')
	}
	else{
		var anagrams = anagramDictionary.getAllValidSubAnagrams(word)
		anagrams.sort(lengthCompare)
		res.send(anagrams)
	}
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

function lengthCompare(a,b){
	return b.length-a.length
}