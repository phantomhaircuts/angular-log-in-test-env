placeControllers.controller('placeController', ['place', function(Data) {
  this.grumbles = Grumble.query();
}]);

placeControllers.controller('editPlaceController', ["$location","$routeParams",'place', function($location, $routeParams, place){
  this.data = Data.get({id: $routeParams.id})
  this.update = function(){
    this.place.$update({id: this.place.id});
    $location.path("/place/" + this.place.id)
  }
}])
})();
