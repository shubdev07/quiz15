/**
 * Created by Admin on 23-09-2017.
 */
const Question = require("./question.model");

module.exports.add = function(req, res, next) {
    var question = new Question(req.body);
    question.save(function(err, doc) {
        if (err) {
            err.status = "406";
            console.log(err);
            return next(err);
        } else {
            return res.status(201).json({
                message: "Your Question has been added successfully.",
                data: doc
            });
        }
    });
};
module.exports.read = function(req, res, next) {
    Question.find({ category: req.params.qcategory },
        "questionText answer category difficultyLevel options questionActive",
        function(err, data) {
            if (err) {
                err.status = 406;
                return next(err);
            }
            return res.status(200).json({
                message: "Questions found",
                data: data
            });
        }
    );
};
module.exports.readById = function(req, res, next) {
    Question.findById({ _id: req.params.id }, function(err, data) {
        if (err) {
            err.status = 406;
            return next(err);
        }
        return res.status(200).json({
            message: "Questions found",
            data: data
        });
    });
};
module.exports.edit = function(req, res, next) {
    Question.findOneAndUpdate({ _id: req.body.id }, { $set: req.body }, { new: true },
        function(err, doc) {
            if (err) {
                err.status = 406;
                return next(err);
            } else if (!doc) {
                return res.status(400).json({ message: "Cant perform the operation" });
            }
            return res.status(200).json({
                message: "Questions edited",
                data: doc
            });
        }
    );
};
module.exports.delete = function(req, res, next) {
    Question.findByIdAndRemove(req.body.id, function(err, doc) {
        if (err) {
            err.status = 406;
            return next(err);
        }
        return res.status(200).json({
            message: "Questions Deleted",
            data: doc
        });
    });
};

module.exports.makeOne = function(req, res, next) {
    Question.update({ questionActive: 0 }, { questionActive: 1 }, { multi: true },
        function(err, doc) {
            if (err) {
                err.status = 406;
                return next(err);
            }
            return res.status(200).json({
                message: "Questions Made 1",
                data: doc
            });
        }
    );
};