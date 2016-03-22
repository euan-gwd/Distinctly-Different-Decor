(function() {
    "use strict";
    var app = angular.module('DDDApp', []);

    app.controller('StoreController', function($scope, $http) {
        $scope.cart = [];
        var cartCount;

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
            cartCount = $scope.cart.length - 1;
        };

        //Remove product from basket
        $scope.removeFromCart = function(product, index) {
            var found = false;
            $scope.cart.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity--;
                    found = true;
                    if (item.quantity === 0) {
                        $scope.cart.splice(index, 1);
                    }
                }
            });
            if (!found) {
                $scope.cart.splice(index, angular.extend({ quantity: -1 }, product), 1);
            }
            cartCount = $scope.cart.length;
        };

        // Calculate total price for products in Cart
        $scope.getCartPrice = function() {
            var total = 0;
            $scope.cart.forEach(function(product) {
                total += product.price * product.quantity;
            });
            return total;
        };

        // Calculate total number of items in Cart
        $scope.getCartTotals = function() {
            var totalInCart = 0;

            cartCount = $scope.cart.length;
            $scope.cart.forEach(function(product) {
                totalInCart += cartCount * product.quantity;
            });

            return totalInCart;
        };
    });
}());