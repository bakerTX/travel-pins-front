var map;
var geocoder;

function initMap() {
  console.log('hello?');
  // var styles = [
  //   {
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#ebe3cd"
  //       }
  //     ]
  //   }, {
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#523735"
  //       }
  //     ]
  //   }, {
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "color": "#f5f1e6"
  //       }
  //     ]
  //   }, {
  //     "featureType": "administrative",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#c9b2a6"
  //       }
  //     ]
  //   }, {
  //     "featureType": "administrative.land_parcel",
  //     "stylers": [
  //       {
  //         "visibility": "on"
  //       }
  //     ]
  //   }, {
  //     "featureType": "administrative.land_parcel",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#dcd2be"
  //       }
  //     ]
  //   }, {
  //     "featureType": "administrative.land_parcel",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#ae9e90"
  //       }
  //     ]
  //   }, {
  //     "featureType": "administrative.neighborhood",
  //     "stylers": [
  //       {
  //         "visibility": "on"
  //       }
  //     ]
  //   }, {
  //     "featureType": "landscape.natural",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#dfd2ae"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#dfd2ae"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi",
  //     "elementType": "labels.text",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#93817c"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi.business",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi.park",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //       {
  //         "color": "#a5b076"
  //       }
  //     ]
  //   }, {
  //     "featureType": "poi.park",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#447530"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#f5f1e6"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road",
  //     "elementType": "labels",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road",
  //     "elementType": "labels.icon",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.arterial",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.arterial",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#fdfcf8"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.highway",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#f8c967"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.highway",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#e9bc62"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.highway",
  //     "elementType": "labels",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.highway.controlled_access",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#e98d58"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.highway.controlled_access",
  //     "elementType": "geometry.stroke",
  //     "stylers": [
  //       {
  //         "color": "#db8555"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.local",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "road.local",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#806b63"
  //       }
  //     ]
  //   }, {
  //     "featureType": "transit",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "transit.line",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#dfd2ae"
  //       }
  //     ]
  //   }, {
  //     "featureType": "transit.line",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#8f7d77"
  //       }
  //     ]
  //   }, {
  //     "featureType": "transit.line",
  //     "elementType": "labels.text.stroke",
  //     "stylers": [
  //       {
  //         "color": "#ebe3cd"
  //       }
  //     ]
  //   }, {
  //     "featureType": "transit.station",
  //     "elementType": "geometry",
  //     "stylers": [
  //       {
  //         "color": "#dfd2ae"
  //       }
  //     ]
  //   }, {
  //     "featureType": "water",
  //     "elementType": "geometry.fill",
  //     "stylers": [
  //       {
  //         "color": "#b9d3c2"
  //       }
  //     ]
  //   }, {
  //     "featureType": "water",
  //     "elementType": "labels.text",
  //     "stylers": [
  //       {
  //         "visibility": "off"
  //       }
  //     ]
  //   }, {
  //     "featureType": "water",
  //     "elementType": "labels.text.fill",
  //     "stylers": [
  //       {
  //         "color": "#92998d"
  //       }
  //     ]
  //   }
  // ]
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.8282, -98.5795);
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 4
    // disableDefaultUI: true,
    // styles: styles
  });
  // map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});

  // ON THIS MAP, FILL WITH PREVIOUSLY STORED PINS
  var options = {
    url: 'http://localhost:3000/pins'
  }
  var request = $.ajax(options);
  request.done(function(response){
    console.log('resp: ',response);
    for (var i = 0; i < response.length; i++){
      console.log('i: ', i);
      console.log(response[i].location)
      geocoder.geocode({
        'address': response[i].location
      }, function(results, status) {
        console.log(results);
        if (status == 'OK') {
          // map.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({map: map, position: results[0].geometry.location});

          marker.addListener('click', function() {
            map.setZoom(8);
            map.setCenter(marker.getPosition());
            console.log(this);
            console.log(marker);
          });
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });

    }
  })
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.log('errorThrown: ', errorThrown);
  })
}

function codeAddress() {
  var address = document.getElementById('search').value;
  geocoder.geocode({
    'address': address
  }, function(results, status) {
    console.log(results);
    console.log(results[0].formatted_address);
    var formatted_address = results[0].formatted_address;
    ajaxPost(formatted_address);
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({map: map, position: results[0].geometry.location});

      marker.addListener('click', function() {
        map.setZoom(8);
        map.setCenter(marker.getPosition());
        console.log(this);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
      $('#address').val('');
  });
}
function ajaxPost(address){
  var options = {
    url: 'http://localhost:3000/pins',
    method: 'POST',
    data: {
      location: address,
      // potentially add other defining information here
    }
  }
  var request = $.ajax(options);

  request.done(function(response){
    console.log('post was successful');
    console.log(response);
  })
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.log('errorThrown: ', errorThrown);
  });
};

$('.navbar-form').on('submit', function(e) {
  e.preventDefault();
  codeAddress();
})
