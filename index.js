const express = require('express')
const app = express()
const port = 3000

// Route
app.get('/', (req, res) => {
    var a  = 1; 
    var b = 2;

    var c = 3;
  res.send('Xin chào các bạn')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})