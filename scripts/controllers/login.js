var app = angular.module("login", [
  'angular-md5',
  'authentication'
]);

angular.module('authentication', [])
.controller("loginController", ['$scope', 'md5', function($scope, md5) {

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
  $scope.submit = function() {

    // md5 Password Hash
    $scope.$watch('user.password', function() {
      var hash = md5.createHash($scope.user.password || '');
      $scope.message = hash;
    });
    // clear the form
  };

}]);
