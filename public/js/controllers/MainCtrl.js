// public/js/controller/MAINCTRL.JS //

'use strict';

angular.module('openTab')
.controller('MainCtrl', ['$scope', '$rootScope', '$location', '$auth', '$http', function ($scope, $rootScope, $location, $auth, $http) {

    // LOGIN/REGISTER
    $scope.user = {};

    $scope.isAuthenticated = function() {
        $http.get('/api/me')
        .then(function (response) {
            if (!!response.data) {
                $scope.currentUser = response.data;
            } 
            else {
                $auth.removeToken();
            }
        }, 
        function (response) {
            $auth.removeToken();
            $location.path('/');
        });
    };

    $scope.isAuthenticated();

    $scope.signup = function() {
        $auth.signup($scope.user)
        .then(function (response) {
            console.log(response); //CHECK
            $auth.setToken(response);
            $scope.isAuthenticated();
            $scope.user = {};
        })
        .catch(function (response) {
            console.log(response); //CHECK
        });
    };

    $scope.login = function() {
        $auth.login($scope.user)
        .then(function (response) {
            $auth.setToken(response.data.token);
            $scope.isAuthenticated();
            $scope.user = {};
        })
        .catch(function (response) {
            console.log(response); //CHECK
        });
    };

    $scope.logout = function() {
        $auth.logout()
        .then(function() {
            $auth.removeToken();
            $scope.currentUser = null;
            $location.path('/');
        });
    };
}]);