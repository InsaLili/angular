
var mapSetModule = angular.module("MapSetModule", []);

mapSetModule.service('DataService', function(){
    var db = new PouchDB('http://localhost:5984/framework');
    var mapsetting;
    var self = this;
    self.groupnum = 0;
    // ！！！！todo，用nodejs先在server side获取数据库数据
    db.get("mapsetting").then(function(doc) {
        self.mapsetting = doc;
    },self).catch(function(err){
        console.log(err);
    });
});

mapSetModule.controller('AppSetCtrl', function($scope, DataService) {
    console.log(DataService);
});

mapSetModule.controller('MapSetCtrl', function($scope, DataService) {
    var db = new PouchDB('http://localhost:5984/framework');
    
    $scope.longtitude = DataService.mapsetting.longtitude;
    $scope.laititude = DataService.mapsetting.laititude;
    $scope.markers = DataService.mapsetting.markers;
    $scope.steps = DataService.mapsetting.steps;
    $scope.groups = DataService.mapsetting.groups;
  
    $scope.deleteItem = function($event,item,items){
        var index = items.indexOf(item);
        items.splice(index,1);
        console.log("delete");
    }
    $scope.addMarker = function(){
        $scope.markers.push($scope.newMarker);
        $scope.newMarker = undefined;
    }
    $scope.addStep = function(){
        $scope.steps.push({content:""});
    }    
    $scope.addGroup = function(){
        $scope.groups.push({name:"",student:""});
    }
    $scope.setMap = function(){
        // mapsetting.longtitude = $scope.longtitude;
        // mapsetting.laititude = $scope.laititude;
        // mapsetting.eval = $scope.eval;
        // mapsetting.markers = $scope.markers;
        // mapsetting.studentnum = $scope.studentnum;
        // mapsetting.groupamount = $scope.groupamount;
        console.log($scope);

        db.get('mapsetting').then(function(doc) {
          return db.put({
            _id: 'mapsetting',
            _rev: doc._rev,
            eval: $scope.eval,
            laititude: $scope.laititude,
            longtitude: $scope.longtitude,
            markers: $scope.markers,
            steps: $scope.steps,
            groups: $scope.groups,
          });
        }).then(function(response) {
          // handle response
        }).catch(function (err) {
          console.log(err);
        });
    }
});
