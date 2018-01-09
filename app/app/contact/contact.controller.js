/**
 * Created by krusheth on 3/15/17.
 */
(function () {
  angular.module('kayliJeanApp')
    .controller('ContactCtrl', ContactCtrl);

  ContactCtrl.$inject = ['$scope', 's3Svc'];

  function ContactCtrl($scope, s3Svc) {
    let self = this;

    require("../../assets/images/kj-contact.jpg");

	$scope.contact = {

	};

	// require("../../assets/images/ocean.jpg");

	$scope.sendEmail = function() {

	    const ses = s3Svc.getSES();
	    
		// Create sendEmail params 
		var params = {
			Destination: { /* required */
				CcAddresses: [
					$scope.contact.clientEmail,
					/* more items */
				],
				ToAddresses: [
					'askkaylijean@gmail.com',
					/* more items */
				]
			},
			Message: { /* required */
				Body: { /* required */
					Text: {
						Charset: "UTF-8",
						Data: $scope.contact.message
					}
				},
				Subject: {
					Charset: 'UTF-8',
					Data: $scope.contact.clientSubject
				}
			},
			Source: 'kaylijeansite@gmail.com', /* required */
			ReplyToAddresses: [
				/* more items */
			],
		};       

		// Create the promise and SES service object
		var sendPromise = ses.sendEmail(params).promise();

		// Handle promise's fulfilled/rejected states
		sendPromise
			.then(function(data) {
				console.log(data.MessageId);
			}).catch(function(err) {
				console.error(err, err.stack);
			});

	}

	
  }

})();
