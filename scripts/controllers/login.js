var app = angular.module("login", [
  'angular-md5',
  'authentication'
]);

angular.module('authentication', [])
.controller("loginController", ['$scope', '$http', 'md5', function($scope, $http, md5) {

  // This code toggles the form on clicking the signin button
  this.formIsVisible = false
  this.toggleForm = function(){
    console.log("toggleform")
    if(this.formIsVisible){
      this.formIsVisible = false
    }
    else{
      this.formIsVisible = true
    }
  };

  // ng-submit
  // this.session = {};

  // this.addSession = function(session) {
  //   user.session.push(this.session)
  //   this.session = {}
  // };

  //Submit password and username
  $scope.loginCtrl.submit = function() {

    var username = $scope.loginCtrl.session.username
    var password = $scope.loginCtrl.session.password
    var xdate = new Date();
    var auth = md5.createHash(password+xdate);
    var xauthentication = username + ":" + auth;

    console.log(xdate + " = xdate");
    console.log(username + " = Username");
    console.log(password + " = Password");
    console.log(xauthentication + "= XAUTHENTICATION");

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
    .success(function (response) {
      console.dir(response.headers);
    });


    function callback(error, response, body) {
      console.log("error - ", error);
      console.log("resp - ", response);
      console.log("body - ", body);
      if (!error && response.statusCode == 200) {
        var info = JSON.parse(body);
      }
    };

  };
}]);
