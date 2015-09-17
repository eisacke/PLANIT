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

  if ($stateParams.id) {
    Event.get({ id: $stateParams.id}, function(event){
      self.event = event;
    });
  }

  // CREATE
  self.createEvent = function() {
    self.newEvent.creator = self.creator._id;
    Event.save(self.newEvent, function(event) {
      self.showEvent(event);
    });
  }

  // SHOW
  self.showEvent = function(event) {
    $state.go('showEvent', { id: event._id });
  }
} 