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
        	if(tryUser!=undefined){
        		var user = JSON.parse(tryUser);
        		$rootScope.logged = true;	
        	}


        	$rootScope.isAdmin = false;
        	$rootScope.showMenu = true;
        	$scope.isHome = true;
        
        	$scope.isFavorite = false;
        	$scope.isProfile = false;
        	$scope.isOrders = false;
        //admin deo
        	$scope.rest = {};
        	$scope.item = {};
        	$scope.vehicle = {};
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
        	$scope.users.change=false;
        	
        	if(user==undefined){
	        	$rootScope.isAdmin = false;  
	        	$rootScope.logged = false;
        	}
        	else if(user.uloga=="ADMIN"){
	        	$rootScope.isAdmin = true;
	        	$rootScope.showMenu = false;
	        	$rootScope.isHome = false;
	        	$rootScope.addRest=true;
	        	$location.path('/addRestaurant');	        	
        	}
        };        
        init();
        
        cc.goHome = function(){
        	if($scope.isHome == true ){
        		return;
        	}
        	$scope.isHome = true;
        	$scope.isFavorite = false;
        	$scope.isProfile = false;
        	$scope.isOrders = false;
        	$location.path('/home');
        }
        cc.goFavorite = function(){
        	if($scope.isFavorite == true ){
        		return;
        	}
        	$scope.isHome = false;
        	$scope.isFavorite = true;
        	$scope.isProfile = false;
        	$scope.isOrders = false;
        	$location.path('/favorite');
        }
        cc.goOrders = function(){
        	if($scope.isOrders == true ){
        		return;
        	}
        	$scope.isHome = false;
        	$scope.isFavorite = false;
        	$scope.isProfile = false;
        	$scope.isOrders = true;
        	$location.path('/orders');
        }
        cc.goProfile = function(){
        	if($scope.isProfile == true ){
        		return;
        	}
        	$scope.isHome = false;
        	$scope.isFavorite = false;
        	$scope.isProfile = true;
        	$scope.isOrders = false;
        	$location.path('/profile');
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
        	$location.path('/deleteRestaurant');
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
        	$location.path('/addItem');
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
        	$location.path('/editItem');
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
        	$location.path('/deleteItem');
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
        	$location.path('/deleteVehicle');
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
        	$location.path('/changeType');
        }
        cc.signUp = function(){
        	$rootScope.showMenu = false;
        	$location.path('/createAccount');
        	
        }
        cc.signIn = function(){
        	$rootScope.showMenu = false;
        	$location.path('/signIn');
        	
        }
        cc.logOut = function(){
        	$cookies.remove('user');
        	$rootScope.isAdmin = false;
        	$rootScope.showMenu = true;
        	$rootScope.isHome = false;
        	$rootScope.logged = false;
        	$location.path('/home');
        	
        }
    }
})();