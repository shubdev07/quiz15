/**
 * Created by Workspace on 29-Sep-17.
 */

quizApp.controller("category", ['$scope', '$http', '$rootScope', '$window', 'authFactory', 'localStorageService', '$uibModal', '$log', '$timeout',
    function($scope, $http, $rootScope, $window, authFactory, localStorageService, $uibModal, $log, $timeout) {
        if ($rootScope._id !== undefined && $rootScope.fname !== undefined) {
            var _id = $rootScope._id;
            var name = $rootScope.fname;
        }
        var _id = localStorageService.get('_id');
        var name = localStorageService.get('fname');
        $rootScope._id = _id;
        $rootScope.fname = name;
        $timeout(() => {
            if (_id === null || _id === undefined) {
                $window.location.href = "#/home";
            } else {
                $window.scrollTo(0, 0);
                $scope.user = {
                    name: name
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
        }, 1000)

    }
]);