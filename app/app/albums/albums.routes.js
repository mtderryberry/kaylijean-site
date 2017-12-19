/**
 * Created by krusheth on 3/13/17.
 * Default route for loading the history manager
 *
 */
(function () {


    angular.module('kayliJeanApp')
        .config(albumsRoute);

    albumsRoute.$inject = ['$stateProvider', '$urlRouterProvider'];

    function albumsRoute($stateProvider, $urlRouterProvider) {

        $stateProvider
            .state('root.albums', {
                url: '/albums/:album',
                template: require('./albums.html'),
                resolve: {
                    currentAlbum: ['$stateParams', 'albumSvc', function ($stateParams, albumSvc) {
                        albumSvc.getAlbumObj().currentAlbum = $stateParams.album;
                    }],
                }
            })
    };

})();