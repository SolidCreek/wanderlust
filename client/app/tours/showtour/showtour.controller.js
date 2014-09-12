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
    $scope.completeTask = function(spot){
      var points = spot.points;
      spot.points='';
      if(points && !spot.complete){
        GoExplore.completeTask(points);
      }
      spot.complete = true;
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

    var completeTask = function(pointsEarned, callback){
      User.get().$get().then(function(userData){
        $http({
          method:'POST',
          url: '/api/points/'+userData._id,
          data: {
            user: userData,
            points: pointsEarned
          }
        })
        .success(function(data){
          if(callback){
            callback(data);
          }
        });
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
      completeTask: completeTask,
      glhf: glhf
    };
  });
