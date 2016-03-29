(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router','DDDApp.controllers']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state("home", {
                url: "",
                templateUrl: "js/views/home.html",
                controller: "StoreController"
            })
            .state("checkout", {
                url: "/checkout",
                templateUrl: "js/views/checkout.html",
                controller: "CartController"
            });
        $urlRouterProvider.otherwise('');
    });

    app.service('dataService', function($http) {
        var currentCart = [];
        this.getProducts = function(callback) {
            $http.get('products.json').then(callback);
        };
    });

}());
