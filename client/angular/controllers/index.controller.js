/**
 * Created by Workspace on 18-Nov-17.
 */
quizApp.controller('indexController',['$scope','localStorageService','authFactory','$window',function($scope,localStorageService,authFactory,$window){
    var _id = authFactory._id;
    if(_id !== null){
        $window.location.href="#/category";
    }
    else {
        $window.location.href="#/home";
    }

}]);