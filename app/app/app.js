/**
*  Module
*  history.manager
* Description - Main module for history manager 
*/

(function () {

  angular.module('kayliJeanApp', ['ui.router', 'ngMaterial', 'ngAnimate'])

  .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	}])

})();
