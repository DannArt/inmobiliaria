
var controllerRoute = angular.module('controllerRoute ', [
  'ngRoute','controllers'
]);

controllerRoute.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'template/home.html',
        controller  : 'index_controller'
      }).
      when('/item/:idCasa', {
        templateUrl: 'template/single.html',
        controller  : 'single_controller'
      }).
      when('/filtros/:idMunicipio', {
        templateUrl: 'template/filter.html',
        controller  : 'filter_controller'
      }).
      when('/cercano', {
        templateUrl: 'template/filter.html',
        controller  : 'mapa_controller'
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);




