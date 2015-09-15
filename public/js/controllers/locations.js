angular
  .module('EventPlan')
  .controller('LocationsController', LocationsController)

LocationsController.$inject = ['Location', 'Event', '$state', '$stateParams']
function LocationsController (Location, Event, $state, $stateParams) {

  var self = this;

  self.location = {};
  console.log($stateParams)
  self.location.event_id = $stateParams.id;

  // ADD LOCATION
  self.addLocation = function(){
    alert("arrived!");
    self.location.event_id = $stateParams.id;
    console.log(self.location);
    Location.save(self.location, function(location){
      console.log(location)
      self.location.location = {}
    });
  }

  // SHOW
  // self.showEvent = function(event) {
  //   $state.go('showEvent', { id: event._id });
  // }

  // CREATE
  // self.createEvent = function() {
  //   Event.save(self.newEvent, function(response) {
  //     self.showEvent(response);
  //   });
  // }

  // DELETE
  // self.deleteEvent = function(event){
  //   Event.delete({id: event._id});
  //   var index = self.all.indexOf(event);
  //   self.all.splice(index, 1);
  //   $state.go('indexEvents');
  // };

}