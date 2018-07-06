(function () {
    'use strict';

    angular
		.module('app')
		.controller('signInController', signInController);

    signInController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function signInController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var sc = this;

        var init = function (){
        	$rootScope.showUserMenu=false;
        	$scope.showMessage=false;
        	$rootScope.showSideMenu = false;
        	$rootScope.showDostMenu = false;
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
	        	$rootScope.showSideMenu = true;
              	$rootScope.showUserMenu=true; 
              	if(response.data.uloga=='ADMIN'){
                  	$rootScope.showAdminMenu=true;
                  	$rootScope.showUserMenu=false;   
    	        	$rootScope.isHome = false; 
    	        	$rootScope.addRest=true;
                  	$rootScope.showDostMenu=false; 
    	        	$rootScope.showSideMenu = false;
                  	$location.path('/addRestaurant');           		
              	}
              	if(response.data.uloga=='DOST'){
              		$rootScope.showDostMenu=true;
              		$rootScope.showUserMenu=false;
    	        	$rootScope.showSideMenu = false;
    	        	$location.path('/getDelivery');
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