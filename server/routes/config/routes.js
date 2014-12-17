'use strict';

module.exports = [
  {method: 'get',    path: '/{param*}',      config: require('../definitions/static/angular')},
  {method: 'post',   path: '/register',      config: require('../definitions/users/register')},
  {method: 'post',   path: '/login',         config: require('../definitions/users/login')},
  {method: 'get',    path: '/status',        config: require('../definitions/users/status')}
];