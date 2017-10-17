var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:28001/myFun', {
  useMongoClient: true,
  promiseLibrary:require('bluebird')
});

var db = mongoose.connection; 
  db.on('error', console.error.bind(console, 'connection error'));
  db.once('open', function () {
    console.log('mongoose is open!')
  });

exports.mongoose = mongoose; 
exports.Schema = mongoose.Schema; 



