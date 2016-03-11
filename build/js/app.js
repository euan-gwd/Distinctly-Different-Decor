(function() {
    var app = angular.module('DDDApp', ['ui.router']);

    app.controller('MainCtrl', ['$scope', function($scope) {
        $scope.list = [
            { name: 'one', desc: 'this is the 1st box in the store', price: '1' },
            { name: 'two', desc: 'this is the 2nd box in the store', price: '2' },
            { name: 'three', desc: 'this is the 3rd box in the store', price: '3' }
        ];
    }]);
}());
