
        var oauth = new OAuth({
            consumer: {
                public: 'ck_public_key',
                secret: 'cs_secret_key'
            },
            signature_method: 'HMAC-SHA1',
            hash_function: function(base_string, key) {
        return crypto.createHmac('sha1', key).update(base_string).digest('base64');
  		  }
        });

        
        oauth.getTimeStamp = function() {
            return Math.round(+new Date()/1000);
        };

        
        oauth.getNonce = function(length) {
            return Math.random()*1.2483;
        };

        var request = {
        url: 'http://example.com/wc-api/v2/products',
            method: 'GET'
        };

        var oauth_data = {
            oauth_consumer_key: oauth.consumer.public,
            oauth_nonce: oauth.getNonce(),
            oauth_signature_method: oauth.signature_method,
            oauth_timestamp: oauth.getTimeStamp()
        };

        var oauth_consumer_key = oauth.consumer.public;
        var oauth_nonce = oauth.getNonce();
        var oauth_signature_method = oauth.signature_method;
        var oauth_timestamp = oauth.getTimeStamp();
        
        oauth_data['filter[limit]'] = 200;

        oauth_data.oauth_signature = oauthSignature.generate( request.method, request.url, oauth_data, oauth.consumer.secret, '', { encodeSignature: true} );

       
		angular.module('myApp', []).controller('AppController', function($scope, $http) {
		    $http.get( request.url+'?'+oauth.getParameterString(request, oauth_data))
		   .then(function (response) {
		   		$scope.steps = response.data;
		   })
		});
   		
