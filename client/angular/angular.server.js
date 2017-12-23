/**
 * Created by Workspace on 27-Oct-17.
 */
var serverApp = angular.module('serverApp',['ngRoute']);
serverApp.config(['$routeProvider', function ($routeProvider) {
    'use strict';
    $routeProvider

        .when('/admin',
            {
                templateUrl: '/angular/views/admin.html',
                controller: 'admin'
            })
        .when('/categories',
            {
                templateUrl: '/angular/views/categories.html',
                controller: 'test'
            })
        .when('/ejs/login',
            {
                templateUrl: '/angular/views/categories.html',
                controller: 'login'
            });
}]);