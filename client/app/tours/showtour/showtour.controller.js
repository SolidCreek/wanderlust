'use strict';

angular.module('wanderlustApp')

  .factory('GoExplore', function($http){
    //this function activates on ng-click for the button "Go Exploring!"
    var glhf = function(){
      alert('good luck, have fun!');      
    };

    var getTour = function(tourId, callback){
      $http({
        method: 'GET',
        url: '/api/tour/'+tourId
      })
      .success(function(data){
          callback(data);
      });
    };

    return {
      getTour: getTour,
      glhf: glhf
      
    };
  })

  .controller('ShowtourCtrl', function ($scope, GoExplore, $stateParams) {

    $scope.glhf = GoExplore.glhf;

    //Temp data for a tour


    GoExplore.getTour($stateParams.tourId, function(data){
      $scope.tours = data;
    });

  });
