'use strict';
// used as intermidaite variable d3 can access and modify
var d3Interactor = {selected:'bayview', flag: false, intervalId: null};

angular.module('wanderlustApp')
  .controller('MainCtrl', function ($scope, $state, $location) {
    $scope._d3InteractorInterval = function(){
      $scope.location = d3Interactor.selected;
      if(d3Interactor.flag){
        setTimeout(function(){
          clearInterval(d3Interactor.intervalId);
          $scope.navToToursByLocation();
        }, 100);
      }
    }

    $scope.location = d3Interactor.selected;
    d3Interactor.intervalId = setInterval($scope._d3InteractorInterval, 250);
    $scope.navToToursByLocation = function() {
      // Value of $scope.location can be found in tours' $stateParams
      console.log($scope.location);
      $state.go('tours', $scope.location);
    };
  });

