/**
 * Created by krusheth on 3/13/17.
 */
(function () {
   
    angular.module('kayliJeanApp')
        .controller('HomeCtrl', HomeCtrl);

      //inject the services that need to be used by Home Controller
        HomeCtrl.$inject = ['$scope', 's3Svc', '$interval'];
        

    	function HomeCtrl($scope, s3Svc, $interval) {
    		let self = this;
    		$scope.s3Pictures = [];
            $scope.currentPicture = "";
    		const bucketName = "kaylijean-homepage-photos";

    		const params = {
                Bucket: bucketName
            }

            const s3 = s3Svc.getS3(bucketName);
            const bucketUrl = "https://s3.us-west-2.amazonaws.com/" + bucketName + "/";

            let currentImageIndex = 0;

			s3.listObjectsV2(params, function(err, data) {
				if (err) {
					console.log(err, err.stack); // an error occurred
				}
				else {
					for (let i = 0; i < data.Contents.length; i++) {
						$scope.s3Pictures.push(bucketUrl + data.Contents[i].Key);
					}
                    $scope.currentPicture = $scope.s3Pictures[0];
                    $interval(changePicture, 4000);
					$scope.$apply();
				}
			});

            function changePicture() {
                currentImageIndex++;
                if (currentImageIndex >= $scope.s3Pictures.length) {
                    currentImageIndex = 0;
                }
                $scope.currentPicture = $scope.s3Pictures[currentImageIndex];
            }

		}
})();
