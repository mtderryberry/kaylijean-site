/**
 * Created by krusheth on 4/17/17.
 * This is a service to invoke all apis related notifications
 */
(function () {
    angular.module('kayliJeanApp')

        .factory('s3Svc', s3Svc);

    s3Svc.$inject = [];

    function s3Svc() {

        let AWS;
        let s3;
        let ses;

        return {
            getS3: getS3,
            getSES: getSES
        }

        function getS3() {
            if (angular.isUndefined(s3)) {
                init();
            }
            return s3;
        }

        function getSES() {
            if (angular.isUndefined(ses)) {
                init();
            }
            return ses;
        }

        function init() {
            if (angular.isUndefined(AWS) && angular.isUndefined(s3)) {
                // Import the Amazon S3 service client
                require('aws-sdk/dist/aws-sdk');
                AWS = window.AWS;

                AWS.config.region = 'us-west-2';
                AWS.config.credentials = new AWS.CognitoIdentityCredentials({
                    IdentityPoolId: 'us-west-2:5dd8d18e-0a34-4ec9-9582-1b4a6d902c75',
                });
                 
                // Set credentials and region
                s3 = new AWS.S3({
                    apiVersion: '2006-03-01'
                });

                ses = new AWS.SES({
                    apiVersion: '2010-12-01'
                });
            }
        }
    }

})();
