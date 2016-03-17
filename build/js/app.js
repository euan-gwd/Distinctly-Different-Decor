(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('StoreController', function() {
        var store = this;
        store.products = storeInventory;
        store.basket = [];

        // Updates the counter badge on the shopping cart when add to cart button is clicked 
        store.cartCount = 0;
        store.countAdd = function(inc) {
            store.cartCount += inc;
        };

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
            console.log(store.basket);
        };

        // Drop an item from the basket
        store.dropItem = function(index) {
            store.basket.splice(index, 1);
        };

        // Get the running total of the basket
        store.getOrderTotal = function() {
            var total = 0;
            angular.forEach(store.basket, function(item) {
                total = parseInt(total) + parseFloat(item.cost, 2);
            });
            return total;
        };

        store.shopcart = [];
        store.addToCart = function() {
            for (var cartInc = 0; cartInc < store.products.length; cartInc++) {
                var selectedItem = store.products[cartInc];
                if (selectedItem.Checked) {
                    shopcart.push(selectedItem);
                }
            }
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
