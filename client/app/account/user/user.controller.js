'use strict';

angular.module('wanderlustApp')
  .factory('getUser', function($http){
    return{
      getData: function(userId, callback){
        return $http({
          method: 'GET',
          url: '/api/user/'+userId
        }).success(function(data){
          callback(data);
        });
      }
    };
  })
  .controller('UserCtrl', function ($scope, User, Auth, getUser, $stateParams) {
    var calculatePercentage = function(earned, total){
      return Math.round((earned/total) * 100);
    };
    //get user data from server
    getUser.getData($stateParams.userId, function(data){
      $scope.user = data;
    });
    $scope.user = {
      name: 'Geoff',
      levelBadge: '7',
      expEarned: 172,
      totalExp: 600,
      reviews: [{body:"this tour was awesome", rating: 4, reviewer: {id:5, name:"Dan"}}],
      tours: [{title: "Best Tour Ever", description: "This is not the greatest tour in the world, it is only a tribute.", id: "5412647ea5ed590000b7b828"}]
    };
    $scope.user.percentComplete = calculatePercentage($scope.user.expEarned, $scope.user.totalExp);
  });

//current level value
//progress to next level
//name
//level badge
