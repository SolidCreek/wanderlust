'use strict';

angular.module('wanderlustApp')


  .controller('ShowtourCtrl', function ($scope, GoExplore, $stateParams) {
    $scope.tours = {};
    var callback = function(data){
       if(data){
         $scope.tours = data;
       }
      };
    GoExplore.getTour($stateParams.tourId, callback)
    $scope.glhf = GoExplore.glhf;
    $scope.submitReview = function(){
      var reviewData = {
        body: $scope.reviewBody,
        rating: $scope.score
      };
      GoExplore.submitReview($stateParams.tourId, reviewData, callback);      
    };
  })


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
      })
      .error(function(data){
        console.log("fail: ",data);
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
              callback({tour: data});
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
  });
