/**
 * Created by Workspace on 04-Nov-17.
 */
quizApp.controller('test', ['$scope', '$http', '$routeParams', '$window', '$timeout', '$rootScope', 'authFactory', '$uibModal', '$log', '$location', function($scope, $http, $routeParams, $window, $timeout, $rootScope, authFactory, $uibModal, $log) {
    var _id = authFactory._id;
    if (_id === null) {
        $window.location.href = "#/home";
    } else {
        var main = this;
        main.correct_msg = false;
        main.wrong_msg = false;
        main.number = 0;
        main.seconds = 0;
        main.disableBtn = false;
        main.quit = false;

        /*   var windowElement = angular.element($window);
          windowElement.on('beforeunload', function(event) {
              // do whatever you want in here before the page unloads.

              // the following line of code will prevent reload or navigating away.
              //event.preventDefault();
              $rootScope.negativePoints += 10;

              console.log("hey");
          }); */


        $rootScope.testResults = {
            correctAnswers: 0,
            totalPoints: 0,
            negativePoints: 0,
            wrongAnswers: 0
        };
        $rootScope.closeTest = () => {
            $timeout(function() {

                $window.location.href = "#/test-results";
            }, 2000);
        };


        main.score = $rootScope.testResults.totalPoints + $rootScope.testResults.negativePoints;
        $scope.timer = function() {
                var timeOut = $timeout(function() {
                    main.seconds--;

                    if (main.seconds > 0) {
                        $scope.timer();

                    }
                    if (main.seconds === 0) {

                        $rootScope.cancel = 1;
                        $rootScope.testResults.negativePoints += 5;
                        $window.location.href = "#/test-results";
                        $timeout.cancel(timeOut);

                    }
                }, 1000);
                $scope.$on("$destroy", function(event) {

                    $timeout.cancel(timeOut);
                });
            }
            //$scope.timer();

        main.playCorrectAudio = function() {
            var audio = new Audio('../../assets/sound/correct.ogg');
            audio.play();
        };
        main.playWrongAudio = function() {
            var audio = new Audio('../../assets/sound/wrong.ogg');
            audio.play();
        };

        main.userAnswer = function(number, ans) {

            if (ans === main.response.questions[main.number].answer) {
                main.playCorrectAudio();
                main.seconds = -1;
                main.correct_msg = true;
                main.disableBtn = true;

                $rootScope.testResults.correctAnswers++;
                if (main.response.questions[main.number].difficultyLevel === 'E') {
                    $rootScope.testResults.totalPoints += 3;
                    main.score += 3;
                } else if (main.response.questions[main.number].difficultyLevel === 'M') {
                    $rootScope.testResults.totalPoints += 5;
                    main.score += 5;
                } else if (main.response.questions[main.number].difficultyLevel === 'H') {
                    $rootScope.testResults.totalPoints += 7;
                    main.score += 7;
                }
                main.incrementLimit();

            } else {
                main.playWrongAudio();
                main.correct_msg = false;
                main.disableBtn = true;
                main.wrong_msg = true;
                main.seconds = -1;
                $rootScope.testResults.negativePoints += 5;
                $rootScope.testResults.wrongAnswers += 1;

                main.closeTest();

            }
            //console.log(number,ans);
        };
        main.closeTest = () => {
            $timeout(function() {

                $window.location.href = "#/test-results";
            }, 2000);
        };
        $scope.question = {};
        main.incrementLimit = function() {

            if (main.number < 14) {
                $timeout(function() {
                    if (main.number === 4) {
                        main.quit = true;
                    }
                    main.correct_msg = false;
                    main.disableBtn = false;
                    main.number++;
                    if (main.number < 6) {
                        main.seconds = 15;
                    } else if (main.number >= 6 && main.number <= 10) {
                        main.seconds = 20;
                    } else main.seconds = 25;
                    $scope.timer();
                }, 1000)


            } else main.closeTest();

        };

        $scope.categoryName = $routeParams.name;
        $http.get(`/api/v1/test/show/${$scope.categoryName}`)
            .then(function successCallback(response) {

                main.response = response.data.data;
                main.seconds = 15;
                $scope.timer();




            }, function errorCallback(response) {


            });
    }


    // modal code

    $scope.openTestInfo = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/angular/views/test-info1.html',
                controller: function($scope, $uibModalInstance) {
                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };
                    $scope.$on('$routeChangeStart', function() {
                        $uibModalInstance.dismiss('cancel');
                    })
                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };
                },
                size: size,
                resolve: {
                    category: function() {

                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        // modal code ends

    $scope.quitModal = function(size) {

            var modalInstance = $uibModal.open({
                animation: $scope.animationsEnabled,
                templateUrl: '/angular/views/quit-modal.html',
                controller: function($scope, $rootScope, $uibModalInstance) {
                    $scope.ok = function() {
                        $uibModalInstance.close();
                    };
                    $scope.$on('$routeChangeStart', function() {
                        $uibModalInstance.dismiss('cancel');
                    })

                    $scope.cancel = function() {
                        $uibModalInstance.dismiss('cancel');
                    };

                },
                size: size,
                resolve: {
                    category: function() {

                    }
                }
            });

            modalInstance.result.then(function(selectedItem) {
                $scope.selected = selectedItem;
            }, function() {
                $log.info('Modal dismissed at: ' + new Date());
            });
        }
        // modal code ends

}]);