const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.raw());

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

app.post('/', (req, res) => {
  let {operation_type, x, y} = req.body;
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

  if(x == '' || y == ''){
    return res.send({'res': 'An error occured'})
  }

  res.send({
    "slackUsername": "technicaldee",
    "operation_type": operation_type,
    "result": math_it_up[todo](parseInt(x), parseInt(y)),
 })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})