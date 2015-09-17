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

  // FIND EVENT BY PARAMS ID
  if ($stateParams.id) {
    Event.get({ id: $stateParams.id}, function(event){
      self.event = event;
    });
  }

  // // SHOW
  // self.showEvent = function(event) {
  //   // $state.go('showEvent', { id: event._id });
  // }

  // // CREATE
  // self.createEvent = function() {
  //   self.newEvent.creator = self.creator._id;
  //   Event.save(self.newEvent, function(response) {
  //     self.showEvent(response);
  //   });
  // }

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
  // var input = (document.getElementById('location'));
  var input = $("#location")[0];
  var autocomplete = new google.maps.places.Autocomplete(input);

  //Google Map variables
  var map;
  var marker;
  var infowindow;
  var marker;
  var style = [{"featureType":"water","elementType":"geometry","stylers":[{"color":"#e9e9e9"},{"lightness":17}]},{"featureType":"landscape","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":20}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"},{"lightness":17}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"color":"#ffffff"},{"lightness":29},{"weight":0.2}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":18}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#ffffff"},{"lightness":16}]},{"featureType":"poi","elementType":"geometry","stylers":[{"color":"#f5f5f5"},{"lightness":21}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"color":"#dedede"},{"lightness":21}]},{"elementType":"labels.text.stroke","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"lightness":16}]},{"elementType":"labels.text.fill","stylers":[{"saturation":36},{"color":"#333333"},{"lightness":40}]},{"elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"transit","elementType":"geometry","stylers":[{"color":"#f2f2f2"},{"lightness":19}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#fefefe"},{"lightness":20}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"color":"#fefefe"},{"lightness":17},{"weight":1.2}]}];


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
      self.addPin(location);
      self.place = {};
      input.value = "";
      self.event.locations.push(location);
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
      zoom: 13,
      center: self.myLatlng,
      styles: style
    }
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    
    for (var i = 0; i < self.event.locations.length; i++) {
      self.addPin(self.event.locations[i]);
    }
  }

  self.addPin = function(location, index) {

    var marker = new google.maps.Marker({
      position: {lat: location.lat, lng: location.lng},
      map: map,
      title: location.name,
      icon: "http://i.imgur.com/nitqbJ4.png"
    });
    
    marker.addListener('click', function(){
      self.markerClick(marker, location);
    });  
  }

  self.markerClick = function(marker, location) {
    if(infowindow) infowindow.close();

    infowindow = new google.maps.InfoWindow({
      content: '<div class="infoWindow">'+
      '<h2>' + location.name + '</h2>'+
      '<h4>' + location.time + '</h4>'+
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