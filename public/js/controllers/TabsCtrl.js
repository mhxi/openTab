// public/js/controllers/TABSCTRL.JS //

'use strict';

angular.module('openTab')
.controller('TabsCtrl', function ($scope, $auth, Auth, Tab) {
    
    // GET ALL TABS createdBy currentUser
    $scope.tabs = Tab.query();
    // GET ALL TABS openFor currentUser
    $scope.openTabs = Tab.openTabs();

    // CREATE TAB
    $scope.createTab = function() {
        $scope.tab.createdBy = $scope.currentUser;
        var tab = new Tab($scope.tab);
        console.log('Successfully created new tab: ', tab); //CHECK
        tab.$save(function (data){
            $scope.tabs.push(data);
            $scope.tab = {};
            tab.$get({ tab_id: data._id });
        });
    };

    // DELETE TAB
    $scope.deleteTab = function(tab) {
        Tab.remove({ tab_id: tab._id });
        console.log('Successfully deleted tab: ', tab._id); //CHECK
        var tabIndex = $scope.tabs.indexOf(tab);
        $scope.tabs.splice(tabIndex, 1);
    };
});

    // GET ALL TABS
    // $scope.allTabs = function() {
    //     Tab.query(function (response) {
    //         console.log('Successfully retrieved all tabs: ', response); //CHECK
    //         $scope.tabs = response;
    //     });
    // };
    // // invoke on controller load
    // $scope.allTabs();

    // UPDATE TAB
    // $scope.updateTab = function(tab) {
    //     Tab.get({ tab_id: tab.id }, function() {
    //         Tab.update({ tab_id: tab._id}, tab);
    //         // tab.editForm = false;
    //     }); 
    // };