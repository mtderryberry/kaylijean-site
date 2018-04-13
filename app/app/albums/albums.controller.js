/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('AlbumsCtrl', AlbumsCtrl);

  AlbumsCtrl.$inject = ['$scope', 'albumSvc', 's3Svc', '$http', '$state'];

  function AlbumsCtrl($scope, albumSvc, s3Svc, $http, $state) {
    let self = this;

    $scope.albumObj = albumSvc.getAlbumObj();
    $scope.s3Pictures = [];

    const bucketName = "kaylijean-albums";

	const params = {
        Bucket: bucketName,
        Prefix: $scope.albumObj.currentAlbum + '/',
        Delimiter: '/',
    }

    const s3 = s3Svc.getS3();
    const bucketUrl = "https://s3.us-west-2.amazonaws.com/" + bucketName + "/";

    $scope.subfolders = false;

    $scope.images = [];

    $scope.firstColumnImages = [];
    $scope.secondColumnImages = [];
    $scope.thirdColumnImages = [];

	// gallery methods
	$scope.methods = {};

	// so you will bind openGallery method to a button on page
	// to open this gallery like ng-click="openGallery();"
	$scope.openGallery = function(index){
		$scope.methods.open(index-1);

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

	$scope.openAlbum = function(albumName) {
        $state.go("root.subalbums", {
        	"album": $scope.albumObj.currentAlbum,
        	"subalbum": albumName
        });
    }

	$scope.conf = {
		thumbnails  	:   false,
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
			let currentColumn = 0;
			// there are sub folders
			if (data.CommonPrefixes.length > 0) {
				$scope.subfolders = true;
				for (let i = 0; i < data.CommonPrefixes.length; i++) {
					let currentPrefix = data.CommonPrefixes[i].Prefix;
					let currentCoverPhoto = bucketUrl + currentPrefix + 'Cover.jpg';
					let captionText = currentPrefix.split('/')[1];
					let imageObj = {
						id : i,
						url : currentCoverPhoto,
						caption: captionText
					};
					if (currentColumn === 0) {
						$scope.firstColumnImages.push(imageObj);
					}
					else if (currentColumn === 1) {
						$scope.secondColumnImages.push(imageObj);
					}
					else  {
						$scope.thirdColumnImages.push(imageObj);
					}
					currentColumn++;
					if (currentColumn === 3) {
						currentColumn = 0;
					}
				}
			}
			// no sub folders. show the image feed
			else {
				for (let i = 0; i < data.Contents.length; i++) {
					if (data.Contents[i].Size > 0) {
						let current = bucketUrl + data.Contents[i].Key;
						let currentImageObj = {
							id: i,
							url: current
						};
						$scope.images.push(currentImageObj);
						if (currentColumn === 0) {
							$scope.firstColumnImages.push(currentImageObj);
						}
						else if (currentColumn === 1) {
							$scope.secondColumnImages.push(currentImageObj);
						}
						else {
							$scope.thirdColumnImages.push(currentImageObj);
						}
						currentColumn++;
						if (currentColumn === 3) {
							currentColumn = 0;
						}
					}
				}
			}
			$scope.$apply();
		}
	});

  }

})();
