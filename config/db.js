const mongoose = require('mongoose');
const config = require('config');
const db = config.get('mongoURI');
//const db = config.get('mongoCompass');

const DBConnection = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        });
        console.log('MongoDB connection is working');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = DBConnection;