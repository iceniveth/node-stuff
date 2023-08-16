// docker run -it --rm -v $(pwd):/app -w /app node top-level-await.
import {promises as fs} from 'fs'

const data = await fs.readFile('./demo.txt');

console.log(data.toString())

console.log('last line of program')

// In later nodejs (>=14), top await is allowed with { "type": "module" } specified in package.json or with file extension .mjs.
// https://stackoverflow.com/questions/49432579/await-is-only-valid-in-async-function