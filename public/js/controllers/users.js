angular
  .module('EventPlan')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService', '$state'];
function UsersController(User, TokenService, $state){
  var self = this;
  self.user = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.authorize = function() {
    User.signin(self.user, showMessage);
    $state.go('newEvent');
    self.user = {}
  }

  self.join = function() {
    User.signup(self.user, showMessage);
    $state.go('newEvent');
    self.user = {}
  }

  self.logout = function() {
    TokenService.removeToken && TokenService.removeToken();
    self.user = {}
    $state.go('home');
  }

  self.isLoggedIn = function() {
    return TokenService.isLoggedIn ? TokenService.isLoggedIn() : false;
  }

  self.getUsers = function() {
    self.all = User.query();
  }

  if (self.isLoggedIn()) {
    self.user = TokenService.parseJwt();
  }

  return self;
}