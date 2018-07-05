(function () {
    'use strict';

    angular
		.module('app')
		.controller('vehicleController', vehicleController);

    vehicleController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function vehicleController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var vc = this;

        var init = function (){
        	$scope.showMessage = false;
        	$scope.secretMessage = "";
        	$scope.isEdit=false;
        	$scope.svaVozila = [];
        	$scope.basSvaVozila = [];
        	$scope.tipVozila = "BICIKL";
        	$scope.aveh = {};
        	$scope.eveh={};
	    	$http({
	            method: 'GET',
	            url: 'rest/vozilo/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];
	        		  setOTipVozila(o);    		  	 
	        		  $scope.svaVozila.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });

	    	$http({
	            method: 'GET',
	            url: 'rest/vozilo/svisvi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i]; 			
	        		  setOTipVozila(o);    		  	 
	        		  $scope.basSvaVozila.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        };        
        init();
       
        
        var setOTipVozila = function(o){
     	   if(o.tip=="BICIKL")
     		   o["tip"]= "bicycle";
     	   if(o.tip=="SKUTER")
     		   o["tip"]= "motor-bike";
     	   if(o.tip=="AUTO")
     		   o["tip"]= "car";
        }
        vc.addVozilo = function(){
        	if($scope.aveh.marka=="" || $scope.aveh.model=="" || $scope.aveh.registracionaOznaka=="" ||
        	$scope.aveh.godiste==""){
              	$scope.secretMessage="All data neccessery. Vehicle not added.";     
                vc.showResponse();   		
        		return;
        	}
        	var data = {
     			   "marka": $scope.aveh.marka,
     			   "model": $scope.aveh.model,
     			   "registracionaOznaka": $scope.aveh.registracionaOznaka,
     			   "godiste": $scope.aveh.godiste,
     			   "activ": true,
     			   "napomena": $scope.aveh.napomena,
     			   "tip": $scope.tipVozila,
     			   "id": -1,
     			   "uUpotrebi": false,
     			   "dostavljac": -1     			   
     	   };   
        	$http({
                method: 'POST',
                url: 'rest/vozilo/dodaj',
                data: data  
              }).then(function successCallback(response) {
	               $scope.secretMessage="Vehicle added succesfully";
	               vc.showResponse();
	               $scope.aveh={}
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Vehicle not added.";     
	                vc.showResponse();
               });
        	
        }
     
        vc.deleteVozilo = function(vozilo){
        	$http({
                method: 'DELETE',
                url: 'rest/vozilo/brisi/'+vozilo.id
              }).then(function successCallback(response) {
            	  for(var i=0; $scope.svaVozila.length; i++){
            		  if($scope.svaVozila[i].id==vozilo.id){
    					  scope.svaVozila[i].splice(i, 1);
    					  return;            			  
            		  }
            	  }
              }, function errorCallback(response) {
               });
        }
       vc.doEditingVozilo = function(vozilo){
    	   $scope.eveh = vozilo;
    	   $scope.eveh.tip = "BICIKL";
    	   if(vozilo.tip=="motor-bike")
        	   $scope.eveh.tip = "SKUTER";
    	   if(vozilo.tip=="car")
        	   $scope.eveh.tip = "AUTO";
    	   $scope.isEdit=true;    	   
       }
       vc.editVozilo = function(){
    	   if($scope.eveh.marka=="" || $scope.eveh.model=="" || $scope.eveh.registracionaOznaka=="" ||
        	$scope.eveh.godiste==""){
              	$scope.secretMessage="All data neccessery. Vehicle not cahnged.";     
                vc.showResponse();   		
        		return;
        	}
    	   var data = {
     			   "marka": $scope.eveh.marka,
     			   "model": $scope.eveh.model,
     			   "registracionaOznaka": $scope.eveh.registracionaOznaka,
     			   "godiste": $scope.eveh.godiste,
     			   "activ": true,
     			   "napomena": $scope.eveh.napomena,
     			   "tip": $scope.eveh.tipVozila,
     			   "id": $scope.eveh.id,
     			   "uUpotrebi": $scope.eveh.uUpotrebi,
     			   "dostavljac": $scope.eveh.dostavljac	   
     	   };
    	   $http({
               method: 'PUT',
               url:  'rest/vozilo/izmeni',
               data: data
             }).then(function successCallback(response) {
	               $scope.secretMessage="Vehicle changed succesfully";
	               vc.showResponseAndMove();
             }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Vehicle not changed.";     
	                vc.showResponse();
              });
       }
       vc.goBackToChoice = function(){
    	   $scope.eveh = {};
    	   $scope.isEdit=false;  
    	   $scope.svaVozila = [];
    		$http({
	            method: 'GET',
	            url: 'rest/vozilo/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];  	
	        		  setOTipVozila(o);    		  	 
	        		  $scope.svaVozila.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
       }
       vc.showResponse = function(){
       	$scope.showMessage=true;
       	$timeout(function() {
		    	  $scope.showMessage= false;
		      }, 3000);   
       }
       vc.showResponseAndMove = function(){
         	$scope.showMessage=true;
         	$timeout(function() {
         		$scope.svaVozila = [];
         		$http({
    	            method: 'GET',
    	            url: 'rest/vozilo/svi'
    	          }).then(function successCallback(response) {
    	        	  for(var i=0; i<response.data.length; i++){
    	        		  var o = response.data[i];
    	        		  setOTipVozila(o);    		  	 
    	        		  $scope.svaVozila.push(o);
    	        	  }
    	          }, function errorCallback(response) {
    	        	  
    	           });
  		    	  $scope.showMessage= false;
  		    	  $scope.isEdit=false;
	              $scope.eveh={};
  		      }, 2000);   
         }
    }
})();