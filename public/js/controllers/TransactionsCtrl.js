// public/js/controllers/TRANSACTIONSCTRL.JS //

'use strict';

angular.module('openTab')
.controller('TransactionsCtrl', function ($scope, $auth, Auth, Transaction) {
    
    // GET ALL TRANSACTIONS
    $scope.allTransactions = function(tab) {
        Transaction.query({ tab_id: $scope.tab._id }, function (response) {
            console.log('Successfully retrieved all transactions: ', response); //CHECK
            $scope.transactions = response;
        });
    };
    // invoke on controller load
    $scope.allTransactions();

    // CREATE TRANSACTION
    $scope.createTransaction = function(tab) {
        var transaction = new Transaction($scope.transaction);
        console.log('Successfully created new transaction: ', transaction); //CHECK
        transaction.$save({ tab_id: $scope.tab._id }, function (data) {
            $scope.tab.transactions.unshift(data);
            $scope.transaction = {};
        });
    };

    // DELETE TRANSACTION
    $scope.deleteTransaction = function(transaction) {
        Transaction.remove({ transaction_id: transaction._id });
        console.log('Successfully deleted tab: ', transaction._id); //CHECK
        $scope.tabs.splice(transaction, 1);
    };
});

    // UPDATE TRANSACTION
    // $scope.updateTransaction = function(transaction) {
    //     Transaction.get({ transaction_id: transaction._id }, function() {
    //         Transaction.update({ transaction_id: transaction._id}, transaction);
    //         // tab.editForm = false;
    //     }); 
    // };