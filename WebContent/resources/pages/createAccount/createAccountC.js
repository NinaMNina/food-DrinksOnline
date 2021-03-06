(function () {
    'use strict';

    angular
		.module('app')
		.controller('createAccountController', createAccountController);

    createAccountController.$inject = ['$scope', '$location', '$rootScope', '$http', '$timeout'];
    function createAccountController($scope, $location, $rootScope, $http, $timeout) {
        var cac = this;

        var init = function (){
        	$rootScope.showMenu=false;
        	$scope.showMessage=false;
        	$scope.message="";
        	$rootScope.showSideMenu=false;
        	$scope.user = {
        		"username": "",
        		"pass": "",
        		"ime": "",
        		"prezime": "",
        		"telefon": "",
        		"email": "",
        		"datumRegistracije": new Date(),
        		"uloga": "REG",
        		"vozi": -1,
        		"omiljeno": [],
        		"dostavlja": [],
        		"porudzbine": []
        	};
        };        
        init();
        
        cac.makeAccount = function(){
        	if($scope.user.username=="" || $scope.user.pass=="" || $scope.pass2=="" || $scope.user.ime==""
        		|| $scope.user.prezime=="" || $scope.user.telefon=="" || $scope.user.email==""){
              	$scope.secretMessage="All fields have to be filled out";     
                cac.showError();       	          		
        		return;
        	}
        	if($scope.user.pass!==$scope.pass2){
              	$scope.secretMessage="Passwords are NOT matching!";     
                cac.showError();       	          		
        		return;        		
        	}
        	$http({
                method: 'POST',
                url: 'rest/korisnik/kreiraj',
                data: $scope.user   
              }).then(function successCallback(response) {
            	  if(response.data==""){
  	              	$scope.secretMessage="Username not unique. Account not created.";      
	                cac.showError();
              	  }
            	  else{
                   cac.showSuccess();
                   $scope.secretMessage="Account created succesfully";
            	  }		
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Account not created.";     
	                cac.showError();
               });
        }
        cac.showSuccess = function(){
        	$scope.showMessage=true;
        	$timeout(function() {
            	$scope.user = {
                		"username": "",
                		"pass": "",
                		"ime": "",
                		"prezime": "",
                		"telefon": "",
                		"email": "",
                		"datumRegistracije": new Date(),
                		"uloga": "REG",
                		"vozi": -1,
                		"omiljeno": [],
                		"dostavlja": [],
                		"porudzbine": []
                	};
		    	  $scope.showMessage= false;
		    	  $location.path('/signIn');
		      }, 3000);   
        }
        cac.showError = function(){
        	$scope.showMessage=true;
        	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
        }
    }
})();