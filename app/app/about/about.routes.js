/**
 * Created by krusheth on 3/13/17.
 * Default route for loading the history manager
 *
 */
(function () {


    angular.module('kayliJeanApp')
        .config(aboutRoute);

    aboutRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function aboutRoute($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root.about', {
                url: '/about',
                template: require('./about.html'),
                resolve: {}
            })
    };

})();