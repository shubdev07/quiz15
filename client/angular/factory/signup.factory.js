/**
 * Created by Workspace on 31-Oct-17.
 */
quizApp.factory('signup', ['$http', '$log', function($http, $log) {

    return {
        createAcc: function(fname, lname, email, password) {

            var data = { fname: fname, lname: lname, email: email, password: password };
            console.log(data);
            return $http.post('/api/v1/user/add', data)
        }
    }

}]);