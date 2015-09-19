angular
  .module('EventPlan', ['ngResource', 'ui.router', 'angular-jwt', 'ngMaterial', 'ngAnimate', 'ngAria'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(AuthInterceptor)
  .config(function($mdThemingProvider) {
    // Extend the red theme with a few different colors
    var neonRedMap = $mdThemingProvider.extendPalette('red', {
      '500': 'ff5964'
    });
    // Register the new color palette map with the name <code>neonRed</code>
    $mdThemingProvider.definePalette('neonRed', neonRedMap);
    // Use that theme for the primary intentions
    $mdThemingProvider.theme('default')
      .primaryPalette('neonRed')
  });

  function AuthInterceptor($httpProvider){
    $httpProvider.interceptors.push('authInterceptor');
  }

  // Setup the routing with ui.router
  function MainRouter($stateProvider, $urlRouterProvider){
    $stateProvider
      .state('signup', {
        url: "/signup",
        templateUrl: "js/views/auth/signup.html"
      })
      .state('signin', {
        url: "/signin",
        templateUrl: "js/views/auth/signin.html"
      })
      .state('newEvent', {
        url: "/events/new",
        templateUrl: "js/views/events/new.html"
      })
      .state('indexEvents', {
        url: "/events",
        templateUrl: "js/views/events/index.html"
      })
      .state('showEvent', {
        url: "/events/:id",
        templateUrl: "js/views/events/show.html"
      })
      .state('home', {
        url: "/",
        templateUrl: "js/views/homepage/homepage.html"
      });

    $urlRouterProvider.otherwise("/");
  }