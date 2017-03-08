var navbarModule = angular.module('navbarModule', []);

navbarModule.controller('NavbarCtrl', ['$rootScope', '$scope', '$location', '$routeParams', '$http',
    function($rootScope, $scope, $location, $routeParams, $http) {
        $scope.templates =
            [ { name: 'template1.html', url: 'components/navbar/navbar.template.html'}
                , { name: 'template2.html', url: 'components/navbar/navbar2.html'} ];
        $scope.template = $scope.templates[0];

        $scope.searchExpr = {text: '',
            pattern: ''};

        $scope.doSearch = function() {

            var searchExpr = $scope.searchExpr.text;
            console.log('searchExpr: ' + searchExpr);

            if(searchExpr.replace(' ', '') !== '') {
                $location.path('/search/' + searchExpr);
            }
        }

    }]);
