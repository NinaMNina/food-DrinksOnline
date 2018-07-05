(function () {
    'use strict';

    angular
		.module('app')
		.controller('changeTypeController', changeTypeController);

    changeTypeController.$inject = ['$scope', '$location', '$rootScope', '$http', '$cookies', '$timeout'];
    function changeTypeController($scope, $location, $rootScope, $http, $cookies, $timeout) {
        var ctc = this;

        var init = function (){   
        	$scope.showMessage = false;
        	$scope.secretMessage = "";   
        	
        	var tryUser = $cookies.get('user');
        	if(tryUser!=undefined){
        		var user = JSON.parse(tryUser);
        		$rootScope.logged = true;
        		$scope.loggedAdmin = user.username;
        	}
        	$scope.users = [];
        	$http({
	            method: 'GET',
	            url: 'rest/korisnik/svi'
	          }).then(function successCallback(response) {
	        	  for(var i=0; i<response.data.length; i++){
	        		  var o = response.data[i];	 
	        		  setCorectDateFormat(o);
	        		  $scope.users.push(o);
	        	  }
	          }, function errorCallback(response) {
	        	  
	           });
        };        
        init();
        var setCorectDateFormat = function(o){
        	var date = new Date(o.datumRegistracije);
			var day = date.getDate();
			day = day = (day < 10) ? ("0" + day) : day;
			var month = date.getMonth() + 1;
			month = (month < 10) ? ("0" + month) : month;
        	o.datumRegistracije = (day + "/" + month + "/" + date.getFullYear());
        }
        ctc.changeToReg = function(u){
        	$http({
                method: 'PUT',
                url: 'rest/korisnik/reg/'+u.username
              }).then(function successCallback(response) {
 	               $scope.secretMessage="User status changed succesfully";
 	              ctc.showResponse();
              }, function errorCallback(response) {
 	              	$scope.secretMessage="Something went wrong. User type not changed.";     
 	                ctc.showResponse();
               });
        }
        ctc.changeToDost = function(u){
        	$http({
                method: 'PUT',
                url: 'rest/korisnik/dost/'+u.username
              }).then(function successCallback(response) {
 	               $scope.secretMessage="User status changed succesfully";
 	              ctc.showResponse();
              }, function errorCallback(response) {
 	              	$scope.secretMessage="Something went wrong. User type not changed.";     
 	                ctc.showResponse();
               });
        }
        ctc.changeToAdmin = function(u){
        	$http({
                method: 'PUT',
                url: 'rest/korisnik/admin/'+u.username
              }).then(function successCallback(response) {
 	               $scope.secretMessage="User status changed succesfully";
 	              ctc.showResponse();
              }, function errorCallback(response) {
 	              	$scope.secretMessage="Something went wrong. User type not changed.";     
 	                ctc.showResponse();
               });
        }
        ctc.showResponse = function(){
           	$scope.showMessage=true;
           	$timeout(function() {
    		    	  $scope.showMessage= false;
    		      }, 3000);   
           }
        
       
    }
})();