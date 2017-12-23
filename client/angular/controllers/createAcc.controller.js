/**
 * Created by Workspace on 29-Sep-17.
 */
quizApp.controller("createAcc",['$scope','$http','$location','$timeout','signup','$log',function ($scope,$http,$location,$timeout,signup,$log) {
    //$scope.response = false;
    $scope.createAcc = function () {

        signup.createAcc($scope.fName, $scope.email, $scope.password)
            .then(function successCallback(response) {
                $log.log(response);
                alert("success occured");
                // this callback will be called asynchronously
                // when the response is available
            }, function errorCallback(response) {
                $log.log(response);
                if(response.status === 409) {
                    alert("email already exists");
                }
                if(response.status !==409 ){
                    alert("some error occurred")
                }
                // called asynchronously if an error occurs
                // or server returns response with an error status.
            });

        /*.then(function successCallback(response) {
         // console.log(response);
         console.log("12345");
         $scope.status = response.data.status;


         console.log($location.path);
         /!* $timeout(function () {
         $scope.response = true;
         $location.path('/login')
         },1000)*!/

         }
         ,function errorCallback(response) {
         $scope.response = "error occured";
         console.log("fgfdgd");


         }
         );*/


    }
}


]);