/* read groups of numbers from file
** compute sum of each group
** store max sum so far
** return max
*/

const fs = require('fs'),
  readline = require('readline'),
  path = require('path'),
  filePath = path.join(__dirname, 'day1-input.txt');

function computeTopThree(sum, old) {
  if (sum > old[0]) {
    return [sum, old[0], old[1]];
  }
  if (sum > old[1]) {
    return [old[0], sum, old[1]];
  }
  if (sum > old[2]) {
    return [old[0], old[1], sum];
  }
  return old;
}

async function readLines() {
  const fileStream = fs.createReadStream(filePath);
  const lineReader = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity
  });

  let topThree = [0, 0, 0],
    currentSum = 0;

  for await (const line of lineReader) {
    if (line.length === 0) {
      topThree = computeTopThree(currentSum, topThree);
      currentSum = 0;
      continue;
    }
    currentSum += parseInt(line);
  }
  topThree = computeTopThree(currentSum, topThree);

  console.log(topThree);
  console.log(topThree.reduce((p, c) => p + c));
}

readLines();