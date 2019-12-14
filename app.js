const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(morgan('dev'));

app.get('/sum', (req, res) => {
    const a = req.query.a;
    const b = req.query.b;
    const c = (a * 1) + (b * 1);

    const sum = `The sum of ${a} and ${b} is ${c}`

    res.send(sum)
})

app.get('/cipher', (req, res) => {
    const text = req.query.text;
    const shift = req.query.shift;

    if(!text) {
        return res
                .status(400)
                .send('Please provide some text');
    }

    if(!shift) {
        return res
                .status(400)
                .send('Please provide a shift number');
    }

    const shiftNum = parseFloat(shift);

    if(Number.isNaN(shiftNum)) {
        return res
                .status(400)
                .send('Shift must be a number')
    }

    const base = 'A'.charCodeAt(0);

    const cipher = text
                    .toUpperCase()
                    .split('')
                    .map(char => {
                        const code = char.charCodeAt(0)

                    if (code < base || code > (base + 26)) {
                        return char
                    }

                    let diff = code - base;
                    diff = diff + shiftNum;
                    diff = diff % 26;

                    const charShift = String.fromCharCode(base + diff);
                    return charShift;
                })
                .join('')
                
                res
                 .status(200)
                 .send(cipher);
            })

    app.get('/lotto', (req, res) => {
        const {numbers} = req.query
        console.log(numbers);

        if(!numbers) {
            return res
                    .status(400)
                    .send('Requires a number')
        }

        if(!Array.isArray(numbers)) {
            return res
                    .status(400)
                    .send('Requires an array of numbers')
        }

        const guesses = numbers
            .map(n => parseInt(n))
            .filter(n => !Number.isNaN(n) && (n >= 1 && n <= 20));

        if(guesses.length != 6) {
            return res
                .status(400)
                .send('numbers must be an integer between 1 and 20')
        }

        const stockNumbers = Array(20).fill(1).map((_, i) => i + 1);
        
          //randomly choose 6
  const winningNumbers = [];
  for(let i = 0; i < 6; i++) {
    const ran = Math.floor(Math.random() * stockNumbers.length);
    winningNumbers.push(stockNumbers[ran]);
    stockNumbers.splice(ran, 1);
  }

  //compare the guesses to the winning number
  let diff = winningNumbers.filter(n => !guesses.includes(n));

  // construct a response
  let responseText;

  switch(diff.length){
    case 0: 
      responseText = 'Wow! Unbelievable! You could have won the mega millions!';
      break;
    case 1:   
      responseText = 'Congratulations! You win $100!';
      break;
    case 2:
      responseText = 'Congratulations, you win a free ticket!';
      break;
    default:
      responseText = 'Sorry, you lose';  
  }


  // uncomment below to see how the results ran

  res.json({
    guesses,
    winningNumbers,
    diff,
    responseText
  });

  res.send(responseText);
})

//app.get('/greetings', (req, res) => {
//    //1. get values from the request
//    const name = req.query.name;
//    const race = req.query.race;
//
//    //2. validate the values
//    if(!name) {
//        //3. name was not provided
//        return res.status(400).send('Please provide a name');
//    }
//
//    if(!race) {
//        //3. race was not provided
//        return res.status(400).send('Please provide a race');
//    }
//
//    //4. and 5. both name and race are valid so do the processing.
//    const greeting = `Greetings ${name} the ${race}, welcome to our kingdom!`;
//
//    //6. send the response
//    res.send(greeting);
//})
//
//app.get('/burgers', (req, res) => {
//    res.send('We have juicy cheese burgers!');
//});
//
//app.get('/pizza/pepperoni', (req, res) => {
//    res.send('Your pizza is on the way!')
//})
//
//app.get('/pizza/pineapple', (req, res) => {
//    res.send('We don\'t serve that here. Never call again!')
//})
//
app.listen(8000, () => {
    console.log('Express server is listening on port 8000!')
})
//
app.get('/', (req, res) => {
    console.log('The root path was called')
    res.send('Hello Express!')
})
//
//app.get('/echo', (req, res) => {
//    const responseText = `Here are some details of your request:
//        Base URL: ${req.baseUrl}
//        Host: ${req.hostname}
//        Path: ${req.path}
//        IP: ${req.ip}
//        method: ${req.method}
//    `;
//    res.send(responseText);
//});
//
//app.get('/queryViewer', (req, res) => {
//    console.log(req.query);
//    res.end();
//});