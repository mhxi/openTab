// public/js/controllers/USERSCTRL.JS //

'use strict';

angular.module('tabApp')

    .controller('TabCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {
        $http.get('/api/me').success(function (data) {
            $scope.user = data;
        });

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
    }]);