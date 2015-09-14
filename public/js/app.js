angular
  .module('EventPlan', ['ngResource', 'ui.router', 'angular-jwt'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });

  function AuthInterceptor($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  }

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
      .state('newEvent', {
        url: "/events/new",
        templateUrl: "js/views/events/new.html"
      })
      .state('home', {
        url: "/",
        templateUrl: "js/views/homepage.html"
      });

    $urlRouterProvider.otherwise("/");
  }