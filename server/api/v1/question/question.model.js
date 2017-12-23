/**
 * Created by Admin on 23-09-2017.
 */
var mongoose = require('mongoose');
var Category = require('../category/category.model');

var questionSchema = new mongoose.Schema({
    questionText: {
        type: String,
        trim: true,
        required : [true, 'Question text is a required field']
    },
    options: [String],
    answer: {
        type: Number,
        min: 0,
        max: 3,
        required: [true, 'Answer is a required field']
    },
    solution: {
        type: String,
        trim: true,
        required: false,
        default: ''
    },
    category: {
        type: String,
        trim: true,
        lowercase: true,
        required :[true, 'Question category is a required field']
    },
    difficultyLevel: {
        type: String,
        trim: true,
        enum: ['E', 'M', 'H'],
        required: [true, 'Difficulty level is a required field']
    },
    questionActive: {
        type: Number,
        default: 1
    }
},
    {
        strict: true,
        runSettersOnQuery: true,
        timestamps: {
            createdAt: 'created', updatedAt: 'updated'
        }


});
questionSchema.path('options').validate({
    isAsync : false,
    validator: function (options) {
        return options.length === 4;
    },
    message: 'Each question must have 4 options'
});
questionSchema.pre('save',function (next) {
    var _this = this;
    console.log(_this);
    Category.findOneAndUpdate(
        {name:_this.category},
        {$push:{questions:_this}},
        {new:true})
        .then(doc => {
            if(doc){
                return next();
            } else {
                return next(new Error('Category not found'));
            }
        })
    .catch(err => next(err));
});
module.exports = mongoose.model('Question',questionSchema);