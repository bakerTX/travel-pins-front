var map;
var geocoder;

function initMap() {

  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(39.8282, -98.5795);
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 4,
    minZoom:2
    // disableDefaultUI: true,
    // styles: styles
  });
  // map.setOptions({draggable: false, zoomControl: false, scrollwheel: false, disableDoubleClickZoom: true});
}

///
// FILLING THE MAP
function fillPersonalPins(){
  var markers = [];
  // ON THIS MAP, FILL WITH PREVIOUSLY STORED PINS
  var options = {
    url: 'http://localhost:3000/pins',
    headers: {
      'Authorization': 'Bearer ' + Lockr.get('idToken')
    }
  }
  var request = $.ajax(options);
  request.done(function(response){
    console.log(response);
    var infowindow = new google.maps.InfoWindow()
    for (var i = 0; i < response.length; i++){
      var marker = new google.maps.Marker({
        map: map,
        position: {lat: response[i].lat, lng: response[i].lon},
        journal: response[i].journal,
        date: response[i].date,
        location: response[i].location,
        user: response[i].user,
        infowindow: infowindow,
        _id: response[i]._id,
        index: i

      });
      markers.push(marker)
      google.maps.event.addListener(marker, 'click', function() {
         console.log(this);
         this.infowindow.setContent(
         `City: ${this.location}<br>
         Date: ${this.date}<br>
         Journal: ${this.journal}
         <span id='delete'>Delete Pin</span>`);
         infowindow.open(map, this);
       });
       google.maps.event.addListener(marker, 'click', function(e) {
        console.log(this);
        var index = this.index;
        const thismarker = e.currentTarget;
        $('#delete').click(function(thismarker) {
          console.log(thismarker);
          markers[index].setMap(null);
          var options = {
            url: 'http://localhost:3000/pins/'+markers[index]._id,
            method: 'DELETE',
            headers: {
              'Authorization': 'Bearer ' + Lockr.get('idToken')
            }
          }
          var request = $.ajax(options);
          request.done(function(response){
            console.log('deleted');
          });

        });
    })
    }
  })
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.log('errorThrown: ', errorThrown);
  })

}
///

// POSTING A NEW PIN
$('#new-pin').on('submit', function(e) {
  e.preventDefault();
  $(this).hide();
  newPin();
})
function newPin() {
  var address = $('#search').val();
  var journal = document.getElementById('journal').value;
  var date = document.getElementById('date').value;
  // var user = localStorage.getItem('user');
  var user = Lockr.get('user');
  geocoder.geocode({
    address: address
  }, function(results, status) {
    var custom_data = {}
    custom_data.user = user;
    custom_data.journal = journal;
    custom_data.date = date;
    custom_data.address = results[0].formatted_address;
    custom_data.lon = results[0].geometry.bounds.b.b;
    custom_data.lat = results[0].geometry.bounds.f.b;
    // *****
    // POSTING TO DB
    ajaxPost(custom_data);
    //****
    if (status == 'OK') {
      map.setCenter(results[0].geometry.location);
      var marker = new google.maps.Marker({
        map: map,
        position: results[0].geometry.location,
        custom_data: custom_data
      });

      marker.addListener('click', function() {
        // map.setZoom(8);
        // map.setCenter(marker.getPosition());
        console.log(this.custom_data);
      });
    } else {
      alert('Geocode was not successful for the following reason: ' + status);
    }
      $('#address').val('');
  });
}
function ajaxPost(custom_data){
  console.log(custom_data);
  var options = {
    url: 'http://localhost:3000/pins',
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + Lockr.get('idToken')
    },
    data: {
      location: custom_data.address,
      journal: custom_data.journal,
      date: custom_data.date,
      user: custom_data.user,
      lat: custom_data.lat,
      lon: custom_data.lon
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
