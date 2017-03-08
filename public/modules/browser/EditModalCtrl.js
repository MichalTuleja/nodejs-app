var sendModal = angular.module('editModal', []);

sendModal.controller('EditModalCtrl', function ($scope, $modalInstance, $rootScope, $http, obj) {
    console.log(obj);
    
    $scope.status = 'Idle';
    
    $scope.objData = {};
    $scope.genericForm = {};
    $scope.objData.form = obj;
    
    $scope.close = function () {
        $modalInstance.close();
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

    $scope.send = function() {
        $scope.status = 'Sending...';
        
        var url = obj['_links']['self']['href']
        var urlParts = url.split('/').reverse();
        var sendUrl = ['', urlParts[1], urlParts[0]].join('/');
        
        var urlPrefix = $rootScope.urlPrefix;
        
        var sendObj = {};
        
        for(key in $scope.objData.form) {
            if(key !== '_links' && key !== '$$hashKey') {
                sendObj[key] = $scope.objData.form[key];
            }
        }
        
        console.log(sendObj);
        
        $http.put(urlPrefix + sendUrl, JSON.stringify(sendObj))
                .then(function(res) {
                    $scope.status = 'Sent.';
                    console.log(res);
                    $scope.close();
                }, function(res) {
                    $scope.status = 'Fail.';
                    console.log(res);
                });
    };
    

});