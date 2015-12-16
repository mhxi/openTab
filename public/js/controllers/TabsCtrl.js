// public/js/controllers/TABSCTRL.JS //

'use strict';

angular.module('openTab')
.controller('TabsCtrl', function ($scope, $auth, Auth, Tab) {

    // GET ALL TABS
    $scope.allTabs = function() {
        Tab.query(function (response) {
            console.log('Successfully retrieved all tabs: ', response); //CHECK
            $scope.tabs = response;
        });
    };
    // invoke on controller load
    $scope.allTabs();

    // CREATE TAB
    $scope.createTab = function() {
        $scope.tab.createdBy = $scope.currentUser;
        var tab = new Tab($scope.tab);
        console.log('Successfully created new tab: ', tab); //CHECK
        tab.$save(function (data) {
            $scope.tabs.unshift(data);
            $scope.tab = {};
        });
    };

    // DELETE TAB
    $scope.deleteTab = function(tab) {
        Tab.remove({ id: tab._id });
        console.log('Successfully deleted tab: ', tab._id); //CHECK
        $scope.tabs.splice(tab, 1);
    };

    // UPDATE TAB
    // $scope.updateTab = function(tab) {
    //     Tab.get({ id: tab.id }, function() {
    //         Tab.update({ id: tab.id}, tab);
    //         // tab.editForm = false;
    //     }); 
    // };
});