const fs = require('fs').promises

async function logDemoTxt() {
  const data = await fs.readFile('./demo.txt');
  console.log(data.toString())
} 

logDemoTxt();

console.log('last line of program')
