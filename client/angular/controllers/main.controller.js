/**
 * Created by Workspace on 26-Sep-17.
 */
quizApp.controller("mainController",function () {
    function stuffController($scope) {
        $scope.$on('$viewContentLoaded', addCrudControls);
    }

});