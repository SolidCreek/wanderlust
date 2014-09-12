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
      return total !==0 ? Math.round((earned/total) * 100): 0;
    };
    //get user data from server
    getUser.getData($stateParams.userId, function(data){
      console.log(data);
      $scope.user = data;
      $scope.user.percentComplete = calculatePercentage($scope.user.profile.xp, $scope.user.xpneeded);
    });
  });