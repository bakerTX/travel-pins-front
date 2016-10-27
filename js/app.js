$(document).ready(function() {
  $('#new-pin-button').on('click', function(e) {
    console.log('button clicked');
    e.preventDefault();
    // $('new-pin').toggle();
    clickNewPin();
  });

  $('#signin').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#signout').on('click', function(e) {
    e.preventDefault();
    logOut();
  });

  var userProfile;
  var lock = new Auth0Lock('M2kV4wgHdg7ayYwnbYCOGksuu6Gq7SnQ', 'connorzg.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });


  lock.on("authenticated", function(authResult) {
    console.log('lock authenticated');
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        console.log('some error');
        return;
      }
      Lockr.set('idToken', authResult.idToken);
      // localStorage.setItem('idToken', authResult.idToken);
      Lockr.set('user', authResult.idTokenPayload.sub);
      // localStorage.setItem('user', authResult.idTokenPayload.sub);
      checkSignIn();
    });
    console.log('should have signed in here');
  });


  function checkSignIn() {
    console.log('checking sign in');
    // console.log(isSignedIn());
    if (isSignedIn() == true) {
      console.log('is signed in');
      $('#signin').hide();
      $('#signout').show();
      fillPersonalPins();
    } else {
      console.log('not signed in');
      fillExamplePins();
      $('#signin').show();
      $('#signout').hide();
    }
  };
  checkSignIn();

  function isSignedIn() {
    var idToken = Lockr.get('idToken');
    if (null != idToken) {
      lock.getProfile(idToken, function(err, profile) {
        if (err) {
          // Remove expired token (if any) from storage
          Lockr.rm('idToken');
          return alert('There was an error getting the profile: ' + err.message);
        } //authenticated
      });
      return true;
    }
  };

}); // doc ready

function clickNewPin() {
  map.setOptions({draggableCursor:'crosshair'});
  var listen = google.maps.event.addListener(map, 'click', geo);
  function geo(event) {
    map.setOptions({draggableCursor:'null'});
    geocoder.geocode({
      'latLng': event.latLng
    }, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        if (results[0]) {
          var city = results[0].address_components[1].long_name + ', ' + results[0].address_components[3].short_name;
          placeMarker(event.latLng, city, listen);
        }
      }
    });
  };
}

function placeMarker(location, address, listen) {
  $('#new-pin').show();
  var user = Lockr.get('user');
  var marker = new google.maps.Marker({
      position: location,
      address: address,
      map: map,
      user: user
  });

  google.maps.event.removeListener(listen);

  markers.push(marker)
  $('#new-pin').on('submit', function() {
    var journal = document.getElementById('journal').value;
    var date = document.getElementById('date').value;
    $(this).hide();
    marker = markers[markers.length - 1];
    marker.journal = journal;
    marker.date = date;
    console.log(marker);
  });
};

function fillExamplePins() {}

// function fillPersonalPins(){
//   console.log('filling personal pins');
//   var options = {
//     url: 'http://localhost:3000/pins',
//     headers: {
//       'Authorization': 'Bearer ' + localStorage.getItem('idToken')
//     }
//   }
//   var request = $.ajax(options)
//   request.done(function(response){
//     console.log(response);
//   })
//   request.fail(function(jqXHR, textStatus, errorThrown){
//     console.log('fuck');
//   })
// }

function logOut() {
  localStorage.removeItem('idToken');
  localStorage.removeItem('profile');
  localStorage.removeItem('user');
  Lockr.rm('idToken');
  userProfile = null;
  window.location.href = "/";

};
