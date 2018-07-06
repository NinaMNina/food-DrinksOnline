(function () {
    'use strict';

    angular
		.module('app')
		.controller('homeController', homeController);

    homeController.$inject = ['$scope', '$location', '$rootScope', '$cookies'];
    function homeController(scope, $location, $rootScope, $cookies) {
        var cc = this;

        var init = function (){
        	$rootScope.logged = false;	
        	var tryUser = $cookies.get('user');
        	if(tryUser!=undefined){
        		var user = JSON.parse(tryUser);
        		$rootScope.logged = true;       		
        	}
        };        
        init();
        

    }
})();