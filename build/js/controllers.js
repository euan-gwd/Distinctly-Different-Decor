(function() {
  'use strict';
  var app = angular.module('DDDApp.controllers', []);

  app.controller('StoreController', function($scope, $state, dataService) {
    $scope.cart = {
      products: []
    };
    // Load products from server
    dataService.getProducts(function(res) {
      $scope.products = res.data;
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
  }); // End Store Controller


  app.controller('CartController', function($scope, $http, $state) {
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

    // Sends order via email
    $scope.submitOrder = function() {
      
      var checkoutCart = cartItems;

      var data = ({
        customerName: this.customerName,
        customerPhone: this.customerPhone,
        customerEmail: this.customerEmail,
        customerDelAdd: this.customerDelAdd,
        customerCart: this.checkoutCart
      });

      $http.post('/checkout/sendOrder', data).then(function(res){
                console.log(res);
            });

    };
  });

}());
