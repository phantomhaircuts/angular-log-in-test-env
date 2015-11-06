var app = angular.module("onboardingApp", [
  'angular-md5',
  'ngStorage',
  'authentication',
  'ui.router',
  'ngAnimate',
  'ngResource',
  'naif.base64'
]);

// UI ROUTER CODE =============================================
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('home/login');

  $stateProvider

  // HOME STATES ========================================
  .state('home', {
    url: '/home',
    templateUrl: 'views/login.html'
  })

  .state('about', {
    url: '/about',
    templateUrl: 'views/about.html'
    // controller: 'loginController'
  })

  .state('data', {
    url: '/data/:id',
    templateUrl: 'views/data.html',
    controller: function($scope, $stateParams) {
      // get the id
      $scope.id = $stateParams.id;
    }
  })
  // NESTED VIEWS AND STATES FOR LOGIN ================================
  // $urlRouterProvider.otherwise('/login')
  .state('home.login', {
    url: '/login',
    templateUrl: 'views/login/loginform.html'
  })
  .state('login.locations', {
    url: '/locations',
    templateUrl: 'views/login/location.html'
  })

  // NESTED VIEWS AND STATES FOR DATA =================================
  // $urlRouterProvider.otherwise('/address')
  .state('data.address', {
    url: '/address',
    templateUrl: 'views/input/address.html'
  })

  .state('data.detail', {
    url: '/detail',
    templateUrl: 'views/input/detail.html'
  })

  .state('data.par', {
    url: '/par',
    templateUrl: 'views/input/par.html'
  })

  .state('data.products', {
    url: '/products',
    templateUrl: 'views/input/products.html'
  })

  .state('data.list', {
    url: '/list',
    templateUrl: 'views/input/list.html'
  })
});
// END Router ========================================================

//LOCATIONS OBJECT
locations = []
payload = []
angular.module('authentication', ['ngStorage'])
.controller("loginController", ['$scope', '$http', 'md5', '$state', function($scope, $http, md5, $localStorage, $sessionStorage, $state, $stateProvider, $urlRouterProvider) {
  // Assign Location to Place Property of LoginCtrl So we can use on page.
  this.places = locations;

  // session variable
  var session = this;

  //Pass local Storage by reference to a hook under scope
  $scope.$storage = $localStorage

  // This code will push the inner html and clear the form
  // ng-submit
  // this.session = {};

  // this.addSession = function(session) {
  //   user.session.push(this.session)
  //   this.session = {}
  // };

  //Submit password and username
  $scope.loginCtrl.submit = function() {
    //declare variables for authentication
    username = $scope.loginCtrl.session.username
    password = $scope.loginCtrl.session.password
    var xdate = new Date();
    var auth = md5.createHash(password + xdate);
    xauthentication = username + ":" + auth;

    //console log the globals needed for authentication
    console.log(xdate + " = xdate");
    console.log(username + " = Username");
    console.log(password + " = Password");
    console.log(xauthentication + "= XAUTHENTICATION");
    // console.log($scope.loginCtrl.session.password);
    //Create the Request
    var req = {
      method: 'POST',
      url: 'http://apiv1-1.dtgvending.com/DTG/users/verifylogin',
      headers: {
        'Content-type': 'text/plain',
        'Accept': 'application/json',
        'XDATE': xdate,
        'XAUTHENTICATION': xauthentication
      }
    };
    //HTTP request
    $http(req)
    .then(function successCallback ( response ) {
      console.log("You are logged in!")
      console.log( "This is response status: "+ response.status );
      console.dir(response);
      //Create Session and Store XAUTHENTICATION
      if (response.status == 200) {
        $scope.loggedIn = true;
        $scope.saveData = function(){
          sessionStorage.setItem('username', username);
          sessionStorage.setItem('password', password);
          console.log('session stored')
          console.log( 'hello ' + sessionStorage.getItem('username'))
          $scope.show=false;
          $scope.loggedIn = sessionStorage.username;
          getLocation()
        }();
      }
    }, function errorCallback(response) {
      console.log("Check your Username or Password")
      console.log( "This is response status: "+ response.status );
      $scope.error = "Please Check your Username or Password";
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    // Create Function for Location List //////////////////////////////////////////////////////////////////
    function getLocation(){
      $scope.locations = [];
      // Create GET Request Headers For Location List
      var getList = {
        method: 'GET',
        url: 'http://apiv1-1.dtgvending.com/DTG/locations',
        // data:'json',
        headers: {
          'Content-type': 'text/html',
          'Accept': 'application/json',
          'XDATE': xdate,
          'XAUTHENTICATION': xauthentication
        }
      };
      // Make GET Request
      $http(getList)
      .then(function successCallback ( response, data ) {
        console.log("List Request has happened")
        console.log( "List Status: "+ response.status );
        console.dir(response);
        //Create Session and Store XAUTHENTICATION
        if (response.status == 200) {
          console.log("it's alive!")
          locData = response.data.locationsSet
          console.log(locData);
          Array.prototype.push.apply(locations, locData);
        };
      });
    };
  } // END SUBMIT =======================================================
}]) // END LOGIN CONTROLLER =============================================

// START DATA CONTROLLER========================================================
.controller("dataController", ['$scope', '$http', 'md5', '$location', '$state', function( $scope, $http, md5, $localStorage, $sessionStorage, ngAnimate, $location, $state, $stateProvider, $urlRouterProvider, $stateParams){
  locId = $scope.id;
  locdate = new Date();
  teltypes = [];
  this.telemeters = teltypes;
  username = sessionStorage.username;
  password = sessionStorage.password;
  var xauthentication = username + ":" + md5.createHash(password + locdate);

  $scope.filesChanged = function(elm){
    $scope.files = elm.files
    $scope.$apply();
  };

  $scope.photosChanged = function(elm){
    $scope.photos = elm.files
    $scope.$apply();
  };

  $scope.picsChanged = function(elm){
    $scope.pics = elm.files
    $scope.$apply();
  };

  // HEADERS FOR INDIVIDUAL LOCATION
  var getLoc = {
    method: 'GET',
    url: 'http://apiv1-1.dtgvending.com/DTG/locations/' + locId,
    // data:'json',
    headers: {
      'Content-type': 'text/html',
      'Accept': 'application/json',
      'XDATE': locdate,
      'XAUTHENTICATION': xauthentication
    }
  };
  // GET ID Location Request
  $http(getLoc)
  .then(function successCallback ( response, data ) {
    console.log( "Individual Location Status: "+ response.status );
    console.dir(response);
    //Create Session and Store XAUTHENTICATION
    if (response.status == 200) {
      placeId = response.data.locations
      this.spot = placeId;
      CurrentSpot = this.spot
      getUser();
    };
  });
  // GET TELEMETER TYPES //////////////////////////////////////////////////////////////////
getTel();
  function getTel(){
    // Create GET Request Headers For Location List
    var getTel = {
      method: 'GET',
      url: 'http://apiv1-1.dtgvending.com/DTG/telemetertypes',
      // data:'json',
      headers: {
        'Content-type': 'text/html',
        'Accept': 'application/json',
        'XDATE': locdate,
        'XAUTHENTICATION': xauthentication
      }
    };
    // Make GET Telemeters
    $http(getTel)
    .then(function successCallback ( response, data ) {
      if (response.status == 200) {
        telResp = response.data.telemeters;
        Array.prototype.push.apply(teltypes, telResp);
      };
    });
  };

  // GET User Information
  function getUser(){

    var getUser = {
      method: 'GET',
      url: 'http://apiv1-1.dtgvending.com/DTG/users/appinit',
      headers: {
        'Content-type': 'text/html',
        'Accept': 'application/json',
        'XDATE': locdate,
        'XAUTHENTICATION': xauthentication
      }
    };
    $http(getUser)
    .then(function successCallback ( response, data ) {
      console.log("UserInfo")
      console.dir(response);
      //Create Session and Store XAUTHENTICATION
      if (response.status == 200) {
        userId = response.data
        this.userInfo = userId;
        $scope.formData = CurrentSpot;
        delete spot.cardreader_serial;
      };
    })
  };

  // we will store all of our form data in this object
  // $scope.formData = {};
  $scope.locations = $scope.locations;

  // function to process the form
  $scope.processForm = function($state, $stateParams) {
    photoVar = $scope.photos
    picVar = $scope.pics
    fileVar = $scope.files
    filePayload = new FormData()
    angular.forEach($scope.files, function(file){
      filePayload.append('file', file)
    })
    // BIND FILES TO SCOPE
    dataDate = new Date();
    pay = "input="
    load = angular.toJson($scope.formData);

    //These are the Variables for Freshdesk Post Description
    locName = spot.location_name;
    locAddress = $scope.formData.location_address;
    locAddressTwo = $scope.formData.location_address2;
    locCity = $scope.formData.location_city;
    locState = $scope.formData.location_state;
    locZip = $scope.formData.location_zip;
    locMake = $scope.formData.location_make;
    locModel = $scope.formData.location_model;
    locFirmware = $scope.formData.firmware;
    locPar = $scope.formData.pars;
    custId = userId.customer;
    telSelection = $scope.formData.location_telemeter;
    telsn = $scope.formData.location_telemeter_serial;

    //PRODUCT IMGUR POST//=================================================
imgFuncOne();

function imgFuncOne(){
  if (typeof fileVar === 'undefined'){
    $scope.submitError = "Please include a clear Photo of product and selection names.";
  }

  else if (typeof fileVar  != 'undefined') {
    photoAuth = 'Client-ID f8dcff0ff1e34f2';
    clientId = 'f8dcff0ff1e34f2';
    var photoReq = {
      method: 'POST',
      url: "https://api.imgur.com/3/image",
      data: fileVar[0],
      // transformRequest: angular.identity,
      headers: {
        'Authorization': 'Client-ID f8dcff0ff1e34f2',
      }
    }
    $http(photoReq)
    .then(function photoCallback ( response, data ) {
      console.log("photo is being submitted" + response)
      photoObj = response.data;
      if (response.status == 200) {
        console.log(response.url)
        freshPhotoOne = photoObj.data.link;
        imgFuncTwo()
      };
    });
  };
};

//Second Optional Product IMGUR POST//=================================================
function imgFuncThree() {
if (typeof picVar === 'undefined'){
  freshPhotoThree = "no photo submitted"
  console.log("no 3 photo submitted");
  freshFunc()
}
else if (typeof picVar  != 'undefined') {
photoAuth = 'Client-ID f8dcff0ff1e34f2';
clientId = 'f8dcff0ff1e34f2';
var photoReq = {
  method: 'POST',
  url: "https://api.imgur.com/3/image",
  data: picVar[0],
  // transformRequest: angular.identity,
  headers: {
    'Authorization': 'Client-ID f8dcff0ff1e34f2',
  }
}
  $http(photoReq)
  .then(function photoCallback ( response, data ) {
    console.log(" third photo is being submitted" + response)
    photoObjThree = response.data;
    if (response.status == 200) {
      freshPhotoThree = photoObjThree.data.link;
      freshFunc();
    };
  });
};
};

    //TELEMETER IMGUR POST//=================================================
function imgFuncTwo() {
    if (typeof photoVar === 'undefined'){
      freshPhotoTwo = "no photo submitted"
      console.log("no 2 photo submitted");
      imgFuncThree();
    }
    else if (typeof photoVar  != 'undefined') {
    photoAuth = 'Client-ID f8dcff0ff1e34f2';
    clientId = 'f8dcff0ff1e34f2';
    var photoReq = {
      method: 'POST',
      url: "https://api.imgur.com/3/image",
      data: photoVar[0],
      // transformRequest: angular.identity,
      headers: {
        'Authorization': 'Client-ID f8dcff0ff1e34f2',
      }
    }
      $http(photoReq)
      .then(function photoCallback ( response, data ) {
        console.log(" Second photo is being submitted" + response)
        photoObjTwo = response.data;
        if (response.status == 200) {
          console.log(response.url)
          freshPhotoTwo = photoObjTwo.data.link;
          imgFuncThree();
        };
      });
    };
};
    //Final PUT Request ============================================
    dataAuth = username + ":" + md5.createHash(password + dataDate + pay + load);
    var dataReq = {
      method: 'PUT',
      url: 'http://apiv1-1.dtgvending.com/DTG/locations/'+ locId,
      data: pay + load,
      headers: {
        'Content-type': undefined,
        'Accept': 'application/json',
        'XDATE': dataDate,
        'XAUTHENTICATION': dataAuth,

      }
    };
    $http(dataReq)
    .then(function successCallback ( response, data ) {
      console.log("The Data is being submitted")
      //Create Session and Store XAUTHENTICATION
      if (response.status == 200) {
        console.log("Submission was Successful!!!!")
        locData = response.data.locationsSet
        Array.prototype.push.apply(locations, locData);
      };
    });

    // FRESH DESK FOR HANDLING PHOTOS AND CREATING TICKETS ===========================================
    function freshFunc(){
      var apiKey = 'Duw1oQU6YazvCtT5cynJ:x';
      Base64={_keyStr:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",encode:function(e){var t="";var n,r,i,s,o,u,a;var f=0;e=Base64._utf8_encode(e);while(f<e.length){n=e.charCodeAt(f++);r=e.charCodeAt(f++);i=e.charCodeAt(f++);s=n>>2;o=(n&3)<<4|r>>4;u=(r&15)<<2|i>>6;a=i&63;if(isNaN(r)){u=a=64}else if(isNaN(i)){a=64}t=t+this._keyStr.charAt(s)+this._keyStr.charAt(o)+this._keyStr.charAt(u)+this._keyStr.charAt(a)}return t},decode:function(e){var t="";var n,r,i;var s,o,u,a;var f=0;e=e.replace(/[^A-Za-z0-9\+\/\=]/g,"");while(f<e.length){s=this._keyStr.indexOf(e.charAt(f++));o=this._keyStr.indexOf(e.charAt(f++));u=this._keyStr.indexOf(e.charAt(f++));a=this._keyStr.indexOf(e.charAt(f++));n=s<<2|o>>4;r=(o&15)<<4|u>>2;i=(u&3)<<6|a;t=t+String.fromCharCode(n);if(u!=64){t=t+String.fromCharCode(r)}if(a!=64){t=t+String.fromCharCode(i)}}t=Base64._utf8_decode(t);return t},_utf8_encode:function(e){e=e.replace(/\r\n/g,"\n");var t="";for(var n=0;n<e.length;n++){var r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r)}else if(r>127&&r<2048){t+=String.fromCharCode(r>>6|192);t+=String.fromCharCode(r&63|128)}else{t+=String.fromCharCode(r>>12|224);t+=String.fromCharCode(r>>6&63|128);t+=String.fromCharCode(r&63|128)}}return t},_utf8_decode:function(e){var t="";var n=0;var r=c1=c2=0;while(n<e.length){r=e.charCodeAt(n);if(r<128){t+=String.fromCharCode(r);n++}else if(r>191&&r<224){c2=e.charCodeAt(n+1);t+=String.fromCharCode((r&31)<<6|c2&63);n+=2}else{c2=e.charCodeAt(n+1);c3=e.charCodeAt(n+2);t+=String.fromCharCode((r&15)<<12|(c2&63)<<6|c3&63);n+=3}}return t}}
      freshKey = Base64.encode(apiKey);
      var freshData = {
        'helpdesk_ticket':{
          'group_id': 5000252983,
          'custom_field': {'customer_id_142177': custId},
          'email': 'example@example.com',
          'subject': 'TICKET TEST',
          'description': "Location #" + locId + " " + locName + " has been updated via the Setup Tool by " + username + " \n \n Address:\n" + locAddress + "\n" + locAddressTwo + "\n" + locCity + ", " + locState + ", " + locZip + "\nMake: " + locMake + "\nModel: " + locModel + "\nTelemeter: " + telSelection + "\nTelemeter Serial Number: " + telsn +"\nFirmware: " + locFirmware + "\n\n Par Values: \n" + locPar + "\n\n Product Photo Link(s): \n" + freshPhotoOne + "\n" + freshPhotoThree + "\n\n Details Photo Link: \n" + freshPhotoTwo,
        },
      };
      freshEnd = 'vagabondvending.freshdesk.com';
      freshReq = {
        method: 'POST',
        url: "https://" + freshEnd + "/helpdesk/tickets.json",
        data: freshData,
        // transformRequest: angular.identity,
        headers: {
          'Accept': '*/*',
          'Content-Type': 'application/json',
          'Authorization': 'Basic ' + freshKey
        }
      }
      $http(freshReq)
      .then(function freshCallback ( response, data ) {
        console.log("freshdesk is being submitted")
        if (response.status == 200) {
          $scope.submitSuccess = "Your Location has been updated!";
          $(".submitError").css('display','none');
          console.log("freshdesk was Successful!")
          console.log(freshKey)
        };
      }, function errorFresh(response) {
        console.log("error")
      }
    );
  };
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


}; //END PROCESS FORM
}]); // END DATA CONTROLLER
