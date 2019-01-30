const { PerformanceObserver, performance } = require('perf_hooks')
var fs = require('fs')

const combinations = require('./combinations')

var words = 'dictionary/words-filtered.txt'
var anagramDictionaryFile = 'dictionary/anagram-dictionary.json'

var charMap = {a:2, b:3, c:5, d:7, e:11, f:13, g:17, h:19, i:23, j:29, k:31, l:37, m:41, n:43, o:47, p:53, q:59, r:61, s:67, t:71, u:73, v:79, w:83, x:89, y:97, z:101}

var anagramDictionary = {}

function saveAnagramDictionaryToFile(callback){
	if(fs.existsSync(anagramDictionaryFile)){
		console.log('anagram dictionary file already created. skipping...')
		typeof callback === 'function' && callback()
	}
	else{
		console.log("loading words to dictionary")
		var t0 = performance.now()
		fs.readFile(words, 'utf8', function(err, contents) {
			if(err) throw err
			var contentSplitted = contents.split('\r\n');
			for(var word of contentSplitted){
				//word = word.toLowerCase();
				var wordValue = getWordValue(word);
				if(wordValue in anagramDictionary){
					anagramDictionary[wordValue]['words'].push(word)
				}else{
					anagramDictionary[wordValue] = {words:[word],subAnagrams:[]}
				}
			}
			console.log(getWordValue('apple'))
			var t1 = performance.now()

			console.log("loaded words to dictionary" + (t1 - t0).toFixed(3) + ' milliseconds.')
			console.log("loading subAnagrams")
			var t2 = performance.now()
			
			for(var key in anagramDictionary){
				var word = anagramDictionary[key]['words'][0]

				var viableAnagrams = combinations.getAllCombinations(word)

				for(var viableAnagram of viableAnagrams){
					var wordValue = getWordValue(viableAnagram);
					if (wordValue in anagramDictionary){
						var wordValue = getWordValue(viableAnagram)
						if(!anagramDictionary[key]['subAnagrams'].includes(wordValue))
						anagramDictionary[key]['subAnagrams'].push(wordValue)
					}
				}
			}
			var t3 = performance.now()
			console.log("loaded subAnagrams" + (t3 - t2).toFixed(3) + ' milliseconds.')

			var strAnagrams = JSON.stringify(anagramDictionary)

			fs.writeFile(anagramDictionaryFile, strAnagrams, function(err){
				if(err) throw err
				console.log('saved file')
			})

			typeof callback === 'function' && callback()
		})
	}
}

function readAnagramDictionaryFile(callback){
	fs.readFile(anagramDictionaryFile, 'utf8', function(err, contents) {
		if(err) throw err
		anagramDictionary = JSON.parse(contents)
		typeof callback === 'function' && callback()
	})
}

function hasValidAnagram(jumble){
	var wordValue = getWordValue(jumble);
	if (wordValue in anagramDictionary){
		return true
	}
	else{
		return false
	}
}

function getValidAnagrams(jumble){
	var wordValue = getWordValue(jumble);
	return anagramDictionary[wordValue]['words']
}

function getValidSubAnagramsForDictionaryWord(jumble){
	var wordValue = getWordValue(jumble);
	var subAnagramValues = anagramDictionary[wordValue]['subAnagrams']
	var subAnagrams = []
	for (var subAnagramValue of subAnagramValues){
		subAnagrams = subAnagrams.concat(anagramDictionary[subAnagramValue]['words'])
	}
	return subAnagrams
}

function getAllValidSubAnagrams(jumble){
	var viableAnagrams = combinations.getAllCombinations(jumble)

	var subAnagramValues = []

	for(var viableAnagram of viableAnagrams){
		var wordValue = getWordValue(viableAnagram);
		if (wordValue in anagramDictionary){
			if(!subAnagramValues.includes(wordValue))
			subAnagramValues.push(wordValue)
			//anagramDictionary[key]['subAnagrams'].push(wordValue)
		}
	}
	var subAnagrams = []
	for (var subAnagramValue of subAnagramValues){
		subAnagrams = subAnagrams.concat(anagramDictionary[subAnagramValue]['words'])
	}
	return subAnagrams
}

function getWordValue(word){
	var wordValue = 1;
	for(var letter of word){
		wordValue = wordValue * charMap[letter]
	}
	return wordValue;
}

module.exports = {
	saveAnagramDictionaryToFile,
	readAnagramDictionaryFile,
	hasValidAnagram,
	getValidAnagrams,
	getValidSubAnagramsForDictionaryWord,
	getAllValidSubAnagrams
}