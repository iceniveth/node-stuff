const fs = require('fs')

fs.readFile('./demo.txt', function(err, data) {
  if (err) return console.log(err);
  console.log(data.toString())
});

console.log('last line of program')