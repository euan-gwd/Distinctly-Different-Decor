(function() {
    "use strict";
    var app = angular.module('DDDApp', ['ui.router', 'DDDApp.controllers', 'DDDApp.services', 'ngMaterial', 'ngMessages']);

    app.config(function($stateProvider, $urlRouterProvider, $locationProvider, $mdThemingProvider, $mdIconProvider) {
        $stateProvider
            .state("home", {
                url: "/",
                templateUrl: "js/views/home.html",
                controller: "StoreController"
            })
            .state("checkout", {
                url: "/checkout",
                templateUrl: "js/views/checkout.html",
                controller: "CartController"
            })
            .state("thankyou", {
                url: "/thankyou",
                templateUrl: "js/views/thankyou.html"
            });
        $urlRouterProvider.otherwise('/');
        $locationProvider.html5Mode(false);

        $mdThemingProvider.theme('myTheme')
            .primaryPalette('deep-purple', {
                'default': '800'
            })
            .accentPalette('orange')
            .warnPalette('red');
        $mdThemingProvider.setDefaultTheme('myTheme');

        $mdIconProvider.defaultFontSet('material-icons');
    });

}());
