/**
 * Created by krusheth on 3/13/17.
 * Default route for loading the history manager
 *
 */
(function () {


    angular.module('kayliJeanApp')
        .config(homeRoute);

    homeRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function homeRoute($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.when('/', '/home');

        $stateProvider
            .state('root.home', {
                url: '/home',
                template: require('./home.html'),
                resolve: {}
            })
    };

})();