/* Database App
 * 
 * Author: Michal Tuleja <michal.tuleja@outlook.com>
 */

'use strict';

// Initialize app
var databaseApp = angular.module('databaseApp',
        [
            'ui.bootstrap',
            'ngRoute',
            'loginModule',
            'browserModule',
            'navbarModule',
            'editModal',
            'Authentication',
            'ngCookies',
            'customFilters'
        ]);
        
databaseApp.config(['$routeProvider',
    function ($routeProvider) {
        $routeProvider.
                when('/browse', {
                    templateUrl: 'components/browser/Browser.template.html',
                    controller: 'BrowserCtrl'
                }).
                when('/login', {
                    templateUrl: 'components/login/Login.template.html',
                    controller: 'LoginCtrl'
                }).
                otherwise({
                    redirectTo: '/browse'
                });
    }]);

databaseApp.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.useXDomain = true;
        $httpProvider.defaults.withCredentials = true;
        /**
         * Just setting useXDomain to true is not enough. AJAX request are also
         * send with the X-Requested-With header, which indicate them as being
         * AJAX. Removing the header is necessary, so the server is not
         * rejecting the incoming request.
         **/
        delete $httpProvider.defaults.headers.common['X-Requested-With'];
    }]);

databaseApp.run(['$rootScope', '$location', '$cookies', '$http',
    function ($rootScope, $location, $cookies, $http) {

        $rootScope.urlPrefix = 'http://localhost:3010/api';

        // keep user logged in after page refresh
        $rootScope.globals = $cookies.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
        });
    }]);
