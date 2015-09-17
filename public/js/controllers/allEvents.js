angular
.module('EventPlan')
.controller('AllEventsController', AllEventsController)

AllEventsController.$inject = ['Event', 'Location', 'Invitee', '$state', '$stateParams','TokenService', '$window']
function AllEventsController (Event, Location, Invitee, $state, $stateParams, TokenService, $window) {

  // EVENT VARS
  var self = this;
  self.event = {};
  self.newEvent = {};

  // EVENT FUNCTIONS

  // GET CURRENT USER INFO
  if ($window.localStorage['secret-handshake']) {
    self.creator = TokenService.parseJwt();
  }

  // INDEX
  self.all = Event.query();

} 