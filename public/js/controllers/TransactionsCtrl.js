// public/js/controllers/TRANSACTIONSCTRL.JS //

'use strict';

angular.module('openTab')
// TRANSACTIONS CONTROLLER //
.controller('TransactionsCtrl', function ($scope, $http, $auth, Auth) {
    
    $http.get('/api/tabs')
    .success(function (data) {
        console.log(data); //CHECK
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
});