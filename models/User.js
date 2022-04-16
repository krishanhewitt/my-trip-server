const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;

//MongoDB schema for a user account
const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        index: { unique: true }
    },
    password: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    }
},    {
    timestamps: true
});

//Middleware function to hash pwds before inserting in db
UserSchema.pre('save', function(next) {
    let user = this;

    //hash the pwd if it's new or has been modified
    if(!user.isModified('password'))
        return next();

    //generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if(err) return next(err);

        //hash the pwd using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if(err) return next(err);
            user.password = hash;
            next();
        });
    });

});

//Instance method to compare new pwd with existing one
UserSchema.methods.comparePassword = function(candidatePassword, cb) {
    bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch);
    });
};

module.exports = User = mongoose.model('user', UserSchema);