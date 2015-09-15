angular
  .module('EventPlan')
  .controller('UsersController', UsersController);

UsersController.$inject = ['User', 'TokenService'];
function UsersController(User, TokenService){
  var self = this;

  self.all = [];
  self.users = {};

  // Function to display the message back to the User
  function showMessage(res) {
    var token = res.token ? res.token : null;
    
    // Console.log our response from the API
    if(token) { console.log(res); }
    self.message =  res.message ? res.message : null;
  }

  self.authorize = function() {
    User.signin(self.user, showMessage);
  }

  self.join = function() {
    User.signup(self.user, showMessage);
  }

  self.logout = function() {
    TokenService.removeToken && TokenService.removeToken();
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