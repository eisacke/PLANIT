angular
  .module('EventPlan')
  .factory('Event', Event);

Event.$inject = ['$resource'];

function Event($resource) {
 var url = 'http://localhost:3000/api'

 var EventResource = $resource(
  url + '/events/:id',
  {id: '@_id'},
  { 'get':     { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' },
  'invite': { 
    url: url + '/invite/send',
    method: 'POST' 
    }
  });
 return EventResource;
}