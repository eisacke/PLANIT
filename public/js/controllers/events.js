angular
.module('EventPlan')
.controller('EventsController', EventsController)

EventsController.$inject = ['Event', '$state', '$stateParams','TokenService', '$window']
function EventsController (Event, $state, $stateParams, TokenService, $window) {

  var self = this;
  self.event = {};
  self.newEvent = {};

  // GET CURRENT USER INFO
  if ($window.localStorage['secret-handshake']) {
    self.creator = TokenService.parseJwt();
    console.log(self.creator);
  }

  // INDEX
  self.all = Event.query();

  // FIND EVENT BY PARAMS ID
  if ($stateParams.id) {
    Event.get({ id: $stateParams.id}, function(event){
      self.event = event;
    });
  }

  // SHOW
  self.showEvent = function(event) {
    $state.go('showEvent', { id: event._id });
  }

  // CREATE
  self.createEvent = function() {
    self.newEvent.creator = self.creator._id;
    Event.save(self.newEvent, function(response) {
      self.showEvent(response);
    });
  }

  // DELETE
  self.deleteEvent = function(event){
    Event.delete({id: event._id});
    $state.go('indexEvents');
  }

  // SEND EVENT INVITE
  self.sendInvite = function(){
    var event_id = $stateParams.id;
    Event.invite({id: event_id});
  }

} 