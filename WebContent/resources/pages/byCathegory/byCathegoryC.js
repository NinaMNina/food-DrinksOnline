(function () {
    'use strict';

    angular
		.module('app')
		.controller('byCathegoryController', byCathegoryController);

    byCathegoryController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function byCathegoryController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var bcc = this;

        var init = function (){   
        	if($rootScope.foodType==undefined || $rootScope.foodType==null || $rootScope.foodType==""){
        		$location.path('/home');
        		return;
        	}
        	$scope.user = {};
        	$scope.rest = {};
        	$scope.isCath = true;
        	$scope.restorani = [];
        	$scope.napomena = "";
        	$scope.cath = "HOME-MADE FOOD";
        	if($rootScope.foodType=="bbq")
        		$scope.cath = "BARBIQUE";
        	else if($rootScope.foodType=="b")
        		$scope.cath = "BAKERY";
        	else if($rootScope.foodType=="p")
        		$scope.cath = "PIZZA";
        	else if($rootScope.foodType=="i")
        		$scope.cath = "INDIAN FOOD";
        	else if($rootScope.foodType=="c")
        		$scope.cath = "CHINESE FOOD";
        	$http({
	            method: 'GET',
	            url: 'rest/restoran/'+$rootScope.foodType
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];	
	        		  $scope.restorani.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        	var tryUser = $cookies.get('user');
        	var user = JSON.parse(tryUser);
        	$http({
	            method: 'GET',
	            url: 'rest/korisnik/'+user.username
	          }).then(function successCallback(response) {
	          		$scope.user = response.data;
	          }, function errorCallback(response) {
	        	  
	           });
        };        
        init();
        bcc.showRestaurantsMenu = function(r){
        	$scope.rest = r;
        	$scope.isCath = false;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
        bcc.makeOrder = function(){
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
        bcc.addToFavs = function(id){
        	$http({
	            method: 'PUT',
	            url: 'rest/korisnik/'+$scope.user.username+'/'+id
	          }).then(function successCallback(response) {
	        	  $scope.user.omiljeno.push(id);
	          }, function errorCallback(response) {
	        	  
	           });
        }
        bcc.showResponse = function(){
           	$scope.showMessage=true;
           	$timeout(function() {
    		    	  $scope.showMessage= false;
    		      }, 3000);   
           }
        
       
    }
})();