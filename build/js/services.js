(function() {
    'use strict';
    var app = angular.module('DDDApp.services', []);

    app.service('dataService', function($http) {
        var currentCart = [];
        this.getProducts = function(callback) {
            $http.get('products.json').then(callback);
        };
    });

    app.service('emailService', function($http) {
        var currentCart = [];
        this.getProducts = function(callback) {
            $http.get('products.json').then(callback);
        };
    });

}());
