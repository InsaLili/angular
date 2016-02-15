var appListModule = angular.module("AppListModule", []);

appListModule.controller('AppListCtrl', function($scope, $http, $state, $stateParams) {
    $scope.setCoord = function(){
        console.log($scope.longtitude);
    }
});