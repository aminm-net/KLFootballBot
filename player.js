var mongoose = require('mongoose');

var dburi = 'mongodb://alice:Password1@ds119533.mlab.com:19533/klfootball';

mongoose.connect(dburi,{
  useMongoClient: true,
});

var Schema = mongoose.Schema;

var playerSchema = new Schema({
  name: String
});
  
var Player = mongoose.model('Player', playerSchema);


module.exports = Player;

