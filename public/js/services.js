// public/js/SERVICES.JS //

'use strict';

angular.module('openTab.services', [])
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

.factory('Tab', function ($resource, $window) {
    return $resource('api/tabs/:id', { id: '@_id' }, {
        myTabs: {
            method: 'GET',
            url: '/api/tabs',
            isArray: true
        },
        update: {
            method: 'PUT' //issues a PUT request
        }
    });
});

// .factory('Transaction', function ($resource, $window) {
//     return $resource('api/tabs/:id/transactions', { id: '@_id' }, {
//         update: {
//             method: 'Put' //issues a PUT request
//         }
//     });
// });