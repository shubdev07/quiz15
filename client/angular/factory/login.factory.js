/**
 * Created by Workspace on 15-Nov-17.
 */
quizApp.factory('loginFactory', ['$http', 'localStorageService', '$window', function($http, localStorageService, $window) {
    var login = function(email, password) {
        console.log(email, password);
        var data = { email: email, password: password };
        return $http.post('/api/v1/user/login', data)

    };

    return {
        login: function(email, password) {
            var data = login(email, password);
            console.log(data);
            return data;
        }
    }


}]);