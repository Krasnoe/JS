'use strict';

let num = 266219;
let arr = Array.from(String(num), Number);
let result = arr.reduce(function(a, b) {
  return a * b;
});

console.log(result);

result **= 3;

let num2 = Array.from(String(result), Number);
console.log(num2[0] + ' ' + num2[1]);

