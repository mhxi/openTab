// public/js/controllers/TABCTRL.JS //

'use strict';

angular.module('openTab')

.controller('TabCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {

    $scope.allTabs = function() {
        $http.get('/api/me').success(function (data) {
            console.log(data)
            $scope.user = data;
            $scope.tabs = $scope.user.tabs;
        });
    };
    // invoke on controller load
    $scope.allTabs();

    $scope.createTab = function() {
        $http.post('/api/tabs', $scope.tab)
        .success(function (response) {
            $scope.user.tabs.unshift(response);
            $scope.tab = {};
        })
        .error(function (response) {
                console.log(response); //CHECK
            });
    };
}])

.controller('TransactionCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {
    
    $http.get('/api/tabs').success(function (data) {
        $scope.tab = data;
    });

    $scope.createTransaction = function() {
        $http.post('/api/transactions', $scope.transaction)
        .success(function (response) {
            $scope.tab.transactions.unshift(response);
            $scope.transaction = {};
        })
        .error(function (response) {
                console.log(response); //CHECK
            });
    };
}]);