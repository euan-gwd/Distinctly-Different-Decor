(function() {
  "use strict";
  var app = angular.module('DDDApp', ['ui.router', 'DDDApp.controllers', 'DDDApp.services']);

  app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
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
  });

}());
