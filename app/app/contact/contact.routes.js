/**
 * Created by krusheth on 3/13/17.
 * Default route for loading the history manager
 *
 */
(function () {


    angular.module('kayliJeanApp')
        .config(contactRoute);

    contactRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function contactRoute($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root.contact', {
                url: '/contact',
                template: require('./contact.html'),
                resolve: {}
            })
    };

})();