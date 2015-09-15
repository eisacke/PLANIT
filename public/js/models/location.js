angular
  .module('EventPlan')
  .factory('Location', Location);

Location.$inject = ['$resource'];

function Location($resource) {
 var url = 'http://localhost:3000/api'

 var LocationResource = $resource(
  url + '/locations/:id',
  {id: '@_id'},
  { 'get':     { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' }
  });
 return LocationResource;
}