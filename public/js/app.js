// public/js/APP.JS //

'use strict';

// Declare app level module which depends on filters, and services
angular.module('openTab', ['openTab.services', 'ngRoute', 'ngResource', 'satellizer'])
.config(function ($locationProvider, $routeProvider) {
    
    $routeProvider.when('/', {
        templateUrl: 'templates/splash'
    });

    $routeProvider.when('/tabs', {
        templateUrl: 'templates/tabs-index',
        controller: 'TabsCtrl'
    });

    $routeProvider.when('/transactions', {
        templateUrl: 'templates/tab-show',
        controller: 'TransactionsCtrl'
    });

    $routeProvider.otherwise({redirectTo: '/'});

    $locationProvider.html5Mode(true);
});