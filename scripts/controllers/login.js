var app = angular.module("login", [
  'angular-md5',
  'ngStorage',
  'authentication'
]);

angular.module('authentication', ['ngStorage'])
.controller("loginController", ['$scope', '$http', 'md5', function($scope, $http, md5, $localStorage, $sessionStorage) {
  $scope.$storage = $localStorage
  //Pass local Storage by reference to a hook under scope


  // This code toggles the form on clicking the signin button
  this.formIsVisible = false
  this.toggleForm = function(){
    console.log("toggleform")
    if(this.formIsVisible){
      this.formIsVisible = false;
    }
    else{
      this.formIsVisible = true;
    }
  };

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
        $scope.saveData = function(){
        sessionStorage.setItem(username, password);
        console.log('session stored')
        console.log( 'hello ' + sessionStorage.getItem(username))
        }();
      }

    }, function errorCallback(response) {
      console.log("Check your Username or Password")
      console.log( "This is response status: "+ response.status );
      alert("failed!")
    // called asynchronously if an error occurs
    // or server returns response with an error status.
    });
  };
}]);
