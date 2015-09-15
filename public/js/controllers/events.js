angular
  .module('EventPlan')
  .controller('EventsController', EventsController)

EventsController.$inject = ['Event', '$state', '$stateParams']
function EventsController (Event, $state, $stateParams) {

  var self = this;
  self.event = {};
  self.newEvent = {};

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
    Event.save(self.newEvent, function(response) {
      self.showEvent(response);
    });
  }

  // DELETE
  self.deleteEvent = function(event){
    Event.delete({id: event._id});
    var index = self.all.indexOf(event);
    self.all.splice(index, 1);
    $state.go('indexEvents');
  }

}