/**
 * Created by Workspace on 12-Oct-17.
 */
var mongoose = require('mongoose');
var Category = require('../category/category.model');

var testSchema = new mongoose.Schema({
    category: {
        type: String,
        trim: true,
        lowercase :true,
        required: [true, 'Category is a required field']
    },
        questions: [{}],
},
    {
        strict: true,
        runSettersOnQuery: true
    });

/*testSchema.path('questions').validate({
    isAsync: false,
    validator:function (questionarr) {
        var i=0,j=0,k=0;
        questionarr.forEach(function (q) {

            if(q.difficultyLevel === 'E'){
                i++;
            } else if(q.difficultyLevel === 'M'){
                j++;
            } else if(q.difficultyLevel === 'H'){
                k++
            }
        });
        console.log(i,j,k);
        if(i === 3 && j===2 && k===1)
        return true;
        else return false;
    },
    message : 'There must be 3 questions of easy level, 2 of mediocre level and 1 of hard level'
});*/
testSchema.pre('save',function (next) {
    var _this = this;
    Category.findOneAndUpdate(
        {name:_this.category},
        {$push:{tests:_this}},
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
module.exports = mongoose.model('Test',testSchema);