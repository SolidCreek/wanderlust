'use strict';

angular.module('wanderlustApp')

  .factory('GoExplore', function($http, User){
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

    var submitReview = function(tourId, reviewObject, callback){
      User.get().$get().then(function(data){
        if(reviewObject.body && reviewObject.rating && data._id){
          $http({
            method: 'POST',
            url: '/api/tour/'+tourId,
            data: {
              userId: data._id,
              review: reviewObject
            }
          })
          .success(function(data){
              callback(data);
          });
        } else {
          callback(null);
      }
      });
    };
    return {
      submitReview: submitReview,
      getTour: getTour,
      glhf: glhf
    };
  })

  .controller('ShowtourCtrl', function ($scope, GoExplore, $stateParams) {
    $scope.glhf = GoExplore.glhf;
    GoExplore.getTour($stateParams.tourId, function(data){
      $scope.tours = data;
    });
    $scope.submitReview = function(){
      var reviewData = {
        body: $scope.reviewBody,
        rating: $scope.score
      };
      var callback = function(data){
       if(data){
         $scope.tours = data;
       }
      };
      GoExplore.submitReview($stateParams.tourId, reviewData, callback);      
    };
  });
