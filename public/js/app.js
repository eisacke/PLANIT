angular
  .module('EventPlan', ['ngResource', 'ui.router', 'angular-jwt'])
  .config(MainRouter);

  angular
  .module('EventPlan')
  .run(function($http, $window){
    var token = $window.localStorage.getItem('token');
    $http.defaults.headers.common["Authorization"] = "Bearer " + token;
  })

  // Setup the routing with ui.router
  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('signup', {
        url: "/signup",
        templateUrl: "js/views/signup.html"
      })
      .state('signin', {
        url: "/signin",
        templateUrl: "js/views/signin.html"
      })
      .state('home', {
        url: "/",
        templateUrl: "js/views/homepage.html"
      });

    $urlRouterProvider.otherwise("/");
  }