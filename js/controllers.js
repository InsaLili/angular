
var mapSetModule = angular.module("MapSetModule", ["leaflet-directive"]);

mapSetModule.service('DataService', function(){
    var db = new PouchDB('http://localhost:5984/framework');
    var self = this;
    self.groupnum = 0;
    // ！！！！todo，用nodejs先在server side获取数据库数据
    db.get("mapstep1").then(function(doc) {
        self.mapstep1 = doc;
    },self).catch(function(err){
        console.log(err);
    });
    db.get("mapstep2").then(function(doc) {
        self.mapstep2 = doc;
    },self).catch(function(err){
        console.log(err);
    });
    db.get("mapstep3").then(function(doc) {
        self.mapstep3 = doc;
    },self).catch(function(err){
        console.log(err);
    });
    db.get("mapstep4").then(function(doc) {
        self.mapstep4 = doc;
    },self).catch(function(err){
        console.log(err);
    });
});

mapSetModule.controller('AppSetCtrl', function($scope, DataService) {
    console.log(DataService);
});

mapSetModule.controller('CtrlStep1', [ "$scope", "DataService",function($scope, DataService) {
    $scope.map = DataService.mapstep1.map;
    $scope.markers = DataService.mapstep1.markers;
    $scope.infos = DataService.mapstep1.infos;
    $scope.cris = DataService.mapstep1.cris;

    angular.extend($scope,{
        tiles: {
            name: 'Map',
            url: 'http://api.tiles.mapbox.com/v4/{mapid}/{z}/{x}/{y}.png?access_token={apikey}',
            type: 'xyz',
            options: {
                apikey: 'pk.eyJ1IjoiaW5zYWxpbGkiLCJhIjoickF1VzlYVSJ9.JH9ZrV76fbU5Ub9ZgBhNCw',
                mapid: 'insalili.meikk0a8'
            }
        },
        events: {
            markers:{
                enable:['dragend']
            }
        }
    });

    // UPDATE coordinates
    $scope.$on("leafletDirectiveMarker.dragend", function(event, args){
        console.log('hola');
        var index = parseInt(args.modelName);

        $scope.markers[index].lat = args.model.lat;
        $scope.markers[index].lng = args.model.lng;
    });

    $scope.deleteItem = function($event,item,items){
        var index = items.indexOf(item);
        items.splice(index,1);
        console.log("delete");
    }
    $scope.addMarker = function(){
        $scope.markers.push($scope.newMarker);
        $scope.newMarker = {};
    }
    $scope.addCri = function(){
        $scope.cris.push($scope.newCri);
        $scope.newCri = {};
    }    
    $scope.addInfo = function(){
        $scope.infos.push($scope.newInfo);
        $scope.newInfo = {};
    }

    // store marker picture to database
    $scope.handleMarkerFiles = function(element){
        var file = element.files[0];
        var index = angular.element(element).scope().$index;
        // if no file is chosen, set photo value to undefined
        if(file == undefined){
            $scope.markers[index].photo = undefined;
            return;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.markers[index].photo = e.target.result;
            };
        })(file);
        reader.readAsDataURL(file);
    }
    // store info picture to database
    $scope.handleInfoFiles = function(element){
        var file = element.files[0];
        var index = angular.element(element).scope().$index;
        // if no file is chosen, set photo value to undefined
        if(file == undefined){
            $scope.infos[index].photo = undefined;
            return;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.infos[index].photo = e.target.result;
            };
        })(file);
        reader.readAsDataURL(file);
    }

    $scope.toStep2 = function(){
        DataService.mapstep1.map = $scope.map;
        DataService.mapstep1.markers = $scope.markers;
        DataService.mapstep1.infos = $scope.infos;

        // var db = new PouchDB('http://localhost:5984/framework');
        // db.get('mapstep1').then(function(doc) {
        //   return db.put({
        //     _id: 'mapstep1',
        //     _rev: doc._rev,
        //     infos: $scope.infos,
        //     map: $scope.map,
        //     markers: $scope.markers
        //   });
        // }).then(function(response) {
        //   // handle response
        // }).catch(function (err) {
        //   console.log(err);
        // });
    }
}]);

mapSetModule.controller('CtrlStep2', [ "$scope", "DataService",function($scope, DataService) {
    $scope.seqtype = DataService.mapstep2.seqtype;
    $scope.reseq = DataService.mapstep2.reseq;
    $scope.unseq = DataService.mapstep2.unseq;

    $scope.changeStep = function(){
        DataService.mapstep2.seqtype = $scope.seqtype;
        DataService.mapstep2.reseq = $scope.reseq;
        DataService.mapstep2.unseq = $scope.unseq;

        // var db = new PouchDB('http://localhost:5984/framework');
        // db.get('mapstep2').then(function(doc) {
        //   return db.put({
        //     _id: 'mapstep2',
        //     _rev: doc._rev,
        //     seqtype: $scope.seqtype,
        //     reseq: $scope.reseq,
        //     unseq: $scope.unseq
        //   });
        // }).then(function(response) {
        //   // handle response
        // }).catch(function (err) {
        //   console.log(err);
        // });
    }
}]);
mapSetModule.controller('CtrlStep3', [ "$scope", "DataService",function($scope, DataService) {
    $scope.share = DataService.mapstep3.share;
    $scope.person = DataService.mapstep3.person;
    $scope.cris = DataService.mapstep3.cris;


    $scope.addCri = function(cris){
        cris.push({
            name: "New criteria"
        });
    }
    $scope.changeStep = function(){
        DataService.mapstep3.share = $scope.share;
        DataService.mapstep3.person = $scope.person;
        DataService.mapstep3.cris = $scope.cris;
    }
}]);

mapSetModule.controller('MapSetCtrl', function($scope, DataService) {
    var db = new PouchDB('http://localhost:5984/framework');
    
    $scope.longtitude = DataService.mapsetting.longtitude;
    $scope.laititude = DataService.mapsetting.laititude;
    $scope.markers = DataService.mapsetting.markers;
    $scope.steps = DataService.mapsetting.steps;
    $scope.groups = DataService.mapsetting.groups;
    $scope.add = DataService.mapsetting.additional;

    $scope.deleteItem = function($event,item,items){
        var index = items.indexOf(item);
        items.splice(index,1);
        console.log("delete");
    }
    $scope.addItem = function(items){
        items.push({});
    }
    // store marker picture to database
    $scope.handleFiles = function(element){
        var file = element.files[0];
        var index = angular.element(element).scope().$index;
        // if no file is chosen, set photo value to undefined
        if(file == undefined){
            $scope.markers[index].photo = undefined;
            return;
        }
        var reader = new FileReader();
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
            return function(e) {
                $scope.markers[index].photo = e.target.result;
            };
        })(file);
        reader.readAsDataURL(file);
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
            laititude: $scope.laititude,
            longtitude: $scope.longtitude,
            markers: $scope.markers,
            steps: $scope.steps,
            groups: $scope.groups,
            additional: $scope.add
          });
        }).then(function(response) {
          // handle response
        }).catch(function (err) {
          console.log(err);
        });
    }
});
