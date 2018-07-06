(function () {
    'use strict';

    angular
		.module('app')
		.controller('confirmFinalOrderController', confirmFinalOrderController);

    confirmFinalOrderController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function confirmFinalOrderController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var cfc = this;

        var init = function (){   
        	if($rootScope.narudzbina==undefined || $rootScope.narudzbina==null || $rootScope.narudzbina==""){
        		$location.path('/home');
        		return;
        	}
        	$scope.showMessage = false;
        	$scope.secretMessage="";
        	$scope.cena = 0;
        	for(var i=0; i<$rootScope.narudzbina.rest.jela.length; i++){
        		$scope.cena = $scope.cena + $rootScope.narudzbina.rest.jela[i].kolicina * $rootScope.narudzbina.rest.jela[i].cena;
        	}
        	for(var i=0; i<$rootScope.narudzbina.rest.pica.length; i++){
        		$scope.cena = $scope.cena + $rootScope.narudzbina.rest.pica[i].kolicina * $rootScope.narudzbina.rest.pica[i].cena;
        	}
        };        
        init();
        cfc.confirm = function(){
        	var data = {};
        	data = {
        			"id": -1,
        			"korisnik": $rootScope.narudzbina.prima.username,
        			"idRestorana": $rootScope.narudzbina.rest.id,
        			"nazivRestorana":$rootScope.narudzbina.rest.naziv,
        			"napomena":$rootScope.narudzbina.napomena,
        			"vreme": new Date(),
        			"status": "PORUCENO",
        			"dostavljac": -1,
        			"stavke": [],
        			"activ": true,
        			"cena": $scope.cena
        	};
        	for(var i=0; i<$rootScope.narudzbina.rest.jela.length; i++){
        		if($rootScope.narudzbina.rest.jela[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$rootScope.narudzbina.rest.jela[i].id,
        				"naziv":$rootScope.narudzbina.rest.jela[i].naziv,
        				"kolicina":$rootScope.narudzbina.rest.jela[i].kolicina        			
        			});
        			
        		}
        	}
        	for(var i=0; i<$rootScope.narudzbina.rest.pica.length; i++){
        		if($rootScope.narudzbina.rest.pica[i].kolicina>0){
        			data.stavke.push({
        				"idArtikla":$rootScope.narudzbina.rest.pica[i].id,
        				"naziv":$rootScope.narudzbina.rest.pica[i].naziv,
        				"kolicina":$rootScope.narudzbina.rest.pica[i].kolicina        			
        			});
        			
        		}
        	}
        	
        	$http({
                method: 'POST',
                url: 'rest/porudzbina/dodaj',
                data: data
              }).then(function successCallback(response) {
	               $scope.secretMessage="Your order is sent succesfully";
	                cfc.showResponse();
              }, function errorCallback(response) {
	              	$scope.secretMessage="Something went wrong. Your order is not sent";     
	                cfc.showResponse();
               });
        }
        cfc.showResponse = function(){
           	$scope.showMessage=true;
           	$timeout(function() {
    		    	  $scope.showMessage= false;
    		    	  if($scope.secretMessage=="Your order is sent succesfully"){
    		    		  $location.path('/myOrders');
    		               $rootScope.narudzbina = {};
    		    	  }
    		      }, 3000);   
           }
        
       
    }
})();