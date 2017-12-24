
 /* Created by Workspace on 12-Oct-17.
 */
var Question = require("../question/question.model");
var Test = require("./test.model");
module.exports.add = function(req, res, next) {
    var test = new Test(req.body);
    Test.findOneAndUpdate({ category: req.body.category }, { $push: { questions: { $each: [req.body.questions] } } }, { upsert: true, new: true },
        function(err, doc) {
            if (err) {
                err.status = 406;
                return next(err);
            } else if (!doc) {
                test.save(function(err, doc) {
                    if (err) {
                        err.status = "406";
                        return next(err);
                    } else {
                        return res
                            .status(201)
                            .json({ message: "Your test has been added successfully." });
                    }
                });
            }
            return res.status(200).json({
                message: "Questions added to test",
                data: doc
            });
        }
    );
};
module.exports.show = function(req, res, next) {
    Test.findOne({ category: req.params.name }, function(err, doc) {
        if (err) {
            err.status = 406;
            return next(err);
        }

        return res.status(200).json({ message: "Query successful", data: doc });
    });
};
module.exports.delete = function(req, res, next) {
    Test.findOneAndRemove({ id: req.body.id }, {}, function(err, doc) {
        if (err) {
            err.status = 406;
            return next(err);
        }
        return res.status(200).json({ message: "Delete successfull", data: doc });
    });
};
module.exports.edit = function(req, res, next) {
    Test.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true },
        function(err, doc) {
            if (err) {
                err.status = 406;
                return next(err);
            } else if (!doc) {
                return res.status(400).json({ message: "Cant perform the operation" });
            }
            return res.status(200).json({
                message: "Test updated",
                data: doc
            });
        }
    );
};

module.exports.new = function(req, res, next) {
    console.log("Entered test");
     var questions = [];
    var q = [];
    Question.aggregate(
        [{
                $match: {
                    category: req.params.name,
                    difficultyLevel: "E",
                    questionActive: 1
                }
            },
            {
                $limit: 4
            }

        ],
        function(err, result) {
            if (err) {
                next(err);
            }
            q.push(result);
        }
    );
    Question.aggregate(
        [{
                $match: {
                    category: req.params.name,
                    difficultyLevel: "M",
                     questionActive: 1
                }
            },
            {
                $limit: 5
            }
        ],
        function(err, result) {
            if (err) {
                next(err);
            }
            q.push(result);
        }
    );
    Question.aggregate(
        [{
                $match: {
                    category: req.params.name,
                    difficultyLevel: "H",
                     questionActive: 1

                }
            },
            {
                $limit: 6
            }
        ],
        function(err, result) {
            if (err) {
                next(err);
            }
            q.push(result);


        }
    );

    setTimeout(function() {
        console.log(q.length);
        q.forEach((set,index)=>{
            set.forEach((question)=>{
                    questions.push(question);
            })

        })
         Question.update({ _id: { $in: questions } }, { questionActive: 0 }, { multi: true },
                function(err, docs) {
                    if (err) {
                        next(err);
                    }
                    console.log('ho gaya');

                }
            );
            var newTest = new Test({category: req.params.name,questions:questions});
            newTest.save(function(err,doc){
                if (err) {
                next(err);
            }
            else {
                console.log('ho gaya');
                res.send(` ${req.params.name} Test generation complete`);
            }
            }
        )
    }, 4000);
};
