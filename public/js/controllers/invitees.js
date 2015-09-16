angular
.module('EventPlan')
.controller('InviteesController', InviteesController)

InviteesController.$inject = ['Invitee', 'Event', '$state', '$stateParams']
function InviteesController (Invitee, Event, $state, $stateParams) {

  var self = this;
  self.invitee = {};
  self.invitee.event_id = $stateParams.id;
  self.invitee.invitee = {};
  self.form = false;

  // SHOW NEW INVITEE FORM
  self.showForm = function(){
    self.form = true;
  }

  // DELETE INVITEE
  self.deleteInvitee = function(invitee){
    Invitee.delete({id: invitee._id});
    // var index = self.all.indexOf(invitee);
    // self.all.splice(index, 1);
  }

  // ADD INVITEE
  self.addInvitee = function(){
    self.invitee.event_id = $stateParams.id;
    Invitee.save(self.invitee, function(invitee){
      self.invitee.invitee = {}
      self.form = false;
    });
  }
}