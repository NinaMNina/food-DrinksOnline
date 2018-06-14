(function () {
    'use strict';

    angular
		.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

      $urlRouterProvider.otherwise("/home");

      $stateProvider
        .state('core', {
            url: '/',
            templateUrl: 'resources/pages/core/core.html',
            controller: 'coreController',
            controllerAs: 'cc'
        })
        .state('core.home', {
            url: 'home',
            templateUrl: 'resources/pages/home/home.html',
            controller: 'homeController',
            controllerAs: 'hc'
        })
        .state('core.createAccount', {
            url: 'createAccount',
            templateUrl: 'resources/pages/createAccount/createAccount.html',
            controller: 'createAccountController',
            controllerAs: 'cac'
        });


    }]);


})();
