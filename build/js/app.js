(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('StoreController', function() {
        var store = this;
        store.products = storeInventory;
        store.basket = [];
        // Add item to basket
        store.addItem = function(product) {
            var found = false;
            store.basket.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity++;
                    found = true;
                }
            });
            if (!found) {
                store.basket.push(angular.extend({ quantity: 1 }, product));
            }
        };
        // Remove item from basket
        store.removeItem = function(product) {
            var found = false;

            store.basket.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity--;
                    found = true;
                    if (item.quantity === 0) {
                        return;
                    }
                }

            });
            if (!found) {
                store.basket.splice(angular.extend({ quantity: 1 }, product));
            }
        };
        // Calculate totals in basket
        store.getCartPrice = function() {
            var total = 0;

            store.basket.forEach(function(product) {
                total += product.price * product.quantity;
            });
            return total;
        };

    });

    var storeInventory = [{
        "id": 1,
        "title": 'Product One',
        "desc": 'this is the 1st box in the store',
        "image": 'http://placehold.it/330x150',
        "price": 1
    }, {
        "id": 2,
        "title": 'Product Two',
        "desc": 'this is the 2nd box in the store',
        "image": 'http://placehold.it/330x150',
        "price": 2
    }, {
        "id": 3,
        "title": 'Product Three',
        "desc": 'this is the 3rd box in the store',
        "image": 'http://placehold.it/330x150',
        "price": 3
    }, {
        "id": 4,
        "title": 'Product Four',
        "desc": 'this is the 4th box in the store',
        "image": 'http://placehold.it/330x150',
        "price": 4
    }];
}());