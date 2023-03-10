const fs = require('fs');
const path = require('path');

let args = process.argv.slice(2);
let arg;

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * ((max + 1) - min) + min);
}

const changeQuantity = (nameField) => {

  fs.readFile('data.json', { encoding: 'utf8' },
    (err, data) => {
      if (err) {
        console.log(err);
        return;
      };
      let content = JSON.parse(data);
      content.forEach((e) => {
        if (e.name === nameField) { e.quantity += 1 }
        else if (e.name === "quantity") { e.quantity += 1 }
      })
      fs.writeFileSync('data.json', JSON.stringify(content));

    })

}

let randomNumber = getRandomNumber(1, 2);

console.log("Компьютер загадал число 1 или 2, введите его вместе с node index.js, чтобы угадать");

if (process.argv.length > 2 && args.length < 2) {

  args.forEach((a) => {
    if (a < 3 ) { arg = a }
    else { throw Error("число должно быть в указанном диапазоне") }
  });
  if (+arg === +randomNumber) {
    console.log("вы угадали");
    changeQuantity("divine");
  }
  else {
    console.log(`вы не угадали, попробуйте еще, компьютер загадал ${randomNumber}`);
    changeQuantity("notDivine");
  }
} else {
  throw Error("число должно быть в указанном диапазоне")
}
