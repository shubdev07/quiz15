/**
 * Created by Workspace on 18-Nov-17.
 */
quizApp.factory('authFactory', ['$http', 'localStorageService', function($http, localStorageService) {
    var _id = localStorageService.get('_id');
    var fname = localStorageService.get('fname');
    return {
        _id: _id,
        fname: fname
    }
}]);