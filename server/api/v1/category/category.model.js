/**
 * Created by Workspace on 12-Oct-17.
 */
var mongoose = require('mongoose');

var categorySchema = new mongoose.Schema (
    {
        name: {
            type: String,
            trim: true,
            required: [true,'Category is a required field']
        },
        tests: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Test'
        }],
        questions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Question'
        }],

    },
    {
        strict: true,
        runSettersOnQuery: true
    }
);

categorySchema.path('name').validate({
    isAsync:true,
    validator: function (categoryName,respond) {
        this.constructor.findOne({name: categoryName, respond})
            .then(category => respond(!category))
            .catch(err => respond(false));
    },
    message : 'This category already exists'


});
module.exports = mongoose.model('Category',categorySchema);