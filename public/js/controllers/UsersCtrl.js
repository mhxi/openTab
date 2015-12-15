// public/js/controllers/USERSCTRL.JS //

'use strict';

angular.module('openTab')

// TABS CONTROLLER //
.controller('TabCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {

    // GET ALL TABS
    $scope.allTabs = function() {
        $http.get('/api/me')
        .then(function (response) {
            console.log(response); //CHECK
            $scope.user = response.data;
            $scope.tabs = $scope.user.tabs;
        });
    };
    // invoke on controller load
    $scope.allTabs();

    // CREATE TAB
    $scope.createTab = function() {
        $http.post('/api/tabs', $scope.tab)
        .then(function (response) {
            console.log(response); //CHECK
            $scope.user.tabs.unshift(response.data);
            $scope.tab = {};
        });
    };

    // DELETE TAB
    $scope.deleteTab = function(tab) {
        var tabIndex = $scope.tabs.indexOf(tab);
        $http.delete('/api/tabs' + tab._id)
        .then(function (response) {
            console.log(response); //CHECK
            $scope.tabs.splice(tabIndex, 1);
        });
    };


    // $scope.deleteTab = function(tab) {
    //     $http.delete('/api/tabs/' + tab._id)
    //     .then(function (response) {
    //         var tabIndex = $scope.tabs.indexOf(tab);
    //         $scope.tabs.splice(tabIndex, 1);
    //     });
    // };



    // $scope.deleteTab = function(tab, index) {
    //     Tab.remove({ id: tab._id }, function(data) {
    //         $scope.tabs.splice(index, 1);
    //     });
    // };

}])


// TRANSACTIONS CONTROLLER //
.controller('TransactionCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {
    
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
}]);