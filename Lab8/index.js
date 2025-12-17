const fs = require('fs');
console.log("Hello World");
const data = fs.readFileSync('data.txt', 'utf8');
console.log(data);
console.log("File read successfully");