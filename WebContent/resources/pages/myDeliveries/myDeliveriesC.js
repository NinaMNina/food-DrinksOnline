(function () {
    'use strict';

    angular
		.module('app')
		.controller('myDeliveriesController', myDeliveriesController);

    myDeliveriesController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function myDeliveriesController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var mdc = this;

        var init = function (){  
        	var tryUser = $cookies.get('user');
        	$scope.user = JSON.parse(tryUser);
        	$scope.porudzbine = [];
        	$http({
	            method: 'GET',
	            url: 'rest/porudzbina/moje/'+$scope.user.username
	          }).then(function successCallback(response) {
	        	  $scope.porudzbine = response.data;	        	  
	          }, function errorCallback(response) {
	        	  
	           });
        	
        };        
        init();
        
       
    }
})();