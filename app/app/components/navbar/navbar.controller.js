/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = [];

  function NavbarCtrl() {
    let self = this;
    require("../../../assets/images/logo/kj-logo.svg");
    require("../../../assets/images/social/facebook-white.svg");
    require("../../../assets/images/social/instagram-white.svg");
  }

})();
