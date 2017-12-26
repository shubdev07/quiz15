'use strict';

const { isName, isEmail } = require('../../../lib/validation.utility');
var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    fname: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: isName,
            message: '{VALUE} is not a valid first name'
        },
        required: [true, 'First Name is a required field']

    },
    lname: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: isName,
            message: '{VALUE} is not a valid last name'
        },
        required: [true, 'Last Name is a required field']

    },
    age: {
        type: Number,
        trim: true,
        required: false,
        default: null
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        validate: {
            validator: isEmail,
            message: '{VALUE} is not a valid field',
        },
        required: [true, 'Email is a required field']
    },

    /*userId: {
        type: String,
        trim:true,
        required: [true, 'userId is a required field']
    },*/
    country: {
        type: String,
        trim: true,
        lowercase: true,
        required: false,
        default: null
    },
    password: {
        type: String,
        trim: true,
        lowercase: true,
        required: [true, 'password is a required field']
    },
    gender: {
        type: String,
        trim: true,
        uppercase: true,
        enum: ['M', 'F', 'O', null],
        required: false,
        default: null
    },
    correctAnswers: {
        type: Number,
        default: 0
    },
    totalPoints: {
        type: Number,
        default: 0
    },

    wrongAnswers: {
        type: Number,
        default: 0
    },
    tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test'
    }],

    accountActive: {
        type: Number,
        default: 1
    }
}, {
    strict: true,
    runSettersOnQuery: true,
    timestamps: {
        createdAt: 'created',
        updatedAt: 'updated'
    }
});


/* userSchema.pre('save', function(next) {
    let _this = this;
    var hash = bcrypt.hashSync(_this.password, 8);
    _this.password = hash;
    return next();
});
  if(_this.isNew || _this.isModified('password')) {
    bcrypt.hash(_this.password, 5, function(err, hashedPassword) {
      _this.password = hashedPassword;
      return next();
    });
  } else {
    return next();
  } */




module.exports = mongoose.model('User', userSchema);