var crypto = require('crypto');
var content = 'password'
var shasum = crypto.createHash('sha1');
shasum.update(content);
var d = shasum.digest('hex');
console.log(d);