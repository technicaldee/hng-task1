const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

var rawBodySaver = function (req, res, buf, encoding) {
  if (buf && buf.length) {
    req.rawBody = buf.toString(encoding || 'utf8');
  }
}

app.use(bodyParser.json({ verify: rawBodySaver }));
app.use(bodyParser.urlencoded({ verify: rawBodySaver, extended: true }));
app.use(bodyParser.raw({ verify: rawBodySaver, type: '*/*' }));

const Operation = {
  addition : 'addition',
  subtraction: 'subtraction',
  multiplication: 'multiplication',
  division: 'division'
};

var math_it_up = {
  '+': function (x, y) { return x + y },
  '-': function (x, y) { return x - y },
  '/': function (x, y) { return x / y },
  '*': function (x, y) { return x * y }
}

app.get('/', (req, res) => {
  res.send({
    "SlackUserName": "technicaldee",
    "BackEnd": true,
    "Age": 21,
    "Bio": "Tech money na oil money!"
 })
})

app.post('/test', (req, res) => {
    let {operation_type, x, y} = req.body;
    var obj = req.body
    let todo;

    if(operation_type == Operation.addition){
      todo = '+'
    } else if(operation_type == Operation.subtraction){
      todo = '-'
    } else if(operation_type == Operation.multiplication){
      todo = '*'
    } else if(operation_type == Operation.division){
      todo = '/'
    } else {
      return null
    }

    console.log(todo)

    if(x == '' || y == ''){
      return res.send({'res': 'An error occured'})
    }

    return res.send({
      "slackUsername": "technicaldee",
      "operation_type": operation_type,
      "result": math_it_up[todo](parseInt(x), parseInt(y)),
  })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})