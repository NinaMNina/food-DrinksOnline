﻿(function () {
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
        })
        .state('core.signIn', {
            url: 'signIn',
            templateUrl: 'resources/pages/signIn/signIn.html',
            controller: 'signInController',
            controllerAs: 'sc'
        })
        .state('core.addRestaurant', {
            url: 'addRestaurant',
            templateUrl: 'resources/pages/restaurant/addRestaurant.html',
            controller: 'restaurantController',
            controllerAs: 'rc'
        })
        .state('core.editRestaurant', {
            url: 'editRestaurant',
            templateUrl: 'resources/pages/restaurant/editRestaurant.html',
            controller: 'restaurantController',
            controllerAs: 'rc'
        })
        .state('core.delRestaurant', {
            url: 'delRestaurant',
            templateUrl: 'resources/pages/restaurant/delRestaurant.html',
            controller: 'restaurantController',
            controllerAs: 'rc'
        });


    }]);


})();
