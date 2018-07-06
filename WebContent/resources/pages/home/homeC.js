(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$location', '$rootScope', '$cookies', '$timeout', '$http'];
    function homeController($scope, $location, $rootScope, $cookies, $timeout, $http) {
        var hc = this;

        var init = function (){
        	
        	$rootScope.logged = false;	
        	var tryUser = $cookies.get('user');
        	$scope.user = {};
        	if(tryUser!=undefined){
        		$scope.user = JSON.parse(tryUser);
        		$rootScope.logged = true;       		
        	}
        	$scope.restorani = [];
        	$scope.isM=false;
        	$scope.top=[];
    		$http({
	            method: 'GET',
	            url: 'rest/restoran/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];	
	        		  setOCategory(o);
	        		  $scope.restorani.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
    		$http({
	            method: 'GET',
	            url: 'rest/restoran/top'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<10; i++){
	        		  $scope.top.push(response.data[i]);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        	
        	
        };        
        init();
        var getKategorija = function(s){
        	if(s=="DOMACA")
      		   return "home made";
      	   if(s=="ROSTILJ")
      		   return "barbique";
      	   if(s=="INDIJSKA")
      		   return "indian";
      	   if(s=="KINESKA")
      		   return "chinese";
      	   if(s=="POSLASTICARNICA")
      		   return "bakery";
      	   return "pizza";
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
        hc.showRestaurantsMenu = function(r){
        	$scope.isM=true;
        	$scope.rest = r;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
        hc.minus = function(jelo){
        	if(jelo.kolicina==0)
        		return;
        	jelo.kolicina=jelo.kolicina-1;
        }
        hc.plus = function(jelo){
        	jelo.kolicina=jelo.kolicina+1;
        }
        hc.addToFavs = function(id){
        	$http({
	            method: 'PUT',
	            url: 'rest/korisnik/'+$scope.user.username+'/'+id
	          }).then(function successCallback(response) {
	        	  $scope.user.omiljeno.push(id);
	          }, function errorCallback(response) {
	        	  
	           });
        }
        hc.makeOrder = function(){
        	$rootScope.narudzbina = {};
        	$rootScope.narudzbina.rest=$scope.rest;
        	$rootScope.narudzbina.napomena = $scope.napomena;
        	var tryUser = $cookies.get('user');
        	if(tryUser==undefined || tryUser==null || tryUser=="" || !$rootScope.logged){
        		$scope.secretMessage = "Log in first and then make your order!";
        		hc.showResponse();
        		return;
        	}
        	var user = JSON.parse(tryUser);
        	$http({
	            method: 'GET',
	            url: 'rest/korisnik/'+user.username
	          }).then(function successCallback(response) {
	          		$rootScope.narudzbina.prima = response.data;
	            	$location.path('/confirmFinalOrder');
	          }, function errorCallback(response) {
	        	  
	           });
        }
        hc.showResponse = function(){
           	$timeout(function() {
    		    	  $scope.secretMessage= "";
    		      }, 3000);   
           }
    }
})();