const mongoose = require('mongoose');

const URI = 'mongodb://mongo:HbRzU85u08Omx5vaKsqi@containers-us-west-107.railway.app:6428'


mongoose.connect(URI)
    .then(db => console.log('DB is connected'))
    .catch(err => console.error(err));

module.exports = mongoose;

