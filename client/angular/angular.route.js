/**
 * Created by Workspace on 26-Sep-17.
 */
quizApp.config(['$routeProvider', function($routeProvider) {
    'use strict';
    $routeProvider
        .when('/', {
            template: '<h3>Hello</h3>',
            controller: 'indexController'

        })
        .when('/home', {
            templateUrl: '/angular/views/home.html',
            controller: 'homeController',
            controllerAs: 'home'

        })
        .when('/signUp', {
            templateUrl: '/angular/views/createAcc.html',
            controller: 'createAcc'
        })
        .when('/login', {
            templateUrl: '/angular/views/login.html',
            controller: 'login'
        })
        .when('/admin', {
            templateUrl: '/angular/views/admin.html',
            controller: 'admin'
        })
        .when('/category', {
            templateUrl: '/angular/views/categories.html',
            controller: 'category',
            controllerAs: 'category'
        })
        .when('/category/:name', {
            templateUrl: '/angular/views/test-info.html',
            controller: 'testInfo'
        })
        .when('/test/:name', {
            templateUrl: '/angular/views/test.html',
            controller: 'test',
            controllerAs: 'test'
        })
        .when('/user/profile', {
            templateUrl: '/angular/views/userProfile.html',
            controller: 'profileController',
            controllerAs: 'profile'
        })
        .when('/user/edit-profile', {
            templateUrl: '/angular/views/editProfile.html',
            controller: 'editProfileController',
            controllerAs: 'profile'
        })
        .when('/test-results', {
            templateUrl: '/angular/views/test-results.html',
            controller: 'testResults',
            controllerAs: 'testResults'

        });

}]);