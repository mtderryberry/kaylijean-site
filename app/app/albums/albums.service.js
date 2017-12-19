/**
 * Created by krusheth on 5/16/17.
 * Utility functions that can be used to perform common operations for NP & CH
 */
(function () {
    angular.module('kayliJeanApp')
        .factory('albumSvc', albumSvc);

    albumSvc.$inject = [];

    function albumSvc() {

        let albumObj = {
            currentAlbum: ""
        };

        return {
            getAlbumObj : getAlbumObj
        }

        function getAlbumObj() {
            return albumObj;
        }

    }
})();
