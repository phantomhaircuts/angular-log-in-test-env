var app = angular.module("login", [
  'angular-md5',
  'authentication'
]);

angular.module('authentication', [])
.controller("loginController", ['$scope', '$http', 'md5', function($scope, $http, md5) {

  this.user = {};

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

  //Submit password and username
  $scope.loginCtrl.submit = function() {

    // md5 Password Hash
    $scope.$watch('loginCtrl.user.password', function() {
      hash = md5.createHash($scope.loginCtrl.user.password || '');
      username = $scope.loginCtrl.user.name
      $scope.loginCtrl.message = hash;
    });

    // authentication object & Post Req.
    $http.post('http://apitestv12.vagabondvending.com/apitest.html', { username: username, password: hash })
               .success(function (response) {
                   callback(response);
                   console.log("success")
               });
    // clear the form

  };

}]);
