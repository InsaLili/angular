var mapSetModule = angular.module("MapSetModule", []);
map = {
	studentnum: 3,
	longtitude: undefined,
	laititude: undefined,
	markers:[{
        name:"First marker",
        longtitude: 12.12,
        laititude: 34.34,
        data: "here are data of marker 1"
    },{
        name:"Second marker",
        longtitude: 56.56,
        laititude: 78.78,
        data: "here are data of marker 2"
    }],
	eval:undefined
};
mapSetModule.controller('AppSetCtrl', function($scope, $http, $state, $stateParams) {
    $scope.appstyle = "map";
    $scope.studentnum = map.studentnum;

    $scope.appSet = function(){
        map.studentnum = $scope.studentnum;
    }
});

mapSetModule.controller('MapSetCtrl', function($scope, $http, $state, $stateParams) {
    $scope.markers = map.markers;
    $scope.longtitude = map.longtitude;
    $scope.laititude = map.laititude;
    
    $scope.deleteMarker = function($event,marker){
        var index = $scope.markers.indexOf(marker);
        $scope.markers.splice(index,1);
        console.log("delete");
    }

    $scope.editMarker = function(){

    }

    $scope.addMarker = function(){
        $scope.markers.push($scope.add);
        $scope.add = undefined;
    }
    $scope.setMap = function(){
        map.longtitude = $scope.longtitude;
        map.laititude = $scope.laititude;
        map.eval = $scope.eval;
        map.markers = $scope.markers;
        console.log(map);
    }
});
