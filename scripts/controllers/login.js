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

    // md5 Password Hash
    $scope.$watch('loginCtrl.session.password', function() {
      hash = md5.createHash($scope.loginCtrl.session.password || '');
      username = $scope.loginCtrl.session.username
      password = $scope.loginCtrl.session.password
      $scope.loginCtrl.hash = hash;
      xdate = $scope.date = new Date();
      auth = md5.createHash(password+date);
      xauthentication = username + ":" + auth;

      console.log(xdate+" = xdate");
      console.log(hash+" = Hash");
      console.log(username+" = Username");
      console.log(password+" = Password");
      console.log(xauthentication + "= XAUTHENTICATION");

      this.session = {};
    });

    // authentication object & Post Req.
    // $http.post('http://apitestv12.vagabondvending.com/apitest.html', { username: username, password: hash })
    //   .success(function (response) {
    //     callback(response);
    //     console.log("success")
    //   });
    };
}]);
