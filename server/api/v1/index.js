'use strict';

const UserController = require('./user/user.controller');
const QuestionController = require('./question/question.controller');
const CategoryController = require('./category/category.controller');
const TestController = require('./test/test.controller');
const express = require('express');

const router = express.Router();

// User API
router.get('/user/:id', UserController.getById);
router.get('/users', UserController.all);
router.post('/user/add', UserController.add);
router.post('/user/edit', UserController.edit);
router.post('/user/updateScore', UserController.updateScore);
//router.get('/create', UserController.create);
router.post('/user/login/', UserController.login);
router.delete('/user/:uid', UserController.deactivate);
router.get('/test',UserController.test);


//CATEGORIES API
router.post('/category/add', CategoryController.add);
router.get('/category/show', CategoryController.read);
router.post('/category/delete', CategoryController.delete);


//Question API
//router.get('/question/:qid', QuestionController);
router.post('/question/add', QuestionController.add);
router.get('/question/get/:qcategory', QuestionController.read);
router.get('/question/show', QuestionController.read); //show all questions
router.post('/question/edit', QuestionController.edit);
router.post('/question/delete', QuestionController.delete);
router.get('/question/makeOne/:category', QuestionController.makeOne); //make question active
router.get('/question/show/:id', QuestionController.readById);


//Test API
router.post('/test/add', TestController.add);
router.get('/test/show/:name', TestController.show);
router.post('/test/delete', TestController.delete);
router.post('/test/edit', TestController.edit);
router.get('/test/new/:name', TestController.new); //generate test automatically
//router.get('/test/test',TestController.test);

module.exports = router;