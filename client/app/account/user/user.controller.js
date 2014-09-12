'use strict';

angular.module('wanderlustApp')
  .factory('getUser', function($http){
    return{
      getData: function(callback){
        return $http({
          method: 'GET',
          url: '/api/user/me'
        }).success(function(data){
          callback(data);
        });
      }
    };
  })
  .controller('UserCtrl', function ($scope, User, Auth, getUser) {
    //get user data from server
    getUser.getData(function(data){
      $scope.data = data;
    });
    $scope.data = {
      name: 'Geoff',
      levelBadge: '7',
      progressToNextLevel: 172,
      currentLevelValue: 600,
      reviews: [{body:"this tour was awesome", rating: 4, reviewer: {id:5, name:"Dan"}}],
      tours: [{tour:{title: "This will be a tour"}}]
    };
  });

//current level value
//progress to next level
//name
//level badge
