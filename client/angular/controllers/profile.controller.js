quizApp.controller('profileController', ['$scope', '$timeout', 'localStorageService', 'loginFactory', 'signup', '$window', 'authFactory', '$http', function($scope, $timeout, localStorageService, loginFactory, signup, $window, authFactory, $http) {
    var _id = authFactory._id;

    if (_id === null) {
        $window.location.href = "#/home";
    }
    $scope.logout = function() {

        localStorageService.clearAll();
        $window.location.reload();
        $window.location.href = "#/home";
    }
    var main = this;
    main.user = {};
    $http.get(`/api/v1/user/${_id}`)
        .then((res) => {

            main.user.fname = res.data.data.fname;
            main.user.lname = res.data.data.lname;
            main.user.email = res.data.data.email;
            main.user.gender = res.data.data.gender;
            main.user.country = res.data.data.country;
            main.user.correctAnswers = res.data.data.correctAnswers;
            main.user.wrongAnswers = res.data.data.wrongAnswers;
            main.user.totalPoints = res.data.data.totalPoints;
        })
        .catch((err) => {
            alert('Error while retrieving info, kindly refresh the page');
        })


}])