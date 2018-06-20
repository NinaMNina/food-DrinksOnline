(function () {
    'use strict';

    angular
		.module('app')
		.controller('restaurantController', restaurantController);

    restaurantController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function restaurantController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var rc = this;

        var init = function (){
      //ADD
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
     //EDIT
        	$scope.isEdit = false;
        	$scope.opcije=[];
        	$scope.odabranEdit={};
		  	$scope.opcijeBrisanje=[];
        	$http({
                method: 'GET',
                url: 'rest/restoran/svi'
              }).then(function successCallback(response) {
            	  for(var i=0; i<response.data.length; i++){
            		  $scope.opcije.push(response.data[i]);
            		  var o = response.data[i];
            		  setOCategory(o);
        		  	  $scope.opcijeBrisanje.push(o);
            	  }
              }, function errorCallback(response) {
            	  
               });
        	
        	$scope.secretMessage="";
        	$scope.showMessage=false;
        };        
        init();
       
        rc.addRestaurant = function(){
        	if($scope.r.naziv=="" || $scope.r.adresa=="" || $scope.kateg==""){
              	$scope.secretMessage="All data neccessery. Restaurant not added.";     
                rc.showResponse();        		
        		return;
        	}
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
        rc.deleteRest = function(rest){
        	$http({
                method: 'DELETE',
                url: 'rest/restoran/brisi/'+rest.id
              }).then(function successCallback(response) {
	               
              }, function errorCallback(response) {
               });
        }
       var setOCategory = function(o){
    	   if(o.kategorija=="DOMACA")
    		   o["kateg"]= "home made";
    	   if(o.kategorija=="ROSTILJ")
    		   o["kateg"]= "barbique";
    	   if(o.kategorija=="INDIJSKA")
    		   o["kateg"]= "indian";
    	   if(o.kategorija=="KINESKA")
    		   o["kateg"]= "chinese";
    	   if(o.kategorija=="POSLASTICARNICA")
    		   o["kateg"]= "bakery";
    	   if(o.kategorija=="PICERIJA")
    		   o["kateg"]= "pizza";
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
       var setCategoryEdit = function(){
    	   if($scope.kateg=="home made")
    		   $scope.er.kategorija="DOMACA";
    	   if($scope.kateg=="barbique")
    		   $scope.er.kategorija="ROSTILJ";
    	   if($scope.kateg=="indian")
    		   $scope.er.kategorija="KINESKA";
    	   if($scope.kateg=="chinese")
    		   $scope.er.kategorija="INDIJSKA";
    	   if($scope.kateg=="bakery")
    		   $scope.er.kategorija="POSLASTICARNICA";
    	   if($scope.kateg=="pizza")
    		   $scope.er.kategorija="PICERIJA";
       }
       var setKategValue = function(k){
    	   if(k=="DOMACA")
    		   return "home made";
    	   if(k=="ROSTILJ")
    		   return "barbique";
    	   if(k=="INDIJSKA")
    		   return "indian";
    	   if(k=="KINESKA")
    		   return "chinese";
    	   if(k=="POSLASTICARNICA")
    		   return "bakery";
    	   return "pizza";
       }
       rc.doEditing = function(){
    	   $scope.er = $scope.odabranEdit;
    	   $scope.kateg = setKategValue($scope.er.kategorija);
    	   $scope.isEdit=true;
       }
       rc.goBackToChoice = function(){
    	   $scope.er = {};
    	   $scope.isEdit=false;    	   
       }
       rc.editRestaurant = function(){
    	   if($scope.er.naziv=="" || $scope.er.adresa=="" || $scope.kateg==""){
             	$scope.secretMessage="All data neccessery. Restaurant not changed.";     
               rc.showResponse();        		
       		return;
       		}
    	   setCategoryEdit();
    	   $http({
               method: 'POST',
               url: 'rest/restoran/izmeni',
               data: $scope.er   
             }).then(function successCallback(response) {
	               $scope.secretMessage="Restaurant changed succesfully";
	               rc.showResponseAndMove();
             }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Restaurant not changed.";     
	                rc.showResponse();
              });
       }
       rc.showResponse = function(){
       	$scope.showMessage=true;
       	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
       }
       rc.showResponseAndMove = function(){
          	$scope.showMessage=true;
          	$timeout(function() {
   		    	  $scope.showMessage= false;
   		    	  $scope.isEdit=false;
	              $scope.er={};
	              $scope.kateg="";
   		      }, 2000);   
          }
    }
})();