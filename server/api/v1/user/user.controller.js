'use strict';

const User = require('./user.model');
const bcrypt = require('bcryptjs');

module.exports.getById = function(req, res, next) {
    User.findById(req.params.id, { fname: 1, lname: 1, gender: 1, email: 1, country: 1, correctAnswers: 1, totalPoints: 1, wrongAnswers: 1, password: 1 }, function(err, user) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        return res.status(200).json({ message: null, data: user });
    });
};

module.exports.all = function(req, res, next) {
    var query = {};
    if (req.query.hasOwnProperty('accountActive')) {
        query.accountActive = req.query.accountActive;
    }
    if (req.query.hasOwnProperty('name')) {
        query.name = { $regex: req.query.name, $options: 'i' };
    }
    User.find(query, 'fname email totalPoints correctAnswers', function(err, users) {
        if (err) {
            err.status = 404;
            return next(err);
        }
        return res.status(200).json({ message: null, data: users });
    });
};

module.exports.add = function(req, res, next) {
    console.log(req.body);
    var user = new User(req.body);
    User.find({ email: req.body.email }, function(err, doc) {
        if (err) {
            {
                err.status = 406;
                return next(err);
            }
        }
        if (doc.length) {
            return res.status(409).json({ message: 'Email already exist' });
        } else {
            user.save(function(err, doc) {
                    if (err) {
                        err.status = 406;
                        return next(err);
                    }
                    return res.status(201).json({ message: 'Your account has been created successfully. Please login to continue.', data: doc });
                }) //end of user.save
        } //end of else


    });
};

/*module.exports.loginEmail = function(req, res, next) {
    User.find({ email: req.body.email }, function(err, user) {
        if (err) {
            return next(err);
        }
        if (!user.length) {
            return res.status(404).json({ message: 'User with specified email doesn\'t exists', data: null });
        }
        if (!user[0].accountActive) {
            return res.status(404).json({ message: 'You have deactivated your account', data: null });
        }
         if(user[0].email === 'shubworkmail@gmail.com'){
           console.log(user[0].email);
           return res.sendFile('/admin.html');
         }
        if(!user.emailVerified) {
          return res.status(404).json({message: 'Please verify your email to continue', data: null});
        }
        // res.cookie('uid', user[0]._id, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false});
        return res.status(200).json({ message: 'Enter Your password', data: null });
    });
}; */
module.exports.login = function(req, res, next) {
    User.findOne({ email: req.body.email, password: req.body.password }, function(err, user) {
        if (err) {
            return next(err);
        } else if (!user) {
            return res.status(404).json({ message: 'user doesn\'t exist', data: null });
        }
        /* if(user[0].email === 'shubworkmail@gmail.com'){
         console.log(user[0].email);
         return res.sendFile('/admin.html');
         }*/
        /*if(!user.emailVerified) {
         return res.status(404).json({message: 'Please verify your email to continue', data: null});
         }*/
        // res.cookie('uid', user[0]._id, {maxAge: 1000 * 60 * 60 * 24 * 7, httpOnly: false});
        else {
            //console.log(req.body.password,user.password);
            console.log(user);
            return res.status(200).json({ message: 'Logging in', data: user });
            /* bcrypt.compare(req.body.password,user.password,function(err,match){
              if(err){
                 console.log(err);
              }
              else{
                 console.log(match);
              }
             })*/

            /*  user.compare(req.body.password,function(arr){
                  console.log(`-----------${arr}-------------`);
              })*/
        }

    });
};

module.exports.deactivate = function(req, res, next) {
    User.findByIdAndUpdate(req.params.uid, { accountActive: false }, { new: true }, function(err, user) {
        if (err) {
            err.status = 500;
            return next(err);
        }
        if (!user) {
            return res.status(404).json({ message: 'User doesn\'t exists' });
        }
        return res.status(200).json({ message: 'Your account has been removed successfully.' });
    });
};

module.exports.edit = function(req, res, next) {
    User.findOneAndUpdate({ "_id": req.body._id }, { "$set": req.body }, { new: true },
        function(err, doc) {
            if (err) {
                err.status = 406;
                return next(err);
            } else if (!doc) {
                return res.status(400).json({ message: "Cant perform the operation" });
            }
            return res.status(200).json({
                message: 'Profile Updated',
                data: doc
            });

        });

};



module.exports.updateScore = function(req, res, next) {
    User.findOne({ "_id": req.body._id }, function(err, user) {
        console.log(req.body);
        if (err) {
            err.status = 500;
            console.log("error occued");
            return next(err);
        }
        if (!user) {
            return res.status(404).json({ message: 'User doesn\'t exists' });
        } else {
            User.findOneAndUpdate({ "_id": user._id }, { correctAnswers: user.correctAnswers + req.body.correctAnswers, totalPoints: user.totalPoints + req.body.totalPoints, wrongAnswers: user.wrongAnswers + req.body.wrongAnswers }, { new: true }, function(err, newDoc) {
                console.log(newDoc);
                return res.status(200).json({ message: 'Your score has been added successfully.', doc: newDoc });

            })

        }

    });

};

module.exports.test = (req, res) => {
    res.send('I am for test purpose');
}