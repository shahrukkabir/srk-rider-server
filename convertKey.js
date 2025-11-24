const fs = require('fs'); //file system
const key= fs.readFileSync('./srk-rider-firebase-adminsdk.json', 'utf8')
const base64= Buffer.from(key).toString('base64')
console.log(base64)