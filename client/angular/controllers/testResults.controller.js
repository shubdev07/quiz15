/**
 * Created by Workspace on 12-Nov-17.
 */
quizApp.controller('testResults', ['$rootScope', '$http', '$window', 'authFactory', '$timeout', function($rootScope, $http, $window, authFactory, $timeout) {
    var _id = authFactory._id;
    //console.log(_id);
    if (_id === null) {
        $window.location.href = "#/home";
    } else {
        /*   $rootScope.$on('$locationChangeStart', function(event, next, current) {
              
              //alert('You cannot go back from here');
              $window.location.href = '#/category';
          }); */
        var main = this;
        main._id = _id;
        main.leaderBoard = [];
        main.testResults = {
            correctAnswers: $rootScope.testResults.correctAnswers,
            totalPoints: $rootScope.testResults.totalPoints,
            negativePoints: $rootScope.testResults.negativePoints || 0,
            wrongAnswers: $rootScope.testResults.wrongAnswers
        };
        //for getting leaderboard scores

        main.newScore = {};
        $http.post('/api/v1/user/updateScore', {
                _id: main._id,
                correctAnswers: $rootScope.testResults.correctAnswers,
                totalPoints: ($rootScope.testResults.totalPoints - main.testResults.negativePoints),
                wrongAnswers: ($rootScope.testResults.wrongAnswers)
            })
            .then(function(response) {
                main.newScore.correctAnswers = response.data.doc.correctAnswers;
                main.newScore.currentPoints = response.data.doc.totalPoints;
                main.newScore.wrongAnswers = response.data.doc.wrongAnswers;

            })
            .catch(function(err) {
                //console.log(err);

            });
        $timeout(() => {
            $http.get('/api/v1/users')
                .then(function(response) {
                    console.log(response);
                    angular.forEach(response.data.data, function(user) {
                        console.log(user);
                        main.leaderBoard.push({ name: user.fname, correctAnswers: user.correctAnswers });
                    });
                    console.log(main.leaderBoard);
                })
                .catch((err) => {

                    //console.log(err);
                })
        }, 1500)


    } //end of else
}]);