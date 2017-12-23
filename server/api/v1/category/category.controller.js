/**
 * Created by Workspace on 12-Oct-17.
 */
var Category =require('./category.model');

module.exports.add = function (req,res,next) {
    var category = new Category(req.body);
    category.save(function (err,doc) {
        if(err){
            err.status= '406';
            return next(err);
        }
        else {

            return res.status(201).json({message: 'Your category has been added successfully.'});
        }
    });
};
module.exports.read = function (req,res,next) {
    Category.find({},{name:1},function (err,data) {
        if(err){
            err.status =406;
            return next(err);
        }
        return res.status(200).json({message:"Succcesfully found",data:data});
    })
};
module.exports.edit = function (req,res,next) {
    console.log(req.body);
    Category.findOneAndUpdate({name:req.body.name},
    {$set:{name:req.body.edittedName}},
    {new:false})
    .then(doc => {
        if(doc){
            return next();
        } else {
            return next(new Error('Category not found'));
        }
    })
        .catch(err => next(err));
};
module.exports.delete = function (req,res,next) {
    console.log(req.body);
    Category.findOneAndRemove({name:req.body.name},
        {})
        .then((doc) => {
        if(doc){
            return next();
        } else {
            return next(new Error('Category not found'));
        }
    })
        .catch(err => next(err));
};

