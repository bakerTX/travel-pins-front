var map;
var geocoder;

function initMap() {
  geocoder = new google.maps.Geocoder();
  var latlng = new google.maps.LatLng(20, -30);
  map = new google.maps.Map(document.getElementById('map'), {
    center: latlng,
    zoom: 2,
    minZoom:2
  });
}

var markers = []
var examplePins = []

// FILLING THE MAP
function fillPersonalPins(){
  var options = {
    url: 'http://localhost:3000/pins',
    headers: {
      'Authorization': 'Bearer ' + Lockr.get('idToken')
    }
  }
  var request = $.ajax(options);
  request.done(function(response){
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
      markers.push(marker);
      google.maps.event.addListener(marker, 'click', function(e) {
        // sets the Content of the infoWindow
        this.infowindow.setContent(
        `City: ${this.location}<br>
        Date: ${this.date}<br>
        Journal: ${this.journal}
        <span id='delete'>Delete Pin</span>`);
        infowindow.open(map, this);
                                //
        var index = this.index; // tracker of marker's position in global array of markers
                                // for accessibility within the following nested listener
        const thismarker = e.currentTarget;
        // Delete Pin button contained inside info-window.
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
