/**
 * Created by Workspace on 29-Sep-17.
 */

quizApp.controller("category", ['$scope', '$http', '$window', 'authFactory', 'localStorageService', '$uibModal', '$log', '$timeout',
    function($scope, $http, $window, authFactory, localStorageService, $uibModal, $log, $timeout) {
        var _id = authFactory._id;
        alert(_id);
        $timeout(() => {
            if (_id === null) {
                alert(_id);
                $window.location.href = "#/home";
            } else {
                alert('else wala ' + _id);

                $window.scrollTo(0, 0);
                $scope.user = {
                    name: authFactory.fname
                };
                $scope.logout = function() {

                    localStorageService.clearAll();
                    $window.location.reload();
                    $window.location.href = "#/home";
                }
                $scope.animationsEnabled = false;

                $scope.openTestInfo = function(size, category) {

                    var modalInstance = $uibModal.open({
                        animation: $scope.animationsEnabled,
                        templateUrl: '/angular/views/test-info.html',
                        controller: function($scope, $uibModalInstance, category) {
                            $scope.category = category;
                            $scope.ok = function() {
                                $uibModalInstance.close();
                            };

                            $scope.cancel = function() {
                                $uibModalInstance.dismiss('cancel');
                            };
                        },
                        size: size,
                        resolve: {
                            category: function() {
                                return category;
                            }
                        }
                    });

                    modalInstance.result.then(function(selectedItem) {
                        $scope.selected = selectedItem;
                    }, function() {})
                };
                var main = this;
                main.leaderBoard = [];
                main.response = {};
                $http.get('/api/v1/users')
                    .then(function(response) {

                        angular.forEach(response.data.data, function(user) {
                            main.leaderBoard.push({ name: user.fname, points: user.totalPoints });
                        });

                    })
                    .catch((err) => {
                        alert('Some error occurred while retrieving leaderBoard');
                    })

            }
        }, 2000)

    }
]);