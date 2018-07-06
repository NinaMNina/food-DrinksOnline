(function () {
    'use strict';

    angular
		.module('app')
		.controller('getDeliveryController', getDeliveryController);

    getDeliveryController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function getDeliveryController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var gdc = this;

        var init = function (){  
        	var tryUser = $cookies.get('user');
        	$scope.user = JSON.parse(tryUser);
        	$scope.porudzbine = [];
        	$scope.hasDelivery = false;
        	$http({
	            method: 'GET',
	            url: 'rest/korisnik/dostavlja/'+$scope.user.username
	          }).then(function successCallback(response) {
	        	  if(response.data!=null || response.data!=""){
	              	$scope.hasDelivery = true;        		  
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        	$http({
	            method: 'GET',
	            url: 'rest/porudzbina/zaDostavu'
	          }).then(function successCallback(response) {
	        	  $scope.porudzbine = response.data;	        	  
	          }, function errorCallback(response) {
	        	  
	           });
        	
        };        
        init();
        gdc.takeDelivery = function(n){
        	$http({
	            method: 'PUT',
	            url: 'rest/porudzbina/take/'+n.id+'/by/'+$scope.user.username
	          }).then(function successCallback(response) {
	        	  $scope.hasDelivery = true;
	        	  for(var i=0; i<$scope.porudzbine.length; i++){
	        		  if($scope.porudzbine[i]==response.data.id)
	        			  $scope.porudzbine.splice(i, 1);
	        		  	  $location.path('myDeliveries');
	        	  }
	        	  
	          }, function errorCallback(response) {
	        	  
	           });
        }
        gdc.showRestaurantsMenu = function(r){
        	$scope.rest = r;
        	$scope.isFav = false;
        	for(var i=0; i<$scope.rest.jela.length; i++){
        		$scope.rest.jela[i].kolicina = 0;
        	}
        	for(var i=0; i<$scope.rest.pica.length; i++){
        		$scope.rest.pica[i].kolicina = 0;
        	}
        }
      
       
    }
})();