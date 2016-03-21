(function() {
    "use strict";
    var app = angular.module('DDDApp', []);

    app.controller('StoreController', function($scope, $http) {
        $scope.cart = [];

        // Load products from server
        $http.get('products.json').success(function(response) {
            $scope.products = response.products;
        });

        // Add products to basket
        $scope.addToCart = function(product) {
            var found = false;
            $scope.cart.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                $scope.cart.push(angular.extend({ quantity: 1 }, product));
            }
        };

        //Remove product from basket
        $scope.removeFromCart = function(product, index) {
            $scope.cart.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity--;
                    if (item.quantity === 0) {
                        $scope.cart.splice(index, 1);
                    }
                }
            });

        };

        // Calculate totals in basket
        $scope.getCartPrice = function() {
            var total = 0;
            $scope.cart.forEach(function(product) {
                total += product.price * product.quantity;
            });
            return total;
        };

    });
}());