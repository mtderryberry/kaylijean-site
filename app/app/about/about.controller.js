/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('AboutCtrl', AboutCtrl);

  AboutCtrl.$inject = ['$scope'];

  function AboutCtrl($scope) {
    let self = this;

    require("../../assets/images/sony_camera.jpg");
  }

})();
