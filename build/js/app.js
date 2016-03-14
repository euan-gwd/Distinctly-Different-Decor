(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('StoreController', function() {
        this.products = storeInventory;
		
		// Updates the counter badge on the shopping cart  
        this.counter = 0;
        this.countAdd = function(inc) {
            this.counter += inc;
        };
    
    });

    var storeInventory = [{
        name: 'one',
        desc: 'this is the 1st box in the store',
        image: 'http://placehold.it/330x150',
        price: '1',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'two',
        desc: 'this is the 2nd box in the store',
        price: '2',
        image: 'http://placehold.it/330x150',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'three',
        desc: 'this is the 3rd box in the store',
        price: '3',
        image: 'http://placehold.it/330x150',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'four',
        desc: 'this is the 4th box in the store',
        price: '4',
        image: 'http://placehold.it/330x150',
        canPurchase: true,
        soldOut: false
    }];
}());
