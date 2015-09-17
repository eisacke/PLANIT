angular
.module('EventPlan')
.controller('EventsController', EventsController)

EventsController.$inject = ['Event', 'Location', 'Invitee', '$state', '$stateParams','TokenService', '$window']
function EventsController (Event, Location, Invitee, $state, $stateParams, TokenService, $window) {

  // EVENT VARS
  var self = this;
  self.event = {};
  self.newEvent = {};
  // LOCATION VARS
  self.location = {};
  self.location.event_id = $stateParams.id;
  self.location.location = {};
  self.locationForm = false;
  self.place;
  // INVITEE VARS
  self.invitee = {};
  self.invitee.event_id = $stateParams.id;
  self.invitee.invitee = {};
  self.inviteeForm = false;

  // EVENT FUNCTIONS

  // GET CURRENT USER INFO
  if ($window.localStorage['secret-handshake']) {
    self.creator = TokenService.parseJwt();
  }

  // INDEX
  self.all = Event.query();

  // USER EVENTS ONLY
  // self.all = Event.search({
  //   query: self.creator._id
  // }, function(result){});

  // FIND EVENT BY PARAMS ID
  if ($stateParams.id) {
    Event.get({ id: $stateParams.id}, function(event){
      self.event = event;
    });
  }

  // SHOW
  self.showEvent = function(event) {
    // $state.go('showEvent', { id: event._id });
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

  // INVITEE FUNCTIONS

  // SHOW NEW INVITEE FORM
  self.showInviteeForm = function(){
    self.inviteeForm = self.inviteeForm === false ? true: false;
  }

  // DELETE INVITEE
  self.deleteInvitee = function(invitee){
    Invitee.delete({id: invitee._id});
    var index = self.event.invitees.indexOf(invitee);
    self.event.invitees.splice(index, 1);
  }

  // ADD INVITEE
  self.addInvitee = function(){
    self.invitee.event_id = $stateParams.id;
    Invitee.save(self.invitee, function(invitee){
      self.event.invitees.push(invitee);
      self.invitee.invitee = {}
      self.form = false;
    });
  }

  // LOCATION FUNCTIONS

  // SHOW NEW LOCATION FORM
  self.showLocationForm = function(){
    self.locationForm = self.locationForm === false ? true: false;
  }

  // DELETE LOCATION
  self.deleteLocation = function(location){
    Location.delete({id: location._id});
    var index = self.event.locations.indexOf(location);
    self.event.locations.splice(index, 1);
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
    // marker.setPosition(newlatlong);
    // map.setZoom(12);
    self.location.location['lat'] = self.place.geometry.location.lat();
    self.location.location['lng'] = self.place.geometry.location.lng();
    self.location.location['name'] = self.place.name;
    self.location.location['address'] = self.place.formatted_address;
    self.location.location['website'] = self.place.website;
    self.location.location['phone'] = self.place.formatted_phone_number;
    self.location.event_id = $stateParams.id;
    Location.save(self.location, function(location){
      self.event.locations.push(location);
      self.location.location = {}
      self.form = false;
    });
  }

  var infowindow;
  var marker;

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
    self.addAllPins();
  }

  self.addAllPins = function(){
    for (var i = 0; i < self.event.locations.length; i++) {
      addPin(self.event.locations[i]);
    } 
  }

  function addPin(location, index) {

    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map,
      title: location.name,
      // icon: "http://i.imgur.com/mKPqLrX.png"
    });
    
    // Setting up info window based on json bar (name, image, description, facebook) data
    // Adding Citymapper link with bar lat and lng
    // Adding click listener to open info window when marker is clicked
    marker.addListener('click', function(){
      markerClick(marker, location);
    });  
  }

  function markerClick(marker, location) {
    if(infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content: '<div id="map_window">'+
      '<h2 id="map_title">' + location.name + '</h2>'+
      '</div>'
    });

    map.setCenter(marker.getPosition());
    infowindow.open(map, marker);
  };

  input.addEventListener('click', function(){
    input.value = "";
  });

  self.getLocation();

} 