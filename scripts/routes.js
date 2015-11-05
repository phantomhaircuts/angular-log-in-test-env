(function(){
  angular.module('onboardingRouter', ['ui.router'])
  .config(function($stateProvider, $urlRouterProvider){

    $stateProvider

    $urlRouterProvider.otherwise('/home')


    .state('home', {
      url: '/home',
      templateUrl: 'views/login.html'
      // controller: 'loginController'
    })
    .state('locationState', {
      url: '/locations',
      templateUrl: 'views/locations.html'
    })
    .state('data', {
      url: '/data',
      templateUrl: 'views/data.html'
    })
  });
})();
