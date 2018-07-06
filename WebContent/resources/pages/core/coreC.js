(function () {
    'use strict';

    angular
		.module('app')
		.controller('coreController', coreController);

    coreController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies'];
    function coreController($scope, $location, $rootScope, $http, $cookies) {
        var cc = this;

        var init = function (){      
        	$rootScope.logged = false;	
        	var tryUser = $cookies.get('user');
        	var user = {};
        	if(tryUser!=undefined){
        		user = JSON.parse(tryUser);
        		$rootScope.logged = true;        		
        	}
        	$rootScope.search={};
        	$rootScope.search.restorani=true;
        	$rootScope.currentDelivery = {};
        	$rootScope.showDostMenu = false;

        	$rootScope.showAdminMenu = false;
        	$rootScope.showUserMenu = true;
        	$rootScope.showSideMenu = true;
        	$rootScope.hasDelivery = false;
        	$scope.isHome = true;
        
        	$scope.isFavorite = false;
        	$scope.isOrders = false;
        	$scope.isGetDelivery = true;
        	$scope.isMyDeliveries = false;
        //admin deo
        	$scope.rest = {};
        	$scope.item = {};
        	$scope.vehicle = {};
        	$scope.order = {};
        	$scope.users = {};
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$scope.users.change=false;
        	$rootScope.showUserMenu = false;  
        	
        	if(user.uloga=="REG"){
	        	$rootScope.showAdminMenu = false;  
	        	$rootScope.showSideMenu = true;
	        	$rootScope.showDostMenu = false;
	        	$rootScope.showUserMenu = true;      
	        	$rootScope.logged = true;
	        	return;
        	}
        	else if(user.uloga=="ADMIN"){
	        	$rootScope.showAdminMenu = true;
	        	$rootScope.showUserMenu = false;
	        	$rootScope.isHome = false;
	        	$rootScope.addRest=true;
	        	$scope.isGetDelivery =true;
	        	$rootScope.showSideMenu = false;
	        	$location.path('/addRestaurant');	        	
        	}
        	else if(user.uloga=="DOST"){
	        	$rootScope.showAdminMenu = false;
	        	$rootScope.showUserMenu = false;
	        	$rootScope.isHome = false;
	        	$rootScope.addRest=false;
	        	$rootScope.showDostMenu=true;
	        	$rootScope.showSideMenu = false;
	        	$location.path('/getDelivery');
	        	$http({
		            method: 'GET',
		            url: 'rest/korisnik/dostavlja/'+user.username
		          }).then(function successCallback(response) {
		        	  if(response.data!=null || response.data!=""){
			        	  	var r = response.data;
			        	  	$scope.porudzbina = response.data;
			          		$scope.currentDelivery = response.data;	 
			            	$rootScope.hasDelivery = true;       		  
		        	  }
		        	  else{
		        		  $scope.porudzbina = {};
		        		  $scope.onDelivery = "";
		              	$rootScope.hasDelivery = false;
		        	  }
		          }, function errorCallback(response) {
		        	  
		           });
        	}
        };        
        init();
        
        cc.didMyDelivery = function(){
        	var tryUser = $cookies.get('user');
        	if(tryUser!=undefined){
        		tryUser = JSON.parse(tryUser); 		
        	}
        	else{
        		return;
        	}
        	$http({
	            method: 'PUT',
	            url: 'rest/porudzbina/done/'+$scope.porudzbina.id
	          }).then(function successCallback(response) {
	          		$scope.currentDelivery = {};	 
	            	$rootScope.hasDelivery = false;    
	          }, function errorCallback(response) {
	        	  
	           });
        }
        cc.doSearch = function(){
        	$location.path('/search');	 
        }
        cc.goGetDelivery = function(){
        	if($scope.isGetDelivery==true)
        		return;
        	$location.path('/getDelivery');	 
        	$scope.isGetDelivery =true;   
        	$scope.isMyDeliveries = false;
        }
        cc.goMyDeliveries = function(){
        	if($scope.isMyDeliveries ==true)
        		return;
        	$location.path('/myDeliveries');	 
        	$scope.isGetDelivery =false;          	 
        	$scope.isMyDeliveries = true;
        }
        cc.goHome = function(){
        	$location.path('/home');
        	if($scope.isHome == true ){
        		return;
        	}
        	$scope.isHome = true;
        	$scope.isFavorite = false;
        	$scope.isOrders = false;
        }
        cc.goFavorite = function(){
        	if($scope.isFavorite == true ){
        		return;
        	}
        	$scope.isHome = false;
        	$scope.isFavorite = true;
        	$scope.isOrders = false;
        	$location.path('/favourite');
        }
        cc.goOrders = function(){
        	if($scope.isOrders == true ){
        		return;
        	}
        	$scope.isHome = false;
        	$scope.isFavorite = false;
        	$scope.isOrders = true;
        	$location.path('/myOrders');
        }
        
        cc.addRest = function(){
        	if($rootScope.addRest == true ){
        		return;
        	}
        	$rootScope.addRest=true;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/addRestaurant');
        }
        cc.editRest = function(){
        	if($scope.rest.edit == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=true;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/editRestaurant');
        }
        cc.delRest = function(){
        	if($scope.rest.del == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=true;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/delRestaurant');
        }
        cc.addItem = function(){
        	if($scope.item.add == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=true;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/addMenuItem');
        }
        cc.editItem = function(){
        	if($scope.item.edit == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=true;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/editMenuItem');
        }
        cc.delItem = function(){
        	if($scope.item.del == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=true;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/delMenuItem');
        }
        cc.addOrder = function(){
        	if($scope.order.add == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=true;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/addOrder');
        }
        cc.editOrder = function(){
        	if($scope.order.edit == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=true;
        	$scope.order.del=false;
        	$location.path('/editOrder');
        }
        cc.delOrder = function(){
        	if($scope.order.del == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=true;
        	$location.path('/delOrder');
        }
        cc.addVehicle = function(){
        	if($scope.vehicle.add == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=true;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/addVehicle');
        }
        cc.editVehicle = function(){
        	if($scope.vehicle.edit == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=true;
        	$scope.vehicle.del=false;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/editVehicle');
        }
        cc.delVehicle = function(){
        	if($scope.vehicle.del == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=true;
        	$scope.users.change=false;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/delVehicle');
        }
        cc.changeType = function(){
        	if($scope.users.change == true ){
        		return;
        	}
        	$rootScope.addRest=false;
        	$scope.rest.edit=false;
        	$scope.rest.del=false;
        	$scope.item.add=false;
        	$scope.item.edit=false;
        	$scope.item.del=false;
        	$scope.vehicle.add=false;
        	$scope.vehicle.edit=false;
        	$scope.vehicle.del=false;
        	$scope.users.change=true;
        	$scope.order.add=false;
        	$scope.order.edit=false;
        	$scope.order.del=false;
        	$location.path('/changeType');
        }
        cc.signUp = function(){
        	$rootScope.showUserMenu = false;
        	$location.path('/createAccount');
        	
        }
        cc.signIn = function(){
        	$rootScope.showUserMenu = false;
        	$rootScope.showSideMenu = false;
        	$location.path('/signIn');
        	
        }
        cc.logOut = function(){
        	$cookies.remove('user');
        	$rootScope.showAdminMenu = false;
        	$rootScope.showUserMenu = true;
        	$rootScope.showDostMenu = false;
        	$rootScope.isHome = false;
        	$rootScope.logged = false;
        	$location.path('/home');
        	
        }
        cc.showFoodHomeMade = function(){
        	$rootScope.foodType = "hm";
        	$location.path('/byCathegory');
        }
        cc.showFoodBarbique= function(){
        	$rootScope.foodType = "bbq";
        	$location.path('/byCathegory');
        }
        
        cc.showFoodPizza= function(){
        	$rootScope.foodType = "p";
        	$location.path('/byCathegory');
        }
        
        cc.showFoodBakery= function(){
        	$rootScope.foodType = "b";
        	$location.path('/byCathegory');
        }
        
        cc.showFoodChinese= function(){
        	$rootScope.foodType = "c";
        	$location.path('/byCathegory');
        }
        
        cc.showFoodIndian= function(){
        	$rootScope.foodType = "i";
        	$location.path('/byCathegory');
        }
    }
})();