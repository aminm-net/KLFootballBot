var mongoose = require('mongoose');
var dburi = 'mongodb://alice:Password1@ds119533.mlab.com:19533/klfootball';

mongoose.connect(dburi,{
  useMongoClient: true,
});


var Cat = mongoose.model('Cat', { name: String });

var kitty = new Cat({ name: 'Zildjian' });
kitty.save(function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log('meow');
  }
});