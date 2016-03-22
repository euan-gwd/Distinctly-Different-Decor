(function() {
    "use strict";
    var app = angular.module('DDDApp', []);

    app.controller('StoreController', function($scope, $http) {
        $scope.cart = {
            products: []
        };

        // Load products from server
        $http.get('products.json').success(function(response) {
            $scope.products = response.products;
        });

        // Add products to basket
        $scope.addToCart = function(product) {
            var found = false;
            $scope.cart.products.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                $scope.cart.products.push(angular.extend({ quantity: 1 }, product));
            }
        };

        //Remove product from basket
        $scope.removeFromCart = function(product, index) {
            var found = false;
            $scope.cart.products.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity--;
                    found = true;
                    if (item.quantity == 0) {
                        $scope.cart.products.splice(index, 1);
                    }
                }
            });
            if (!found) {
                $scope.cart.products.splice(angular.extend({ quantity: -1 }, product));
            }
        };

        // Calculate total price for products in Cart
        $scope.getCartPrice = function() {
            var total = 0;
            $scope.cart.products.forEach(function(product) {
                total += product.price * product.quantity;
            });
            return total;
        };

        // Calculate total number of items in Cart
        $scope.getCartTotals = function() {
            var totalInCart = 0;

            $scope.cart.products.forEach(function(product) {
                totalInCart = parseInt(totalInCart) + product.quantity;
            });
            return totalInCart;
        };
    });
}());