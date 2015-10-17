var express = require('express')
  , app = express()

var db = require('./db')

app.engine('jade', require('jade').__express)
app.set('view engine', 'jade')

app.use('/comments', require('./controllers/comments'))
app.use('/users', require('./controllers/users'))

// Connect to Mongo on start
db.connect('mongodb://localhost:27017/mydatabase', function(err) {
  if (err) {
    console.log('Unable to connect to Mongo.')
    process.exit(1)
  } else {
    app.listen(3000, function() {
      console.log('Listening on port 3000...')
    })
  }
})