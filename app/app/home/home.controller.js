/**
 * Created by krusheth on 3/13/17.
 */
(function () {
   
    angular.module('kayliJeanApp')
        .controller('HomeCtrl', HomeCtrl);

      //inject the services that need to be used by Home Controller
        HomeCtrl.$inject = [];
        

    	function HomeCtrl() {
    		let self = this;
    		// Import the Amazon S3 service client
    		require('aws-sdk/dist/aws-sdk');
			var AWS = window.AWS;
			console.log(AWS);
			 
			// Set credentials and region
			const s3 = new AWS.S3({
			    apiVersion: '2006-03-01',
			    region: 'us-west-1', 
			    credentials: {}
			  });

			console.log(s3);
		}
})();
