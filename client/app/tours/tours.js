'use strict'; 

angular.module('wanderlustApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('tours', {
        url: '/tours',
        templateUrl: 'app/tours/tours.html',
        controller: 'ToursCtrl'
      })
      .state('toursFilter', {
        url: '/tours/:filter',
        templateUrl: 'app/tours/tours.html',
        controller: 'ToursCtrl'
      });
  });
