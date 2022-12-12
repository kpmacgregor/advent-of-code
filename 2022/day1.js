/* read groups of numbers from file
** compute sum of each group
** store max sum so far
** return max
*/

const fs = require('fs'),
  readline = require('readline'),
  path = require('path'),
  filePath = path.join(__dirname, 'day1-input.txt');

async function readLines() {
  const fileStream = fs.createReadStream(filePath);
  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let max = 0,
    currentSum = 0;

  for await (const line of lineReader) {
    if (line.length === 0) {
      max = max > currentSum ? max : currentSum;
      currentSum = 0;
      continue;
    }
    currentSum += parseInt(line);
  }
  max = max > currentSum ? max : currentSum;

  console.log(max);
}

readLines();