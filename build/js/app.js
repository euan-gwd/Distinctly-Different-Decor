(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('StoreController', function() {
        var store = this;
        store.products = storeInventory;

        // Add item to basket
        store.basket = [];
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
            console.log(store.basket);
        };

        store.removeItem = function(product) {
            var found = false;

            store.basket.forEach(function(item) {
                if (item.id === product.id) {
                    item.quantity--;
                    found = true;
                    if (item.quantity === 0) {
                        found = false;
                    } 
                }
            });
            if (!found) {
                store.basket.splice(angular.extend({ quantity: 1 }, product));
            }
        };

        store.getCartPrice = function() {
            var total = 0;
            store.basket.forEach(function(product) {
                total += product.price * product.quantity;
            });
            return total;
        };

    });

    var storeInventory = [{
        id: 'prod1',
        name: 'one',
        desc: 'this is the 1st box in the store',
        image: 'http://placehold.it/330x150',
        price: '1',
        soldOut: false
    }, {
        id: 'prod2',
        name: 'two',
        desc: 'this is the 2nd box in the store',
        price: '2',
        image: 'http://placehold.it/330x150',
        soldOut: false
    }, {
        id: 'prod3',
        name: 'three',
        desc: 'this is the 3rd box in the store',
        price: '3',
        image: 'http://placehold.it/330x150',
        soldOut: false
    }, {
        id: 'prod4',
        name: 'four',
        desc: 'this is the 4th box in the store',
        price: '4',
        image: 'http://placehold.it/330x150',
        soldOut: false
    }];
}());
