(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$location', '$rootScope'];
    function homeController(scope, $location, $rootScope) {
        var cc = this;

        var init = function (){
        	
        };        
        init();
        

    }
})();