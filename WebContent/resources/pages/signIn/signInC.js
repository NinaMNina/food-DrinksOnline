(function () {
    'use strict';

    angular
		.module('app')
		.controller('signInController', signInController);

    signInController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function signInController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var sc = this;

        var init = function (){
        	$rootScope.showMenu=false;
        	$scope.showMessage=false;
        	$scope.secretMessage="";
        	$scope.user={"username": "",
        			"pass": "",
        			"uloga": "REG"};
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
        		$rootScope.logged = true;
              	if(response.data.uloga=='ADMIN'){
                  	$rootScope.isAdmin=true;
                  	$rootScope.showMenu=false;   
    	        	$rootScope.isHome = false; 
    	        	$rootScope.addRest=true;
                  	$location.path('/addRestaurant');           		
              	}
            	  
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Try it again.";  
	        		$rootScope.logged = false;   
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