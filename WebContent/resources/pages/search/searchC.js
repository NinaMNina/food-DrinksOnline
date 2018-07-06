(function () {
    'use strict';

    angular
		.module('app')
		.controller('searchController', searchController);

    searchController.$inject = ['$scope', '$location', '$rootScope', '$cookies', '$timeout', '$http'];
    function searchController($scope, $location, $rootScope, $cookies, $timeout, $http) {
        var sc = this;

        var init = function (){
        	$scope.showMenuu=false;
        	$rootScope.logged = false;	
        	var tryUser = $cookies.get('user');
        	$scope.user = {};
        	if(tryUser!=undefined){
        		$scope.user = JSON.parse(tryUser);
        		$rootScope.logged = true;       		
        	}
        	$scope.isRest=true;
        	$scope.isItems=true;
        	
        	$scope.restorani = [];
        	$scope.artikli = [];
        	if($rootScope.search.tekstR=="" && $rootScope.search.tekstI==""){
        		$scope.isRest=false;
            	$scope.isItems=false;
            	$scope.showMenuu=true;
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
        	}
        	else if($rootScope.search.restorani && (!$rootScope.search.items)){
            	$scope.isRest=true;
            	$scope.isItems=false;
        		$http({
    	            method: 'GET',
    	            url: 'rest/restoran/svi'
    	          }).then(function successCallback(response) {
    	        	  for(var i=0; i<response.data.length; i++){
    	        		  var o = response.data[i];	
    	        		  setOCategory(o);
    	        		  if(o.naziv.indexOf($rootScope.search.tekstR)>=0 || o.kateg.indexOf($rootScope.search.tekstR)>=0
    	        				  || o.adresa.indexOf($rootScope.search.tekstR)>=0)
    	        			  $scope.restorani.push(o);
    	        	  }
    	          }, function errorCallback(response) {
    	        	  
    	           });
        	}
        	else if((!$rootScope.search.restorani) && $rootScope.search.items){
            	$scope.isRest=false;
            	$scope.isItems=true;
        		$http({
    	            method: 'GET',
    	            url: 'rest/restoran/svi'
    	          }).then(function successCallback(response) {
    	        	  for(var i=0; i<response.data.length; i++){
    	        		  for(var j=0; j<response.data[i].jela.length; j++){
    	        			  var jeloMeal = "jelo meal"
    	        			  if(response.data[i].naziv.indexOf($rootScope.search.tekstI)>=0 || 
    	        					  response.data[i].jela[j].naziv.indexOf($rootScope.search.tekstI)>=0 ||
    	        					  response.data[i].jela[j].cena==$rootScope.search.tekstI ||
    	        					  jeloMeal.indexOf($rootScope.search.tekstI)>=0)
    	        				  $scope.artikli.push({
    	        					  "naziv": response.data[i].jela[j].naziv,
    	        					  "opis": response.data[i].jela[j].opis,
    	        					  "cena": response.data[i].jela[j].cena,
    	        					  "mera": "g",
    	        					  "kolicina": response.data[i].jela[j].grama,
    	        					  "rNaziv": response.data[i].naziv,
    	        					  "rAdresa": response.data[i].adresa,
    	        					  "rKategorija": getKategorija(response.data[i].kategorija)    	        					  
    	        				  });
    	        		  }
    	        		  for(var j=0; j<response.data[i].pica.length; j++){
    	        			  var piceDrink = "pice drink"
    	        			  if(response.data[i].naziv.indexOf($rootScope.search.tekstI)>=0 || 
    	        					  response.data[i].pica[j].naziv.indexOf($rootScope.search.tekstI)>=0 ||
    	        					  response.data[i].pica[j].cena==$rootScope.search.tekstI ||
    	        					  piceDrink.indexOf($rootScope.search.tekstI)>=0)
    	        				  $scope.artikli.push({
    	        					  "naziv": response.data[i].pica[j].naziv,
    	        					  "opis": response.data[i].pica[j].opis,
    	        					  "cena": response.data[i].pica[j].cena,
    	        					  "mera": "ml",
    	        					  "kolicina": response.data[i].pica[j].mililitara,
    	        					  "rNaziv": response.data[i].naziv,
    	        					  "rAdresa": response.data[i].adresa,
    	        					  "rKategorija": getKategorija(response.data[i].kategorija)    	        					  
    	        				  });
    	        		  }
    	        	  }
    	          }, function errorCallback(response) {
    	        	  
    	           });
        	}
        	else if($rootScope.search.restorani && $rootScope.search.items){
            	$scope.isRest=true;
            	$scope.isItems=true;
        		$http({
    	            method: 'GET',
    	            url: 'rest/restoran/svi'
    	          }).then(function successCallback(response) {
    	        	  for(var i=0; i<response.data.length; i++){
    	        		  if(response.data[i].naziv.indexOf($rootScope.search.tekstR)>=0 || 
    	        				  response.data[i].kateg.indexOf($rootScope.search.tekstR)>=0 || 
    	        				  response.data[i].adresa.indexOf($rootScope.search.tekstR)>=0){
	    	        		  for(var j=0; j<response.data[i].jela.length; j++){
	    	        			  var jeloMeal = "jelo meal"
	    	        			  if(response.data[i].naziv.indexOf($rootScope.search.tekstI)>=0 || 
	    	        					  response.data[i].jela[j].naziv.indexOf($rootScope.search.tekstI)>=0 ||
	    	        					  response.data[i].jela[j].cena==$rootScope.search.tekstI ||
	    	        					  jeloMeal.indexOf($rootScope.search.tekstI)>=0)
	    	        				  $scope.artikli.push({
	    	        					  "naziv": response.data[i].jela[j].naziv,
	    	        					  "opis": response.data[i].jela[j].opis,
	    	        					  "cena": response.data[i].jela[j].cena,
	    	        					  "mera": "g",
	    	        					  "kolicina": response.data[i].jela[j].grama,
	    	        					  "rNaziv": response.data[i].naziv,
	    	        					  "rAdresa": response.data[i].adresa,
	    	        					  "rKategorija": getKategorija(response.data[i].kategorija)    	        					  
	    	        				  });
	    	        		  }
	    	        		  for(var j=0; j<response.data[i].pica.length; j++){
	    	        			  var piceDrink = "pice drink"
	    	        			  if(response.data[i].naziv.indexOf($rootScope.search.tekstI)>=0 || 
	    	        					  response.data[i].pica[j].naziv.indexOf($rootScope.search.tekstI)>=0 ||
	    	        					  response.data[i].pica[j].cena==$rootScope.search.tekstI ||
	    	        					  piceDrink.indexOf($rootScope.search.tekstI)>=0)
	    	        				  $scope.artikli.push({
	    	        					  "naziv": response.data[i].pica[j].naziv,
	    	        					  "opis": response.data[i].pica[j].opis,
	    	        					  "cena": response.data[i].pica[j].cena,
	    	        					  "mera": "ml",
	    	        					  "kolicina": response.data[i].pica[j].mililitara,
	    	        					  "rNaziv": response.data[i].naziv,
	    	        					  "rAdresa": response.data[i].adresa,
	    	        					  "rKategorija": getKategorija(response.data[i].kategorija)    	        					  
	    	        				  });
	    	        		  }
    	        		  }
    	        	  }
    	          }, function errorCallback(response) {
    	        	  
    	           });
        	}
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
        sc.showRestaurantsMenu = function(r){
        	$scope.showMenu=true;
        	$scope.rest = r;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
        sc.minus = function(jelo){
        	if(jelo.kolicina==0)
        		return;
        	jelo.kolicina=jelo.kolicina-1;
        }
        sc.plus = function(jelo){
        	jelo.kolicina=jelo.kolicina+1;
        }
        sc.addToFavs = function(id){
        	$http({
	            method: 'PUT',
	            url: 'rest/korisnik/'+$scope.user.username+'/'+id
	          }).then(function successCallback(response) {
	        	  $scope.user.omiljeno.push(id);
	          }, function errorCallback(response) {
	        	  
	           });
        }
        sc.makeOrder = function(){
        	$rootScope.narudzbina = {};
        	$rootScope.narudzbina.rest=$scope.rest;
        	$rootScope.narudzbina.napomena = $scope.napomena;
        	var tryUser = $cookies.get('user');
        	if(tryUser==undefined || tryUser==null){
        		$scope.secretMessage = "Log in first and then make your order!";
        		sc.showResponse();
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
        sc.showResponse = function(){
           	$timeout(function() {
    		    	  $scope.secretMessage= "";
    		      }, 3000);   
           }
    }
})();