angular
  .module('EventPlan')
  .controller('EventsController', EventsController)

EventsController.$inject = ['Event', '$state', '$stateParams']
function EventsController (Event, $state, $stateParams) {

  console.log($stateParams)

  var self = this;
  self.event;
  self.newEvent = {};

  // if ($stateParams.id) {
  //   Hunt.get({ id: $stateParams.id}, function(hunt){
  //     self.hunt = hunt;
  //   })
  // }

  // INDEX
  self.all = Event.query();

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
  self.deleteEvent = function(event) {
    Event.delete(event._id, function(response) {
      console.log(response)
    });
  }

}