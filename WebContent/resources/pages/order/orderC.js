(function () {
    'use strict';

    angular
		.module('app')
		.controller('orderController', orderController);

    orderController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function orderController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var oc = this;

        var init = function (){
        	$scope.isChoosing = true;
        	$scope.showMessage = false;
        	$scope.secretMessage = "";
        	$scope.isEdit=false;
        	$scope.svePorudzbine = [];
        	$scope.restorani = [];
        	$scope.apor = {};
        	$scope.dostavljac="";
        	$scope.korisnik="";
        	$scope.napomena = "";
        	$scope.epor={};
        	$scope.isRest = true;
        	$scope.reg = [];
        	$scope.dost = [];
	    	$http({
	            method: 'GET',
	            url: 'rest/porudzbina/sve'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];
	        		  setOStatus(o);    		  	 
	        		  $scope.svePorudzbine.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
	    	$http({
	            method: 'GET',
	            url: 'rest/korisnik/reg'
	          }).then(function successCallback(response) {
	        	  $scope.reg = response.data;
	          }, function errorCallback(response) {
	        	  
	           });
	    	$http({
	            method: 'GET',
	            url: 'rest/korisnik/dost'
	          }).then(function successCallback(response) {
	        	  $scope.dost = response.data;
	          }, function errorCallback(response) {
	        	  
	           });
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
        };        
        init();
       
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
        var setOStatus = function(o){
     	   if(o.status=="PORUCENO")
     		   o["s"]= "ordered";
     	   if(o.status=="UTOKU")
    		   o["s"]= "is delivering...";
     	   if(o.status=="OTKAZANO")
    		   o["s"]= "canceled";
     	   if(o.status=="DOSTAVLJENO")
    		   o["s"]= "delivered";    	  
        }
        oc.showRestaurantsMenu = function(r){
        	$scope.rest = r;
        	$scope.isRest=false;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
        
        oc.minus = function(jelo){
        	if(jelo.kolicina==0)
        		return;
        	jelo.kolicina=jelo.kolicina-1;
        }
        oc.plus = function(jelo){
        	jelo.kolicina=jelo.kolicina+1;
        }
        oc.makeOrder = function(){
        	if($scope.apor.prima==""){
        		$scope.secretMessage = "No user to get Order";
        		oc.showResponse();
        	}
        	var data = {};
        	data = {
        			"id": -1,
        			"korisnik": $scope.korisnik.username,
        			"idRestorana": $scope.rest.id,
        			"nazivRestorana":$scope.rest.naziv,
        			"napomena":$scope.napomena,
        			"vreme": new Date(),
        			"status": "UTOKU",
        			"dostavljac": $scope.dostavljac.username,
        			"stavke": [],
        			"activ": true,
        			"cena": 0
        	};
        	var cena = 0
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		if($scope.rest.jela[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$scope.rest.jela[i].id,
        				"naziv":$scope.rest.jela[i].naziv,
        				"kolicina":$scope.rest.jela[i].kolicina        			
        			});
        			cena = cena + $scope.rest.jela[i].kolicina * $scope.rest.jela[i].cena;
        		}
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		if($scope.rest.pica[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$scope.rest.pica[i].id,
        				"naziv":$scope.rest.pica[i].naziv,
        				"kolicina":$scope.rest.pica[i].kolicina       			
        			});
        			cena = cena + $scope.rest.pica[i].kolicina * $scope.rest.pica[i].cena;
        		}
        	}
        	data["cena"] = cena;
        	$http({
                method: 'POST',
                url: 'rest/porudzbina/dodaj',
                data: data
              }).then(function successCallback(response) {
	               $scope.secretMessage="Your order is sent succesfully";
	                oc.showResponse();
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Your order is not sent";     
	                oc.showResponse();
             });
        }
        
        oc.goEditing = function(n){
        	$http({
                method: 'GET',
                url: 'rest/restoran/jedan/'+n.idRestorana
              }).then(function successCallback(response) {
            	  $scope.rest = response.data;
            	  $scope.napomena = n.napomena;
            	  $scope.nnnnnnn = n;
              	  $scope.isChoosing=false;
              	for(var i=0; i<$scope.rest.jela.length; i++){
        			$scope.rest.jela[i].kolicina = 0;
              		for(var j=0; j<n.stavke.length;j++){
              			if(n.stavke[j].idArtikla==$scope.rest.jela[i].id){
                			$scope.rest.jela[i].kolicina = n.stavke[j].kolicina;
                		}
              		}
            		
            	}
            	for(var i=0; i<$scope.rest.pica.length; i++){
            		$scope.rest.pica[i].kolicina = 0;
            		for(var j=0; j<n.stavke.length;j++){
              			if(n.stavke[j].idArtikla==$scope.rest.pica[i].id){
                			$scope.rest.pica[i].kolicina = n.stavke[j].kolicina;
                		}
              		}
            	}
            	for(var i=0; i<$scope.reg.length; i++){
        			if($scope.reg[i].username==n.korisnik){
            			$scope.korisnik =$scope.reg[i]; 
            		}
            	}
            	for(var i=0; i<$scope.dost.length; i++){
        			if($scope.dost[i].username==n.dostavljac){
            			$scope.dostavljac =$scope.reg[i]; 
            		}
            	}
              }, function errorCallback(response) {
            	  
               });
        } 
        oc.deleteOrder = function(n){
        	$http({
                method: 'DELETE',
                url: 'rest/porudzbina/brisi/'+n.id
              }).then(function successCallback(response) {
              }, function errorCallback(response) {
             });
        }
        oc.saveChangedOrder = function(){
        	if($scope.apor.prima==""){
        		$scope.secretMessage = "No user to get Order";
        		oc.showResponse();
        	}
        	var data = {};
        	data = {
        			"id": $scope.nnnnnnn.id,
        			"korisnik": $scope.korisnik.username,
        			"idRestorana": $scope.rest.id,
        			"nazivRestorana":$scope.rest.naziv,
        			"napomena":$scope.napomena,
        			"vreme": new Date(),
        			"status": "UTOKU",
        			"dostavljac": $scope.dostavljac.username,
        			"stavke": [],
        			"activ": true,
        			"cena": 0
        	};
        	var cena = 0
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		if($scope.rest.jela[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$scope.rest.jela[i].id,
        				"naziv":$scope.rest.jela[i].naziv,
        				"kolicina":$scope.rest.jela[i].kolicina        			
        			});
        			cena = cena + $scope.rest.jela[i].kolicina * $scope.rest.jela[i].cena;
        		}
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		if($scope.rest.pica[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$scope.rest.pica[i].id,
        				"naziv":$scope.rest.pica[i].naziv,
        				"kolicina":$scope.rest.pica[i].kolicina       			
        			});
        			cena = cena + $scope.rest.pica[i].kolicina * $scope.rest.pica[i].cena;
        		}
        	}
        	data["cena"] = cena;
        	$http({
                method: 'PUT',
                url: 'rest/porudzbina/'+$scope.nnnnnnn.id,
                data: data
              }).then(function successCallback(response) {
	               $scope.secretMessage="Your changes are saved succesfully";
	                oc.showResponse();
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Your order is not saved";     
	                oc.showResponse();
             });
        	
        }
       oc.showResponse = function(){
       	$scope.showMessage=true;
       	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
       }
       oc.showResponseAndMove = function(){
         	$scope.showMessage=true;
         	$timeout(function() {
         		  $scope.secretMessage = "";
  		    	  $scope.showMessage= false;
  		      }, 2000);   
         }
       
       
    }
})();