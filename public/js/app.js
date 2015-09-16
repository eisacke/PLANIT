angular
  .module('EventPlan', ['ngResource', 'ui.router', 'angular-jwt'])
  .constant('API', 'http://localhost:3000/api')
  .config(MainRouter)
  .config(AuthInterceptor);

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