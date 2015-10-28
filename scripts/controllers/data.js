// .controller("dataController", ['$scope', '$http', 'md5', '$location', function($scope, $http, md5, $localStorage, $sessionStorage, ngAnimate, $location){
//   // this.place = locations.get({id: locations.id})
//
//   // this.loacation = location.get({id: place.id})
//   // we will store all of our form data in this object
//   $scope.formData = {};
//   $scope.locations = $scope.locations;
//   this.places = locations;
//   // function to process the form
//   $scope.processForm = function() {
//     alert('submit!');
//     locId = 1610;
//     dataDate = new Date();
//     pay = "input="
//     load = angular.toJson($scope.formData);
//     dataAuth = username + ":" + md5.createHash(password + dataDate + pay + load);
//     var dataReq = {
//       method: 'PUT',
//       url: 'http://apitestv12.vagabondvending.com/DTG/locations/'+ locId,
//       data: pay + load,
//       headers: {
//         'Content-type': 'application/x-www-form-urlencoded',
//         'Accept': 'application/json',
//         'XDATE': dataDate,
//         'XAUTHENTICATION': dataAuth
//       }
//     };
//     $http(dataReq)
//   };
// }]);
