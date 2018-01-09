/**
*  Module
*  history.manager
* Description - Main module for history manager 
*/

(function () {

  angular.module('kayliJeanApp', ['ui.router', 'ngMaterial', 'ngAnimate', 'thatisuday.ng-image-gallery', 'ngMessages'])

  .config(['$urlRouterProvider', '$locationProvider', function ($urlRouterProvider, $locationProvider) {
		$urlRouterProvider.otherwise('/');
		$locationProvider.html5Mode(true);
	}])

})();
