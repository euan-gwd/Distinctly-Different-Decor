(function() {
    'use strict';
    var app = angular.module('DDDApp.services', []);

    app.service('dataService', function($http) {
        var currentCart = [];
        this.getProducts = function(callback) {
            $http.get('js/data/products.json').then(callback);
        };
    });

}());
