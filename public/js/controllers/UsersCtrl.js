// public/js/controllers/USERSCTRL.JS //

'use strict';

angular.module('tabApp')

    .controller('ProfileCtrl', ['$scope', '$http', '$auth', 'Auth', function ($scope, $http, $auth, Auth) {
        $http.get('/api/me').success(function (data) {
            $scope.user = data;
        });

        $scope.createPost = function() {
            $http.post('/api/posts', $scope.post)
            .success(function (response) {
                $scope.user.posts.unshift(response);
                $scope.post = {};
            })
            .error(function (response) {
                console.log(response) //CHECK
            });
        };
    }]);