quizApp.controller('editProfileController', ['$scope', '$timeout', '$rootScope', 'localStorageService', '$http', '$window', 'authFactory', '$route', '$interval', function($scope, $timeout, $rootScope, localStorageService, $http, $window, authFactory, $route, $interval) {
    var _id = $rootScope._id;


    if (_id === undefined || _id === null) {
        $window.location.href = "#/home";
    }
    $scope.logout = function() {

        localStorageService.clearAll();
        $window.location.reload();
        $window.location.href = "#/home";
    };
    var main = this;
    main.user = {};
    main.userInfo = false;
    main.signupBtn = false;
    main.accInfo = false;
    main.signUpEmail = false;
    main.fnameErr = false;
    main.lnameErr = false;
    main.emailErr = false;
    main.passwordErr = false;
    main.loginBtnDisable = false;
    main.signupBtnDisable = false;
    main.serverError = false;
    $http.get(`/api/v1/user/${_id}`)
        .then((res) => {

            main.user.fname = res.data.data.fname;
            main.user.lname = res.data.data.lname;
            main.user.gender = res.data.data.gender;
            main.user.country = res.data.data.country;
            main.user.password = res.data.data.password;
        })
        .catch((err) => {
            alert('Error while retrieving info, kindly refresh the page');
        })
    main.user.newPass = '';
    main.user.confirmPass = '';
    main.confirmPassMsg = false;

    main.editProfile = function() {
        main.accInfo = false;
        if (main.user.newPass !== main.user.confirmPass) {

            main.confirmPassMsg = true;

        } else {
            main.confirmPassMsg = false;

            data = { _id: _id, fname: main.user.fname, lname: main.user.lname, gender: main.user.gender, password: main.user.newPass || main.user.password };

            $http.post('/api/v1/user/edit', data)
                .then(function(doc) {
                    $timeout(() => {
                        main.accInfo = false;
                    }, 3000);
                    main.accInfo = true;

                    main.userInfo = false;
                    main.serverError = false;

                })
                .catch(function(err) {
                    main.editBtnDisable = false;
                    if (err.status === 409) {

                    }
                    if (err.status === 406) {
                        main.accInfo = false;

                        if (err.data.errors.fname) {


                            $timeout(() => {
                                main.fnameErr = false;
                            }, 3000);
                            main.fnameErr = true;
                            main.lnameErr = false;
                            main.passwordErr = false;
                        } else if (err.data.errors.lname) {
                            $timeout(() => {
                                main.lnameErr = false;
                            }, 3000);
                            main.lnameErr = true;
                            main.fnameErr = false;

                            main.passwordErr = false;
                        } else if (err.data.errors.email) {
                            main.lnameErr = false;

                        } else if (err.data.errors.password) {
                            $timeout(() => {
                                main.passwordErr = false;
                            }, 3000);
                            main.passwordErr = true;
                        }
                    }
                    if (err.status >= 500) {
                        main.accInfo = false;
                        $timeout(() => {
                            main.serverError = false;
                        }, 10000);
                        main.serverError = true;

                    }




                })
        }
    }

}])