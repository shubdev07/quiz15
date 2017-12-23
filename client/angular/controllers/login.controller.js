/**
 * Created by Workspace on 29-Sep-17.
 */
quizApp.controller("login", ['$scope', '$http', '$location', 'loginFactory', 'localStorageService', function($scope, $http, $location, loginFactory, localStorageService) {
    console.log("login controller worked");

    $scope.login = function(email, password) {
        loginFactory.login(email, password);
    }

}]);