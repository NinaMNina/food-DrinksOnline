(function () {
    'use strict';

    angular
		.module('app')
		.controller('myOrdersController', myOrdersController);

    myOrdersController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function myOrdersController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var moc = this;

        var init = function (){     
        	
        	var tryUser = $cookies.get('user');
        	var user={};
        	if(tryUser!=undefined){
        		user = JSON.parse(tryUser);
        	}
        	$scope.narudzbine = [];
        	$http({
	            method: 'GET',
	            url: 'rest/porudzbina/'+user.username
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  $scope.narudzbine = response.data;
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        };        
        init();
        
       
    }
})();