var loginModule = angular.module('loginModule', []);

loginModule.controller('LoginCtrl',
    ['$scope', '$rootScope', '$location', 'AuthenticationService',
    function ($scope, $rootScope, $location, AuthenticationService) {
        // reset login status
        AuthenticationService.ClearCredentials();
          
        $scope.login = function (form) {
            $scope.dataLoading = true;
            AuthenticationService.Login(form.username, form.password, function(response) {
                if(response) {
                    $scope.statusText = 'Success';
                    $location.path('/browse');
                } else {
                    $scope.error = response.message;
                    $scope.dataLoading = false;
                    $scope.statusText = 'Fail';
                }
            });
        };
    }]);