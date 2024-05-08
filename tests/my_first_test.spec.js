const {test, expect} = require('@playwright/test')
const {hello, helloworld} = require('./demo/hello')

console.log (hello());
console.log(helloworld());

