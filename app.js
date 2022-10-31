const express = require('express')
const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send({
    "SlackUserName": "technicaldee",
    "BackEnd": true,
    "Age": 21,
    "Bio": "Tech na oil money!"
 })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})