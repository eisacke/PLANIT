angular
  .module('EventPlan')
  .controller('LocationsController', LocationsController)

LocationsController.$inject = ['Location', 'Event', '$state', '$stateParams']
function LocationsController (Location, Event, $state, $stateParams) {

  var self = this;
  self.location = {};
  self.location.event_id = $stateParams.id;
  self.form = false;

  // ADD LOCATION
  self.addLocation = function(){
    self.location.event_id = $stateParams.id;
    Location.save(self.location, function(location){
      self.location.location = {}
      self.form = false;
    });
  };

  // SHOW NEW LOCATION FORM
  self.showForm = function(){
    self.form = true;
  };

  // DELETE LOCATION
  self.deleteLocation = function(location){
    Location.delete({id: location._id});
    // var index = self.all.indexOf(location);
    // self.all.splice(index, 1);
  };

}