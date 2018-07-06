(function () {
    'use strict';

    angular
		.module('app')
		.controller('favouriteController', favouriteController);

    favouriteController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function favouriteController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var favc = this;

        var init = function (){   
        	$scope.user = {};
        	$scope.rest = {};
        	$scope.restorani = [];
        	$scope.napomena = "";
        	$scope.isFav = true;
        	var tryUser = $cookies.get('user');
        	var user = JSON.parse(tryUser);
        	$http({
	            method: 'GET',
	            url: 'rest/restoran/omiljeno/'+user.username
	          }).then(function successCallback(response) {
	          		$scope.restorani = response.data;
	          }, function errorCallback(response) {
	        	  
	           });
        	
        };        
        init();
        
        favc.minus = function(jelo){
        	if(jelo.kolicina==0)
        		return;
        	jelo.kolicina=jelo.kolicina-1;
        }
        favc.plus = function(jelo){
        	jelo.kolicina=jelo.kolicina+1;
        }
        
        favc.goBack = function(){
        	$scope.rest = {};
        	$scope.isFav = true;
        	
        }
        favc.showRestaurantsMenu = function(r){
        	$scope.rest = r;
        	$scope.isFav = false;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
        favc.makeOrder = function(){
        	$rootScope.narudzbina = {};
        	$rootScope.narudzbina.rest=$scope.rest;
        	$rootScope.narudzbina.napomena = $scope.napomena;
        	var tryUser = $cookies.get('user');
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
        
        favc.showResponse = function(){
           	$scope.showMessage=true;
           	$timeout(function() {
    		    	  $scope.showMessage= false;
    		      }, 3000);   
           }
        
       
    }
})();