const mongoose = require('mongoose')
const app = require('./app')

const mongodb_url = 'mongodb://localhost:27017/miapp'

mongoose.connect(mongodb_url, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => app.listen(3000, () => console.log(`server on port ${3000}`)))
    .catch(error => console.error('error mongodb', error));



