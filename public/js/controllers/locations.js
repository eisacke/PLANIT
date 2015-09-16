angular
  .module('EventPlan')
  .controller('LocationsController', LocationsController)

LocationsController.$inject = ['Location', 'Event', '$state', '$stateParams']
function LocationsController (Location, Event, $state, $stateParams) {

  var self = this;
  self.location = {};
  self.location.event_id = $stateParams.id;
  self.location.location = {};
  self.form = false;
  self.place;

  // SHOW NEW LOCATION FORM
  self.showForm = function(){
    self.form = self.form === false ? true: false;
  }

  // DELETE LOCATION
  self.deleteLocation = function(location){
    Location.delete({id: location._id});
    // var index = self.all.indexOf(location);
    // self.all.splice(index, 1);
  }

  // GOOGLE PLACES STUFF

  //Autocomplete variables
  var input = document.getElementById('location');
  var autocomplete = new google.maps.places.Autocomplete(input);

  //Google Map variables
  var map;
  var marker;

  //Add listener to detect autocomplete selection
  google.maps.event.addListener(autocomplete, 'place_changed', function () {
    self.place = autocomplete.getPlace();
  });

  // ADD LOCATION
  self.addLocation = function(){
    var newlatlong = new google.maps.LatLng(self.place.geometry.location.lat(),self.place.geometry.location.lng());
    map.setCenter(newlatlong);
    marker.setPosition(newlatlong);
    map.setZoom(12);

    self.location.location['name'] = self.place.name;
    self.location.location['address'] = self.place.formatted_address;
    self.location.location['website'] = self.place.website;
    self.location.location['phone'] = self.place.formatted_phone_number;
    self.location.event_id = $stateParams.id;
    Location.save(self.location, function(location){
      self.location.location = {}
      self.form = false;
    });
  }

  self.getLocation = function() {
      if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(self.showPosition);
      } else { 
          console.log("Geolocation is not supported by this browser.");
      }
  }

  self.showPosition = function(position) {
      self.myLatlng = new google.maps.LatLng(position.coords.latitude,position.coords.longitude); 
      self.initialize();
  }

  self.initialize = function() {
    var mapOptions = {
      zoom: 12,
      center: self.myLatlng
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    marker = new google.maps.Marker({
      position: self.myLatlng,
      map: map,
      title: 'Main map'
    });
  }

  input.addEventListener('click', function(){
    input.value = "";
  });

  self.getLocation();
}