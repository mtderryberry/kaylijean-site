/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('AlbumsCtrl', AlbumsCtrl);

  AlbumsCtrl.$inject = ['$scope', 'albumSvc', 's3Svc', 'angularGridInstance', '$http'];

  function AlbumsCtrl($scope, albumSvc, s3Svc, $http) {
    let self = this;

    $scope.albumObj = albumSvc.getAlbumObj();
    $scope.s3Pictures = [];

    const bucketName = "kaylijean-albums";

	const params = {
        Bucket: bucketName,
        Prefix: $scope.albumObj.currentAlbum
    }

    const s3 = s3Svc.getS3();
    const bucketUrl = "https://s3.us-west-2.amazonaws.com/" + bucketName + "/";


    $scope.images = [];

	// gallery methods
	$scope.methods = {};

	// so you will bind openGallery method to a button on page
	// to open this gallery like ng-click="openGallery();"
	$scope.openGallery = function(){
		$scope.methods.open();

		// You can also open gallery model with visible image index
		// Image at that index will be shown when gallery modal opens
		//scope.methods.open(index);
	};

	// Similar to above function
	$scope.closeGallery = function(){
		$scope.methods.close();
	};

	$scope.nextImg = function(){
		$scope.methods.next();
	};

	$scope.prevImg = function(){
		$scope.methods.prev();
	};

	$scope.conf = {
		thumbnails  	:   true,
		thumbSize		: 	300,
		inline      	:   false,
		bubbles     	:   true,
		bubbleSize		: 	40,
		imgBubbles  	:   true,
		bgClose     	:   false,
		piracy 			: 	false,
		imgAnim 		: 	'fadeup',
	};

	s3.listObjectsV2(params, function(err, data) {
		if (err) {
			console.log(err, err.stack); // an error occurred
		}
		else {
			for (let i = 0; i < data.Contents.length; i++) {
				if (data.Contents[i].Size > 0) {
					$scope.images.push({
						id : i,
						url : bucketUrl + data.Contents[i].Key,
					});
				}
			}
			$scope.$apply();
		}
	});

  }

})();
