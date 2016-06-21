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


	app.controller('CheckOutController', function($http, $state) {
		var cartItems = angular.fromJson(window.sessionStorage.checkout || '[]');
		var checkout = this;

		checkout.cart = cartItems;


		// Add products to basket
		checkout.addToCart = function(product) {
			var found = false;
			checkout.cart.products.forEach(function(item) {
				if (item.id === product.id) {
					item.quantity++;
					found = true;
				}
			});
			if (!found) {
				checkout.cart.products.push(angular.extend({ quantity: 1 }, product));
			}
		};

		//Remove product from basket
		checkout.removeFromCart = function(product, index) {
			var found = false;
			checkout.cart.products.forEach(function(item) {
				if (item.id === product.id) {
					item.quantity--;
					found = true;
					if (item.quantity === 0) {
						checkout.cart.products.splice(index, 1);
					}
				}
			});
			if (!found) {
				checkout.cart.products.splice(angular.extend({ quantity: -1 }, product));
			}
		};

		// Calculate total price for products in Cart
		checkout.getCartPrice = function() {
			var total = 0;
			checkout.cart.products.forEach(function(product) {
				total += product.price * product.quantity;
			});
			return total;
		};

		// Calculate total number of items in Cart
		checkout.getCartTotals = function() {
			var totalInCart = 0;

			checkout.cart.products.forEach(function(product) {
				totalInCart = parseInt(totalInCart) + product.quantity;
			});
			return totalInCart;
		};

		// Sends order via email
		checkout.submitOrder = function() {
			var checkOutCart = checkout.cart.products;

			var data = ({
				customerName: this.customerName,
				customerPhone: this.customerPhone,
				customerEmail: this.customerEmail,
				customerDelAddr: this.customerDelAddr,
				customerOrder: checkOutCart
			});

			$http.post('/checkout/sendOrder', data).success(function(data, status) {
				checkout.jsondata = data;
				console.log("status:" + status);
				$state.go('thankyou');
			}).error(function(data, status) {
				console.error('Error occurred:', data, status);
			});
		};
	}); // End Cart Controller

}());
