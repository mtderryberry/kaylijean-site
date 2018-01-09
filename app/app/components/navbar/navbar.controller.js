/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('NavbarCtrl', NavbarCtrl);

  NavbarCtrl.$inject = ['$scope', 's3Svc', '$state'];

  function NavbarCtrl($scope, s3Svc, $state) {
    let self = this;
    require("../../../assets/images/logo/kj-logo.svg");
    require("../../../assets/images/logo/kj-logo-black.png");
    require("../../../assets/images/logo/kayli-logo-white.png");
    require("../../../assets/images/social/facebook-white.svg");
    require("../../../assets/images/social/instagram-white.svg");
    require("../../../assets/images/social/five-hundred-pix-white.svg");

    $scope.albumTitles = [];

    let originatorEv;

    const bucketName = "kaylijean-albums";

  	const params = {
        Bucket: bucketName,
        Delimiter: '/',
    }

    const s3 = s3Svc.getS3();
    const bucketUrl = "https://s3.us-west-2.amazonaws.com/" + bucketName + "/";

    s3.listObjectsV2(params, function(err, data) {
  		if (err) {
  			console.log(err, err.stack); // an error occurred
  		}
  		else {
  			for (let i = 0; i < data.CommonPrefixes.length; i++) {
  				let currentPrefix = data.CommonPrefixes[i].Prefix.slice(0, -1);
  				$scope.albumTitles.push(currentPrefix);
  				$scope.$apply();
  			}
  		}
  	});

    $scope.openMenu = function($mdMenu, ev) {
      	originatorEv = ev;
      	$mdMenu.open(ev);
    };

    $scope.closeMenu = function($mdMenu, ev) {
      originatorEv = ev;
      $mdMenu.close(ev);
    };

    $scope.openAlbum = function(albumName) {
        $state.go("root.albums", {"album": albumName});
    }

  }

})();
