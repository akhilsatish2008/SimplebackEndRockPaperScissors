//declare our variables. these are the modules that allow our server to do stuff. 

const http = require('http');
const fs = require('fs')
const url = require('url');
const querystring = require('querystring');
const figlet = require('figlet')

//initialize the server.
const server = http.createServer((req, res) => {
  const page = url.parse(req.url).pathname;
  const params = querystring.parse(url.parse(req.url).query);
  console.log(page);
  if (page == '/') {
    fs.readFile('index.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherpage') {
    fs.readFile('otherpage.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/otherotherpage') {
    fs.readFile('otherotherpage.html', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.write(data);
      res.end();
    });
  }
  else if (page == '/api') {
    if ('student' in params) {
      if (params['student'] == 'leon') {
        let playRound = rockPaperScissors()
        res.writeHead(200, { 'Content-Type': 'application/json' });
        const objToJson = {
          name: "leon",
          status: "Boss Man",
          currentOccupation: playRound,
        }
        res.end(JSON.stringify(objToJson));
      }//student = leon
      else if (params['student'] != 'leon') {
        res.writeHead(200, { 'Content-Type': 'application/json' });

        const objToJson = {
          name: "whodat",
          status: "unknown",
          currentOccupation: "unknown"
        }
        res.end(JSON.stringify(objToJson));
      }//student != leon
    }//student if
  }//else if
  else if (page == '/css/style.css') {
    fs.readFile('css/style.css', function (err, data) {
      res.write(data);
      res.end();
    });
  } else if (page == '/js/main.js') {
    fs.readFile('js/main.js', function (err, data) {
      res.writeHead(200, { 'Content-Type': 'text/javascript' });
      res.write(data);
      res.end();
    });
  } else {
    figlet('404!!', function (err, data) {
      if (err) {
        console.log('Something went wrong...');
        console.dir(err);
        return;
      }
      res.write(data);
      res.end();
    });
  }
});

server.listen(8000);


function rockPaperScissors() {
  let random = Math.random()
  if (random < 0.33) {
    return 'rock'
  } else if (random < 0.66) {
    return 'paper'
  } else {
    return 'scissors'
  }
}

function battleAgainstBot(myChoice) {
  let bot = rockPaperScissors()
  if (myChoice === 'Paper' && bot === 'Rock' || myChoice === 'Rock' && bot === 'Scissors' || myChoice === 'Scissors' && bot === 'Paper') {
    return 'You Win!!'
  } else if (myChoice === bot) {
    return 'Tie'
  } else {
    return 'You lose'
  }

}
