const fs = require('fs')
const data = fs.readFileSync('./demo.txt');

console.log(data.toString())

console.log('last line of program')