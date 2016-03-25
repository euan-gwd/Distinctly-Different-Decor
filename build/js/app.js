(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

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

    app.controller('StoreController', function($scope, $state, dataService) {
        $scope.cart = {
            products: []
        };
        // Load products from server
        dataService.getProducts(function(response) {
            $scope.products = response.data;
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
                    if (item.quantity === 0) {
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

        // Cart Checkout
        $scope.cartCheckOut = function() {
            var checkout = $scope.cart;
            window.sessionStorage.checkout = angular.toJson(checkout);
            $state.go('checkout');
        };
    });

    app.controller('CartController', function($scope, $state) {
        var cartItems = angular.fromJson(window.sessionStorage.checkout || '[]');
        $scope.cart = cartItems;

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
                    if (item.quantity === 0) {
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
