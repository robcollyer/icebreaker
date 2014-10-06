/**
 * Created by rob on 06/10/2014.
 */
angular.module('starter.directives', [])

    .directive('map', function() {
       return {
          restrict: 'E',
          scope: {
             onCreate: '&'
          },
          link: function ($scope, $element, $attr) {
             function initialize() {

                var mapOptions = {
                   center: new google.maps.LatLng(51.597319999999996, -1.293486),
                   //center: new google.maps.LatLng(position.coords.latitude,position.coords.longitude),
                   zoom: 16,
                   mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                var map = new google.maps.Map($element[0], mapOptions);

                $scope.onCreate({map: map});

                // Stop the side bar from dragging when mousedown/tapdown on the map
                google.maps.event.addDomListener($element[0], 'mousedown', function (e) {
                   e.preventDefault();
                   return false;
                });
             }

             if (document.readyState === "complete") {
                initialize();
             } else {
                google.maps.event.addDomListener(window, 'load', initialize);
             }
          }
       }
    });