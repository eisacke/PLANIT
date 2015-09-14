angular
  .module('EventPlan')
  .factory('User', User);

User.$inject = ['$resource'];

function User($resource) {
 var url = 'http://localhost:3000/api'

 var UserResource = $resource(
  url + '/users/:id',
  {id: '@_id'},
  { 'get':     { method: 'GET' },
  'save':      { method: 'POST' },
  'query':     { method: 'GET', isArray: true},
  'remove':    { method: 'DELETE' },
  'delete':    { method: 'DELETE' },
  'signin': { 
    url: url + '/auth/signin',
    method: 'POST' 
  }, 
  'signup': {
    url: url + '/auth/signup',
    method: 'POST'
    }
  });
 return UserResource;
}