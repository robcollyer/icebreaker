angular.module('starter.controllers', ['ngCordova'])

.controller('DashCtrl', function($scope, $ionicLoading) {
    $scope.mapCreated = function(map) {
       $scope.map = map;
    };

    $scope.centerOnMe = function () {
       console.log("Centering");
       if (!$scope.map) {
          return;
       }

       $scope.loading = $ionicLoading.show({
          content: 'Getting current location...',
          showBackdrop: false
       });

       navigator.geolocation.getCurrentPosition(function (pos) {
          console.log('Got pos', pos);
          $scope.map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
          $scope.loading.hide();
       }, function (error) {
          alert('Unable to get location: ' + error.message);
       });
    };
})

.controller('FriendsCtrl', function($scope, Friends) {
  $scope.friends = Friends.all();
})

.controller('FriendDetailCtrl', function($scope, $stateParams, Friends) {
  $scope.friend = Friends.get($stateParams.friendId);
})

    .controller('AccountCtrl', function($scope, $cordovaGeolocation) {

        $cordovaGeolocation
            .getCurrentPosition()
            .then(function (position) {
                var lat  = position.coords.latitude
                var long = position.coords.longitude

                //console.log(lat, long);

            }, function(err) {
                // error
            });

        // begin watching
        var watch = $cordovaGeolocation.watchPosition({ frequency: 1000 });
        watch.promise.then(function() { /* Not  used */ },
            function(err) {
                // An error occurred.
            },
            function(position) {
                // Active updates of the position here



                // position.coords.[ latitude / longitude]
            });


        // clear watch
        $cordovaGeolocation.clearWatch(watch.watchId)

    });




