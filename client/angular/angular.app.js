/**
 * Created by Workspace on 26-Sep-17.
 */

var quizApp = angular.module("quizApp", ['ngRoute', 'LocalStorageModule', 'ngAnimate', 'ui.bootstrap']);

quizApp.config(function(localStorageServiceProvider) {
    localStorageServiceProvider
        .setPrefix('');
});