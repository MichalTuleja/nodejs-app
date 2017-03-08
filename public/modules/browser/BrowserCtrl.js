var browserModule = angular.module('browserModule', ['editModal']);

browserModule.controller('BrowserCtrl', 
            ['$rootScope', '$scope', '$routeParams', '$http', '$location', '$modal',
    function ($rootScope, $scope, $routeParams, $http, $location, $modal) {

        var urlPrefix = $rootScope.urlPrefix;

        var getData = function (url, callback) {
            $http.get(urlPrefix + url).
                    success(function (data, status, headers, config) {
                        callback(data);
                    }).
                    error(function (data, status, headers, config) {
                        if (status === '401') {
                            $location.path('/login');
                        }
                    });
        };

        $scope.reports = [];
        $scope.header = [];
        $scope.tableContent = [];
        $scope.title = 'Select list name to see its data';
        $scope.tableData = [];

        getData('/', function (data) {
            $scope.reports = Object.keys(data['_links']);
        });

        $scope.showData = function (tableName) {
            $scope.title = tableName;
            $scope.header = [];
            $scope.tableContent = [];

            getData('/' + tableName, function (data) {
                var fieldArr = Object.keys(data['_embedded'][tableName][0]);
                $scope.header = fieldArr;
                $scope.tableContent = data['_embedded'][tableName];
            });
        };

        $scope.activateModal = function (entry) {

            var modalInstance = $modal.open({
                animation: true,
                templateUrl: '/components/browser/EditModal.template.html',
                controller: 'EditModalCtrl',
                //size: 300,
                resolve: {
                    obj: function () {
                        return entry;
                    }
                }
            });

            modalInstance.result.then(function (selectedItem) {
                $scope.showData($scope.title);
            }, function () {
                //console.info('Modal dismissed at: ' + new Date());
            });
        };
        
        $scope.deleteEntry = function(entry) {
            var url = entry['_links']['self']['href']
            var urlParts = url.split('/').reverse();
            var sendUrl = ['', urlParts[1], urlParts[0]].join('/');
        
            var urlPrefix = $rootScope.urlPrefix;
            
            $http.delete(urlPrefix + sendUrl)
                .then(function(res) {
                    $scope.showData($scope.title);
                    console.log(res);
                }, function(res) {
                    console.log(res);
                });
        };
        
        $scope.addEntry = function() {
            var urlPrefix = $rootScope.urlPrefix;
            var sendUrl = ['', $scope.title].join('/');
            
            $http.post(urlPrefix + sendUrl, JSON.stringify({}))
            .success(function(data, status, headers, config) {
                sendUrl = headers('Location');
                $http.get(sendUrl)
                    .success(function(data, status, headers, config) {
                        $scope.activateModal(data);
                    }).error(function(data, status, headers, config){
                       console.log(status);
                    });
            }).error(function(data, status, headers, config){
               console.log(status);
            });
        };
    }]);
