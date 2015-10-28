// angular.module('onboardingApp.services',[])
//   .factory('placeServices', ['$http', function ($http)
//   return {
//     getPlaces: function () {
//
//     },
//     plotPlaces: function(d) {
//
//     }
//   }
// ])


// FIRST SERVICE
// (function() {
//   console.log("factory work")
//   var placeServices = angular.module('placeServices', ['ngResource']);
//   placeServices.factory('Place', ['$resource', function($resource) {
//     return $resource('http://apitestv12.vagabondvending.com/DTG/locations/:id', {}, {
//       get: {
//         method: 'GET',
//         headers: {
//           'Content-type': 'text/html',
//           'Accept': 'application/json',
//           'XDATE': xdate,
//           'XAUTHENTICATION': xauthentication
//         }
//       }
//         // update: {method:'PUT'}
//     });
//   }]);
// })();
