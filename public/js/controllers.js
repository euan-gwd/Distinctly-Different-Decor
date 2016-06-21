(function() {
	'use strict';
	var app = angular.module('DDDApp.controllers', []);

	app.controller('StoreController', function($state, dataService) {
		var store = this;

		store.cart = {
			products: []
		};
		// Load products from server
		dataService.getProducts(function(res) {
			store.products = res.data;
		});

		// Sorts Items
		store.sortGlass = function() {
			store.productSearch = "glass";
		};

		store.sortPaper = function() {
			store.productSearch = "paper";
		};

		store.sortAll = function() {
			store.productSearch = "";
		};

		// Add products to basket
		store.addToCart = function(product) {
			store.cart.products.push(angular.extend({ quantity: 1 }, product));
		};

		// Calculate total price for products in Cart
		store.getCartPrice = function() {
			var total = 0;
			store.cart.products.forEach(function(product) {
				total += product.price * product.quantity;
			});
			return total;
		};

		// Calculate total number of items in Cart
		store.getCartTotals = function() {
			var totalInCart = 0;

			store.cart.products.forEach(function(product) {
				totalInCart = parseInt(totalInCart) + product.quantity;
			});
			return totalInCart;
		};

		// Cart Checkout
		store.cartCheckOut = function() {
			var checkout = store.cart;
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
			var checkoutCart = $scope.cart.products;

			var data = ({
				customerName: this.customerName,
				customerPhone: this.customerPhone,
				customerEmail: this.customerEmail,
				customerDelAddr: this.customerDelAddr,
				customerOrder: checkoutCart
			});

			$http.post('/checkout/sendOrder', data).success(function(data, status) {
				$scope.jsondata = data;
				console.log("status:" + status);
				$state.go('thankyou');
			}).error(function(data, status) {
				console.error('Error occurred:', data, status);
			});
		};
	}); // End Cart Controller

}());
