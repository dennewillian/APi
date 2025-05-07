const express = require('express')
const app = express()
const port = 4000

app.get('/', (request, response) => {
  response.send('Testing Hello World!')
})

app.listen(port, () => {
  console.log(`Test app listening at http://localhost:${port}`)
})