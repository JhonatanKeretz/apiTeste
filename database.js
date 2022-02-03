const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


mongoose.connect('mongodb://localhost/javascriptNode', {
    useNewUrlParser: true,
    useUnifiedTopology: true
   
}).then(() => console.log('Connection succesful'))
.catch((err) => console.log(err));