(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('StoreController', ['', function() {
        this.products = storeInventory;

        // storeList.counter = 0;
        // storeList.countadd = function(inc) {
        //     storeList.counter += inc;
        // };
        // storeList.countremove = function(inc) {
        //     storeList.counter -= inc;
        // };

    }]);
    var storeInventory = [{
        name: 'one',
        desc: 'this is the 1st box in the store',
        price: '1',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'two',
        desc: 'this is the 2nd box in the store',
        price: '2',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'three',
        desc: 'this is the 3rd box in the store',
        price: '3',
        canPurchase: true,
        soldOut: false
    }, {
        name: 'four',
        desc: 'this is the 4th box in the store',
        price: '4',
        canPurchase: true,
        soldOut: false
    }];
}());
