/**
 * Created by Workspace on 18-Nov-17.
 */
quizApp.controller('homeController', ['$scope', '$timeout', 'localStorageService', 'loginFactory', 'signup', '$window', '$route', function($scope, $timeout, localStorageService, loginFactory, signup, $window, $route) {

    var main = this;
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
    main.loginSuccess = false;
    main.serverError = false;
    main.serverErrorSignup = false;
    main.emailField = "email";
    main.passwordField = "password";
    $scope.login = function() {

        main.signupBtn = true;
        main.loginBtnDisable = true;

        loginFactory.login($scope.email, $scope.password)
            .then(function(doc) {
                main.serverError = false;
                main.loginSuccess = true;
                localStorageService.set('_id', doc.data.data._id);
                localStorageService.set('fname', doc.data.data.fname);
                //$window.location.href = '#/category';
                $timeout(() => {
                    $window.location.href = '#/category';
                    $window.scrollTo(0, 0);
                }, 2000)
            })
            .catch(function(err) {
                if (err.status >= 500) {
                    main.serverError = true;
                } else {
                    main.userInfo = true;
                    main.loginBtnDisable = false;
                }


            })
    }

    $scope.signUp = function() {
        main.signupBtnDisable = true;

        signup.createAcc($scope.fname, $scope.lname, $scope.new_email, $scope.new_password)
            .then(function(doc) {

                localStorageService.set('_id', doc.data.data._id);
                localStorageService.set('fname', doc.data.data.fname);
                main.accInfo = true;
                main.userInfo = false;
                main.emailErr = false;
                main.serverErrorSignup = false;

                $timeout(() => {
                    $window.location.href = '#/category';
                }, 1500)
            })
            .catch(function(err) {
                main.signupBtnDisable = false;
                if (err.status === 409) {
                    main.signUpEmail = true;
                }
                if (err.status === 406) {
                    main.signUpEmail = false;

                    if (err.data.errors.fname) {
                        main.signUpEmail = false;

                        main.fnameErr = true;
                        main.lnameErr = false;
                        main.emailErr = false;
                        main.passwordErr = false;
                    } else if (err.data.errors.lname) {
                        main.lnameErr = true;
                        main.fnameErr = false;
                        main.emailErr = false;
                        main.passwordErr = false;
                    } else if (err.data.errors.email) {
                        main.lnameErr = false;
                        main.emailErr = true;
                    } else if (err.data.errors.password) {
                        main.passwordErr = true;
                    }
                }
                if (err.status >= 500) {
                    main.serverErrorSignup = true;
                }




            })
    }

}]);