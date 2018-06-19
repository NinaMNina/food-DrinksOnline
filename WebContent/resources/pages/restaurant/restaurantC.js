(function () {
    'use strict';

    angular
		.module('app')
		.controller('restaurantController', restaurantController);

    restaurantController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function restaurantController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var rc = this;

        var init = function (){
        	$rootScope.logged = false;	
        	var tryUser = $cookies.get('user');
        	if(tryUser!=undefined){
        		var user = JSON.parse(tryUser);
        		$rootScope.logged = true;	
        		if(user.uloga=="ADMIN"){
    	        	$rootScope.isAdmin = true;
    	        	$rootScope.showMenu = false;
    	        	$rootScope.isHome = false;       	
            	}
        	}
        	else{
        		$location.path('/home');
        	}
        	$scope.kategorije = ["home made", "barbique", "chinese", "indian", "bakery", "pizza"];
        	$scope.r={};
        	$scope.r.naziv="";
        	$scope.r.adresa="";
        	$scope.r.kategorija="";
        	$scope.r.id=-1;
        	$scope.r.activ=true;
        	$scope.r.pica=[];
        	$scope.r.jela=[];
        	$scope.kateg="home made";
        	
        	
        	$scope.secretMessage="";
        	$scope.showMessage=false;
        };        
        init();
       
        rc.addRestaurant = function(){
        	setCategory();
        	$http({
                method: 'POST',
                url: 'rest/restoran/dodaj',
                data: $scope.r   
              }).then(function successCallback(response) {
	               $scope.secretMessage="Restaurant added succesfully";
	               rc.showResponse();
	               $scope.r.naziv="";
	               $scope.r.adresa="";
	               $scope.r.kategorija="";
	               $scope.r.id=-1;
	               $scope.r.activ=true;
	               $scope.r.pica=[];
	               $scope.r.jela=[];
	               $scope.kateg=0;
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Restaurant not added.";     
	                rc.showResponse();
               });
        	
        }
       var setCategory = function(){
    	   if($scope.kateg=="home made")
    		   $scope.r.kategorija="DOMACA";
    	   if($scope.kateg=="barbique")
    		   $scope.r.kategorija="ROSTILJ";
    	   if($scope.kateg=="indian")
    		   $scope.r.kategorija="KINESKA";
    	   if($scope.kateg=="chinese")
    		   $scope.r.kategorija="INDIJSKA";
    	   if($scope.kateg=="bakery")
    		   $scope.r.kategorija="POSLASTICARNICA";
    	   if($scope.kateg=="pizza")
    		   $scope.r.kategorija="PICERIJA";
       }
       
       rc.showResponse = function(){
       	$scope.showMessage=true;
       	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
       }
    }
})();