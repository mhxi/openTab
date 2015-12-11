// public/js/APP.JS //

'use strict';

// Declare app level module which depends on filters, and services
angular.module('tabApp', ['tabApp.services', 'ngRoute', 'ngResource', 'satellizer'])

    .config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        
        $routeProvider.when('/', {
            templateUrl: 'templates/splash'
        });

        $routeProvider.when('/tabs', {
            templateUrl: 'templates/tabs-index',
            controller: 'TabCtrl'
        });

        $routeProvider.otherwise({redirectTo: '/'});

        $locationProvider.html5Mode(true);
    }]);