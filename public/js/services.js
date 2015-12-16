// public/js/SERVICES.JS //

'use strict';

angular.module('openTab.services', [])
// User Resources
.factory('Auth', function ($auth) {
    return {
        currentUser: function() {
            var user = $auth.getPayload();
            var currentUser = {
                _id: user.sub,
                email: user.email,
                picture: user.picture,
                displayName: user.displayName
            };
            return currentUser;
        }
    };
})
// Tab Resources
.factory('Tab', function ($resource, $window) {
    return $resource('api/tabs/:tab_id', { tab_id: '@_id' }, {
        update: {
            method: 'PUT' //issues a PUT request
        }
    });
})
// Transaction Resources
.factory('Transaction', function ($resource, $window) {
    return $resource('api/tabs/:tab_id/transactions/:transaction_id', { tab_id: '@_id', transaction_id: '@_id' }, {
        update: {
            method: 'Put' //issues a PUT request
        }
    });
});