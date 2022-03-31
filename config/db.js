const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(
            process.env.DB_CONN_STR,
            {
                useNewUrlParser: true
            }
        );

        console.log('MongoDB is connected');
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;