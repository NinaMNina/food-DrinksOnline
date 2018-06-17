(function () {
    'use strict';

    angular
		.module('app')
		.controller('signInController', signInController);

    signInController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies'];
    function signInController($scope, $location, $rootScope, $http, $cookies) {
        var sc = this;

        var init = function (){
        	$rootScope.showMenu=false;
        	$scope.showMessage=false;
        	$scope.secretMessage="";
        	$scope.user={"username": "",
        			"pass": ""};
        };        
        init();
        
        sc.signIn = function(){
        	$http({
                method: 'POST',
                url: 'rest/korisnik/log',
                data: $scope.user
              }).then(function successCallback(response) {
            	  if(response.data==""){
	              	$scope.secretMessage="Username or password are wrong";     
	                sc.showError();            		  
            	  }
            	  $cookies.put("user", JSON.stringify(response.data), {
	     			   path: 'core'
	     			});	
              	$rootScope.showMenu=true;
              	$location.path('/home'); 
            	  
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Try it again.";     
	                sc.showError();
               });
        }
        sc.showError = function(){
        	$scope.showMessage=true;
        	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
        }

    }
})();