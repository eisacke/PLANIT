angular
  .module('EventPlan')
  .factory('Invitee', Invitee);

Invitee.$inject = ['$resource'];

function Invitee($resource) {
 var url = 'http://localhost:3000/api'

 var InviteeResource = $resource(
  url + '/invitees/:id',
  {id: '@_id'},
  { 'get':     { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' }
  });
 return InviteeResource;
}