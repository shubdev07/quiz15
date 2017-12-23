/**
 * Created by Workspace on 29-Sep-17.
 */
quizApp.controller("admin",['$scope','$http',function ($scope,$http){
   $scope.add = function () {
        var data = {category:{name: $scope.category,question:[{q:$scope.q,options:{option1:$scope.option1,option2:$scope.option2,option3:$scope.option3,option4:$scope.option4},ans:$scope.ans,level:$scope.level}]}};
        $http.post('/api/v1/question/add',data)
            .then(function successCallback(response) {
                    console.log(response);
                    $scope.response = response.data.message;

                }
                ,function errorCallback(response) {
                    $scope.response = "error occurred";

                }
            );

    }
}

]);