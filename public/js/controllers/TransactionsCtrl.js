// public/js/controllers/TRANSACTIONSCTRL.JS //

'use strict';

angular.module('openTab')
.controller('TransactionsCtrl', function ($scope, $http, $auth, Auth) {
    
    // GET ALL TRANSACTIONS by TAB
    $scope.allTransactions = function() {
        $http.get('/api/tabs/' + $scope.tab._id + '/transactions')
        .then(function (response) {
            console.log(response); //CHECK
            $scope.tab = response.data;
            $scope.transactions = $scope.tab.transactions;
        });
    };
    // invoke on controller load
    $scope.allTransactions();

    // GET SINGLE TRANSACTION
    // $scope.showTransaction = function() {
    //     $http.get('/api/tabs/' + $scope.tab_id + '/transactions/' + $scope.transaction._id)
    //     .then(function (response) {
    //         console.log(response); //CHECK
    //         $scope.transaction = response.data;
    //     });
    // };

    // CREATE TRANSACTION
    $scope.createTransaction = function() {
        $http.post('/api/tabs/' + $scope.tab._id + '/transactions', $scope.transaction)
        .then(function (response) {
            console.log(response); //CHECK
            $scope.transaction = {};
            $scope.tab.transactions.unshift(response.data);
            $scope.allTransactions();
        });
    };

    // DELETE TRANSACTION
    $scope.deleteTransaction = function(transaction) {
        $http.delete('/api/tabs/' + $scope.tab._id + '/transactions/' + transaction._id)
        .then(function (response) {
            var transactionIndex = $scope.tab.transactions.indexOf(transaction);
            $scope.tab.transactions.splice(transactionIndex, 1);
        });
    };
});

// GET ALL TRANSACTIONS
// $scope.allTransactions = function(tab) {
//     Transaction.query({ tab_id: $scope.tab._id }, function (response) {
//         console.log('Successfully retrieved all transactions: ', response); //CHECK
//         $scope.transactions = response;
//     });
// };
// // invoke on controller load
// $scope.allTransactions();

// CREATE TRANSACTION
// $scope.createTransaction = function(tab) {
//     var transaction = new Transaction($scope.transaction);
//     console.log('Successfully created new transaction: ', transaction); //CHECK
//     transaction.$save({ tab_id: $scope.tab._id }, function (data) {
//         $scope.tab.transactions.unshift(data);
//         $scope.transaction = {};
//     });
// };

// DELETE TRANSACTION
// $scope.deleteTransaction = function(transaction) {
//     Transaction.remove({ transaction_id: transaction._id });
//     console.log('Successfully deleted tab: ', transaction._id); //CHECK
//     var transactionIndex = $scope.tab.transactions.indexOf(transaction);
//     $scope.tab.transactions.splice(transactionIndex, 1);
// };

// UPDATE TRANSACTION
// $scope.updateTransaction = function(transaction) {
//     Transaction.get({ transaction_id: transaction._id }, function() {
//         Transaction.update({ transaction_id: transaction._id}, transaction);
//         // tab.editForm = false;
//     }); 
// };