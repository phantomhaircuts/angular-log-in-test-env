var app = angular.module("onboardingApp", [
  'angular-md5',
  'ngStorage',
  'authentication',
  'ui.router',
  'ngAnimate',
  'ngResource'
]);

// UI ROUTER CODE =============================================
app.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

  // HOME STATES ========================================
  .state('home', {
    url: '/home',
    templateUrl: 'views/login.html'
  })

  // .state('locationState', {
  //   url: '/locations',
  //   templateUrl: 'views/locations.html'
  //   // controller: 'loginController'
  // })

  .state('data', {
    url: '/data/:id',
    templateUrl: 'views/data.html',
    controller: function($scope, $stateParams) {
            // get the id
            $scope.id = $stateParams.id;
        }
  })

  // NESTED VIEWS AND STATES =================================
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

  //ng-hide var
  $scope.loggedIn = false;

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

    //Create the Request
    var req = {
      method: 'POST',
      url: 'http://apitestv12.vagabondvending.com/DTG/users/verifylogin',
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
          getLocation()
        }();
      }

    }, function errorCallback(response) {
      console.log("Check your Username or Password")
      console.log( "This is response status: "+ response.status );
      alert("Please Check your Username or Password")
      // called asynchronously if an error occurs
      // or server returns response with an error status.
    });

    // Create Function for Location List //////////////////////////////////////////////////////////////////
    function getLocation(){
      $scope.locations = [];
      // Create GET Request Headers For Location List
      var getList = {
        method: 'GET',
        url: 'http://apitestv12.vagabondvending.com/DTG/locations',
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
  }
}])

// START DATE CONTROLLER========================================================
.controller("dataController", ['$scope', '$http', 'md5', '$location', '$state', function($scope, $http, md5, $localStorage, $sessionStorage, ngAnimate, $location, $state, $stateProvider, $urlRouterProvider, $stateParams){
  locId = $scope.id;
  var locdate = new Date();
  var xauthentication = username + ":" + md5.createHash(password + locdate);

  // HEADERS FOR INDIVIDUAL LOCATION
  var getLoc = {
    method: 'GET',
    url: 'http://apitestv12.vagabondvending.com/DTG/locations/' + locId,
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
    };
  });

  // this.place = locations.get({id: locations.id})

  // this.loacation = location.get({id: place.id})
  // we will store all of our form data in this object
  $scope.formData = {};
  $scope.locations = $scope.locations;
  // function to process the form
  $scope.processForm = function($state, $stateParams) {
    dataDate = new Date();
    pay = "input="
    load = angular.toJson($scope.formData);
    dataAuth = username + ":" + md5.createHash(password + dataDate + pay + load);
    var dataReq = {
      method: 'PUT',
      url: 'http://apitestv12.vagabondvending.com/DTG/locations/'+ locId,
      data: pay + load,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json',
        'XDATE': dataDate,
        'XAUTHENTICATION': dataAuth
      }
    };
    $http(dataReq)
    .then(function successCallback ( response, data ) {
      console.log("The Data is being submitted")
      //Create Session and Store XAUTHENTICATION
      if (response.status == 200) {
        console.log("Submission was Successful!!!!")
        locData = response.data.locationsSet
        alert('submit!');
        Array.prototype.push.apply(locations, locData);
      };
    });
  };
}]);
