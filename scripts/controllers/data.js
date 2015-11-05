// var data = angular.module("onboardingApp", [
//   'angular-md5',
//   'ngStorage',
//   'authentication',
//   'ui.router',
//   'ngAnimate',
//   'ngResource',
//   'naif.base64'
// ]);
//
// // START DATA CONTROLLER========================================================
// app.controller("dataController", ['$scope', '$http', 'md5', '$location', '$state', function( $scope, $http, md5, $localStorage, $sessionStorage, ngAnimate, $location, $state, $stateProvider, $urlRouterProvider, $stateParams){
//   locId = $scope.id;
//   locdate = new Date();
//   username = sessionStorage.username;
//   password = sessionStorage.password;
//   var xauthentication = username + ":" + md5.createHash(password + locdate);
//   $scope.filesChanged = function(elm){
//     $scope.files = elm.files
//     $scope.$apply();
//   };
//
//   $scope.photosChanged = function(elm){
//     $scope.photos = elm.files
//     $scope.$apply();
//   };
//
//   // HEADERS FOR INDIVIDUAL LOCATION
//   var getLoc = {
//     method: 'GET',
//     url: 'http://apitestv12.vagabondvending.com/DTG/locations/' + locId,
//     // data:'json',
//     headers: {
//       'Content-type': 'text/html',
//       'Accept': 'application/json',
//       'XDATE': locdate,
//       'XAUTHENTICATION': xauthentication
//     }
//   };
//   // GET ID Location Request
//   $http(getLoc)
//   .then(function successCallback ( response, data ) {
//     console.log( "Individual Location Status: "+ response.status );
//     console.dir(response);
//     //Create Session and Store XAUTHENTICATION
//     if (response.status == 200) {
//       placeId = response.data.locations
//       this.spot = placeId;
//       CurrentSpot = this.spot
//       getUser();
//     };
//   });
//
//   // GET User Information
//   function getUser(){
//
//     var getUser = {
//       method: 'GET',
//       url: 'http://apiv1-1.dtgvending.com/DTG/users/appinit',
//       headers: {
//         'Content-type': 'text/html',
//         'Accept': 'application/json',
//         'XDATE': locdate,
//         'XAUTHENTICATION': xauthentication
//       }
//     };
//     $http(getUser)
//     .then(function successCallback ( response, data ) {
//       console.log("UserInfo")
//       console.dir(response);
//       //Create Session and Store XAUTHENTICATION
//       if (response.status == 200) {
//         userId = response.data
//         this.userInfo = userId;
//         $scope.formData = CurrentSpot;
//         delete spot.cardreader_serial;
//       };
//     })
//   };
//   // we will store all of our form data in this object
//   // $scope.formData = {};
//   $scope.locations = $scope.locations;
//
//   // function to process the form
//   $scope.processForm = function($state, $stateParams) {
//     photoVar = $scope.photos
//     fileVar = $scope.files
//     filePayload = new FormData()
//     angular.forEach($scope.files, function(file){
//       filePayload.append('file', file)
//     })
//     // BIND FILES TO SCOPE
//     dataDate = new Date();
//     pay = "input="
//     load = angular.toJson($scope.formData);
//
//     //These are the Variables for Freshdesk Post Description
//     locName = spot.location_name;
//     locAddress = $scope.formData.location_address;
//     locAddressTwo = $scope.formData.location_address2;
//     locCity = $scope.formData.location_city;
//     locState = $scope.formData.location_state;
//     locZip = $scope.formData.location_zip;
//     locMake = $scope.formData.location_make;
//     locModel = $scope.formData.location_model;
//     locFirmware = $scope.formData.firmware;
//     locPar = $scope.formData.pars;
//     custId = userId.customer;
//
//     //IMGUR POST//=================================================
//     photoAuth = 'Client-ID f8dcff0ff1e34f2';
//     clientId = 'f8dcff0ff1e34f2';
//     var photoReq = {
//       method: 'POST',
//       url: "https://api.imgur.com/3/image",
//       data: fileVar[0],
//       // transformRequest: angular.identity,
//       headers: {
//         'Authorization': 'Client-ID f8dcff0ff1e34f2',
//       }
//     }
//     $http(photoReq)
//     .then(function photoCallback ( response, data ) {
//       console.log("photo is being submitted" + response)
//       photoObj = response.data;
//       if (response.status == 200) {
//         console.log(response.url)
//         console.log(photoObj.data.link);
//         imgFuncTwo()
//       };
//     });
//
//     // //SECOND IMGUR POST//=================================================
//     photoAuth = 'Client-ID f8dcff0ff1e34f2';
//     clientId = 'f8dcff0ff1e34f2';
//     var photoReq = {
//       method: 'POST',
//       url: "https://api.imgur.com/3/image",
//       data: photoVar[0],
//       // transformRequest: angular.identity,
//       headers: {
//         'Authorization': 'Client-ID f8dcff0ff1e34f2',
//       }
//     }
//     function imgFuncTwo() {
//       $http(photoReq)
//       .then(function photoCallback ( response, data ) {
//         console.log(" Second photo is being submitted" + response)
//         photoObjTwo = response.data;
//         if (response.status == 200) {
//           console.log(response.url)
//           console.log(photoObjTwo.data.link);
//           freshFunc();
//         };
//       });
//     };
//
//     //Final PUT Request ============================================
//     dataAuth = username + ":" + md5.createHash(password + dataDate + pay + load);
//     var dataReq = {
//       method: 'PUT',
//       url: 'http://apitestv12.vagabondvending.com/DTG/locations/'+ locId,
//       data: pay + load,
//       headers: {
//         'Content-type': undefined,
//         'Accept': 'application/json',
//         'XDATE': dataDate,
//         'XAUTHENTICATION': dataAuth,
//
//       }
//     };
//     $http(dataReq)
//     .then(function successCallback ( response, data ) {
//       console.log("The Data is being submitted")
//       //Create Session and Store XAUTHENTICATION
//       if (response.status == 200) {
//         console.log("Submission was Successful!!!!")
//         locData = response.data.locationsSet
//         Array.prototype.push.apply(locations, locData);
//       };
//     });
//
//     // FRESH DESK FOR HANDLING PHOTOS AND CREATING TICKETS ===========================================
//     function freshFunc(){
//       var apiKey = 'Duw1oQU6YazvCtT5cynJ:x';
//       Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
//       freshKey = Base64.encode(apiKey);
//       var freshData = {
//         'helpdesk_ticket':{
//           'group_id': 5000252983,
//           'custom_field': {'customer_id_142177': custId},
//           'email': 'example@example.com',
//           'subject': 'TICKET TEST',
//           'description': "Location #" + locId + " " + locName + " has been updated via the Setup Tool by " + username + " \n \n Address:\n" + locAddress + "\n" + locAddressTwo + "\n" + locCity + ", " + locState + ", " + locZip + "\nMake: " + locMake + "\nModel: " + locModel + "\nFirmware: " + locFirmware + "\n\n Par Values: \n" + locPar + "\n\n Product Photo Link: " + photoObj.data.link + "\n Details Photo Link: " + photoObjTwo.data.link,
//         },
//       };
//       freshEnd = 'vagabondvending.freshdesk.com';
//       freshReq = {
//         method: 'POST',
//         url: "https://" + freshEnd + "/helpdesk/tickets.json",
//         data: freshData,
//         // transformRequest: angular.identity,
//         headers: {
//           'Accept': '*/*',
//           'Content-Type': 'application/json',
//           'Authorization': 'Basic ' + freshKey
//         }
//       }
//       $http(freshReq)
//       .then(function freshCallback ( response, data ) {
//         console.log("freshdesk is being submitted")
//         if (response.status == 200) {
//           $scope.submitSuccess = "Your Location has been updated!";
//           console.log("freshdesk was Successful!")
//           console.log(freshKey)
//         };
//       }, function errorFresh(response) {
//         console.log("error")
//       }
//     );
//   };
  //=================================================
  //DB POST
  // photoAuth = 'Client-ID f8dcff0ff1e34f2';
  // clientId = 'f8dcff0ff1e34f2';
  // var photoReq = {
  //   method: 'POST',
  //   url: "https://content.dropboxapi.com/2-beta-2/files/upload",
  //   data: filePayload,
  //   // transformRequest: angular.identity,
  //   headers: {
  //      'Authorization': 'Bearer zuEjcWgrypQAAAAAAAABPSEvc0s2kb9sJdsvhNW3EuaSwQS-RHfTax24MyW6Xkp2',
  //      'Content-Type': 'application/octet-stream',
  //      'Dropbox-API-Arg': {"path":"/ErikAnderson/WebImages"},
  //      'User-Agent': 'api-explorer-client'
  //
  //   }
  // }
  // $http(photoReq)
  // .then(function photoCallback ( response, data ) {
  //   console.log("photo is being submitted")
  //   if (response.status == 200) {
  //     console.log(response)
  //   };
  // });
  // //=================================================
  // var photoReq = {
  //   method: 'POST',
  //   url: "https://" + freshEnd + "/helpdesk/tickets.json",
  //   data: filePayload,
  //   // transformRequest: angular.identity,
  //   headers: {
  //     transformRequest:angular.identity,
  //     'Content-Type': undefined,
  //   }
  // }
  // $http(photoReq)
  // .then(function photoCallback ( response, data ) {
  //   console.log("photo is being submitted")
  //   if (response.status == 200) {
  //     console.log(response)
  //   };
  // });


// }; //END PROCESS FORM
// }]); // END DATA CONTROLLER
