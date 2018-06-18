(function () {
    'use strict';

    angular
		.module('app')
		.controller('restaurantController', restaurantController);

    restaurantController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies'];
    function restaurantController($scope, $location, $rootScope, $http, $cookies) {
        var rc = this;

        var init = function (){
        	
        	var user= $cookies.get('user');

        };        
        init();
       
    }
})();