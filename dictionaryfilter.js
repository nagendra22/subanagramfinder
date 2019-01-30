//filter dictionary to keep just the words we want
const MAX_WORD_LENGTH = 20
const { PerformanceObserver, performance } = require('perf_hooks')

var fs = require('fs')
var words = 'dictionary/words.txt'
var wordsFiltered = 'dictionary/words-filtered.txt'

function filterDictionary(callback){	
	if(fs.existsSync(wordsFiltered)){
		console.log('dictionary already filtered. skipping...')
	}
	else{
		fd = fs.openSync(wordsFiltered, 'w')

		console.log('filtering dictionary')
		var t0 = performance.now()

		lineReader.on('line', function (line) {
			line = line.toLowerCase();
			if(/^([a-z]{2,MAX_WORD_LENGTH})$/.test(line)){
				fs.write(fd, line+'\r\n', function (err) {
					if (err) throw err;
				});
			}
		});
		
		var t1 = performance.now()

		console.log('filtered dictionary in ' + (t1 - t0).toFixed(3) + ' milliseconds.')
	}

	typeof callback === 'function' && callback()
}

var lineReader = require('readline').createInterface({
	input: require('fs').createReadStream(words),
	output: process.stdout,
	terminal: false
});

module.exports = {filterDictionary}