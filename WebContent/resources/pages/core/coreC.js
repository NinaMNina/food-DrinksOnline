(function () {
    'use strict';

    angular
		.module('app')
		.controller('coreController', coreController);

    coreController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies'];
    function coreController($scope, $location, $rootScope, $http, $cookies) {
        var cc = this;

        var init = function (){
        	$rootScope.showMenu = true;
        	$scope.isHome = true;
        	$scope.isFavorite = false;
        	$scope.isProfile = false;
        	$scope.isOrders = false;
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
        
        cc.signUp = function(){
        	$rootScope.showMenu = false;
        	$location.path('/createAccount');
        	
        }
        cc.signIn = function(){
        	$rootScope.showMenu = false;
        	$location.path('/signIn');
        	
        }
    }
})();