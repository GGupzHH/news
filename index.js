const express = require('express')




const app = express()
app.engine('html', require('express-art-template'))
app.use('/node_modules', express.static('./node_modules'))

app.get('/', (request, response)=> {
  response.render('pm.html')
})


app.listen('3000', () => {
  console.log('服务器开启了------')
})