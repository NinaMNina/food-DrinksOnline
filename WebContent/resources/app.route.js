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
        })
        .state('core.addMenuItem', {
            url: 'addMenuItem',
            templateUrl: 'resources/pages/menuItem/addMenuItem.html',
            controller: 'menuItemController',
            controllerAs: 'mic'
        })
        .state('core.delMenuItem', {
            url: 'delMenuItem',
            templateUrl: 'resources/pages/menuItem/delMenuItem.html',
            controller: 'menuItemController',
            controllerAs: 'mic'
        })
        .state('core.editMenuItem', {
            url: 'editMenuItem',
            templateUrl: 'resources/pages/menuItem/editMenuItem.html',
            controller: 'menuItemController',
            controllerAs: 'mic'
        })
        .state('core.addVehicle', {
            url: 'addVehicle',
            templateUrl: 'resources/pages/vehicle/addVehicle.html',
            controller: 'vehicleController',
            controllerAs: 'vc'
        })
        .state('core.editVehicle', {
            url: 'editVehicle',
            templateUrl: 'resources/pages/vehicle/editVehicle.html',
            controller: 'vehicleController',
            controllerAs: 'vc'
        })
        .state('core.delVehicle', {
            url: 'delVehicle',
            templateUrl: 'resources/pages/vehicle/delVehicle.html',
            controller: 'vehicleController',
            controllerAs: 'vc'
        })
        .state('core.changeType', {
            url: 'changeType',
            templateUrl: 'resources/pages/changeType/changeType.html',
            controller: 'changeTypeController',
            controllerAs: 'ctc'
        })
        .state('core.byCathegory', {
            url: 'byCathegory',
            templateUrl: 'resources/pages/byCathegory/byCathegory.html',
            controller: 'byCathegoryController',
            controllerAs: 'bcc'
        })
        .state('core.confirmFinalOrder', {
            url: 'confirmFinalOrder',
            templateUrl: 'resources/pages/confirmFinalOrder/confirmFinalOrder.html',
            controller: 'confirmFinalOrderController',
            controllerAs: 'cfc'
        })
        .state('core.favourite', {
            url: 'favourite',
            templateUrl: 'resources/pages/favourite/favourite.html',
            controller: 'favouriteController',
            controllerAs: 'favc'
        })
        .state('core.myOrders', {
            url: 'myOrders',
            templateUrl: 'resources/pages/myOrders/myOrders.html',
            controller: 'myOrdersController',
            controllerAs: 'moc'
        });


    }]);


})();
