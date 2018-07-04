(function () {
    'use strict';

    angular
		.module('app')
		.controller('menuItemController', menuItemController);

    menuItemController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function menuItemController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var mic = this;

        var init = function (){
        	$scope.showMessage = false;
        	$scope.secretMessage = "";
        	$scope.isEdit=false;
        	$scope.sviRestorani = [];
        	$scope.vrsta = "jelo";
        	$scope.ami = {};
        	$scope.emi={};
	    	$http({
	            method: 'GET',
	            url: 'rest/restoran/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];
	        		  setOCategory(o);    		  	 
	        		  $scope.sviRestorani.push(o);
	        		  $scope.ami.idRestorana = o.id;
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
        mic.addMenuItem = function(){
        	if($scope.ami.naziv=="" || $scope.ami.opis=="" || $scope.ami.idRestorana=="" || $scope.ami.idRestorana<=0 ||
        	$scope.ami.cena=="" || $scope.ami.cena<=0 || $scope.ami.kolicina=="" || $scope.ami.kolicina<=0){
              	$scope.secretMessage="All data neccessery. Menu Item not added.";     
                mic.showResponse();        		
        		return;
        	}
        	var data = {
     			   "id": -1,
     			   "naziv": $scope.ami.naziv,
     			   "opis": $scope.ami.opis,
     			   "idRestorana": $scope.ami.idRestorana,
     			   "activ": true,
     			   "cena": $scope.ami.cena
     	   };
     	   var urlAdresa = 'rest/jelo/dodaj';
     	   if($scope.vrsta=="pice"){
     		   data.mililitara = $scope.ami.kolicina;
         	   urlAdresa = 'rest/pice/dodaj';
     	   }else{
     		   data.grama = $scope.ami.kolicina;
     	   }
        	$http({
                method: 'POST',
                url: urlAdresa,
                data: data  
              }).then(function successCallback(response) {
	               $scope.secretMessage="Menu Item added succesfully";
	               mic.showResponse();
	               $scope.ami.naziv="";
	               $scope.ami.opis="";
	               $scope.ami.cena="";
	               $scope.ami.kolicina="";
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Menu Item not added.";     
	                mic.showResponse();
               });
        	
        }
        mic.deletePice = function(pice){
        	$http({
                method: 'DELETE',
                url: 'rest/pice/brisi/'+pice.id
              }).then(function successCallback(response) {
            	  for(var i=0; $scope.sviRestorani.length; i++){
            		  if($scope.sviRestorani[i].id==pice.idRestorana){
            			  for(var j=0; j<$scope.sviRestorani[i].pica.length; j++ ){
            				  if(pice.id==$scope.sviRestorani[i].pica[j].id){
            					  scope.sviRestorani[i].pica.splice(j, 1);
            					  return;
            				  }
            			  }
            		  }
            	  }
              }, function errorCallback(response) {
               });
        }
        mic.deleteJelo = function(jelo){
        	$http({
                method: 'DELETE',
                url: 'rest/jelo/brisi/'+jelo.id
              }).then(function successCallback(response) {
            	  for(var i=0; $scope.sviRestorani.length; i++){
            		  if($scope.sviRestorani[i].id==jelo.idRestorana){
            			  for(var j=0; j<$scope.sviRestorani[i].jela.length; j++ ){
            				  if(jelo.id==$scope.sviRestorani[i].jela[j].id){
            					  scope.sviRestorani[i].jela.splice(j, 1);
            					  return;
            				  }
            			  }
            		  }
            	  }
              }, function errorCallback(response) {
               });
        }
       mic.doEditingJelo = function(jelo){
    	   $scope.emi = jelo;
    	   $scope.kol={"naziv":"g", "iznos": jelo.grama};
    	   $scope.isEdit=true;    	   
       }
       mic.doEditingPice = function(pice){
    	   $scope.emi = pice;
    	   $scope.kol={"naziv":"ml", "iznos": pice.mililitara};
    	   $scope.isEdit=true;    	   
       }
       mic.goBackToChoice = function(){
    	   $scope.emi = {};
    	   $scope.isEdit=false;    	   
       }
       mic.editMenuItem = function(){
    	   if($scope.emi.naziv=="" || $scope.emi.opis=="" || $scope.emi.cena=="" || $scope.emi.cena<=0 ||
    		$scope.emi.kolicina<=0 || $scope.emi.kolicina==""){
            	$scope.secretMessage="All data neccessery. Item not changed.";     
            	mic.showResponse();        		
       			return;
       		}
    	   var data = {
    			   "id": $scope.emi.id,
    			   "naziv": $scope.emi.naziv,
    			   "opis": $scope.emi.opis,
    			   "idRestorana": $scope.emi.idRestorana,
    			   "activ": true,
    			   "cena": $scope.emi.cena
    	   };
    	   var urlAdresa = 'rest/jelo/izmeni';
    	   if($scope.kol.naziv=="ml"){
    		   data.mililitara = $scope.kol.iznos;
        	   var urlAdresa = 'rest/pice/izmeni';
    	   }else{
    		   data.grama = $scope.kol.iznos;
    	   }
    	   $http({
               method: 'PUT',
               url: urlAdresa,
               data: data
             }).then(function successCallback(response) {
	               $scope.secretMessage="Menu Item changed succesfully";
	               mic.showResponseAndMove();
             }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Menu Item not changed.";     
	                mic.showResponse();
              });
       }
       mic.goBackToChoice = function(){
    	   $scope.emi = {};
    	   $scope.isEdit=false;  
    	   $scope.sviRestorani = [];
    		$http({
	            method: 'GET',
	            url: 'rest/restoran/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];
	        		  setOCategory(o);    		  	 
	        		  $scope.sviRestorani.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
       }
       mic.showResponse = function(){
       	$scope.showMessage=true;
       	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
       }
       mic.showResponseAndMove = function(){
         	$scope.showMessage=true;
         	$timeout(function() {
         		$scope.sviRestorani = [];
         		$http({
    	            method: 'GET',
    	            url: 'rest/restoran/svi'
    	          }).then(function successCallback(response) {
    	        	  for(var i=0; i<response.data.length; i++){
    	        		  var o = response.data[i];
    	        		  setOCategory(o);    		  	 
    	        		  $scope.sviRestorani.push(o);
    	        	  }
    	          }, function errorCallback(response) {
    	        	  
    	           });
  		    	  $scope.showMessage= false;
  		    	  $scope.isEdit=false;
	              $scope.emi={};
  		      }, 2000);   
         }
    }
})();