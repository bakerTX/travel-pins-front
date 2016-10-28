$(document).ready(function() {
  // Image Search Scrolls Window Down to newly-loaded images
  $('#cityLookup').on('submit',function(e){
    e.preventDefault();
    window.setTimeout(function(){
      window.scrollTo(0,525);
    }, 900);
  })
  // Waiting for click of new-pin button.
  $('#new-pin-button').on('click', function(e) {
    e.preventDefault();
    clickNewPin();
  });
  // Signing into the website.
  $('#signin').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });
  // Signing out of the website.
  $('#signout').on('click', function(e) {
    e.preventDefault();
    logOut();
  });

  // Auth0 Lock
  var userProfile;
  var lock = new Auth0Lock('M2kV4wgHdg7ayYwnbYCOGksuu6Gq7SnQ', 'connorzg.auth0.com', {
    auth: {
      params: {
        scope: 'openid email'
      }
    }
  });
  lock.on("authenticated", function(authResult) {
    lock.getProfile(authResult.idToken, function(error, profile) {
      if (error) {
        console.log('Lock getProfile error');
        return;
      }
      Lockr.set('idToken', authResult.idToken);
      Lockr.set('user', authResult.idTokenPayload.sub);
      // Call CheckSignIn which then delegates which Pins to fill the board with
      checkSignIn();
    });;
  });

  // Check Sign in Checks the status of IsSignedIn (true or false)
  // If that's true, then show/hide appropriately and fill appropriate pins (logged in)
  // If that's false, then show/hide things && then only show EXAMPLE Pins
  function checkSignIn() {
    console.log('checking sign in');
    if (isSignedIn() == true) {
      console.log('is signed in');
      $('.alert').hide()
      $('#signin').hide();
      $('#signout').show();
      clearExamples();
      $('#new-pin-button').show();
      fillPersonalPins();
    } else {
      console.log('not signed in');
      fillExamplePins();
      $('#new-pin-button').hide();
      $('#signin').show();
      $('#signout').hide();
    }
  };
  // On Page Load, Ask this question and take appropriate action.
  checkSignIn();

  // If you're logged in, you don't wanna see the example Pins. Clear them.
  function clearExamples(){
    for (var i = 0; i < examplePins.length; i++){
      examplePins[i].setMap(null);
    }
  }

  // Returns true or undefined based on Token validity / presence.
  function isSignedIn() {
    var idToken = Lockr.get('idToken');
    if (null != idToken) {
      lock.getProfile(idToken, function(err, profile) {
        if (err) {
          // Remove expired token (if any) from storage
          Lockr.rm('idToken');
          return console.log('There was an error getting the profile: ' + err.message);
        } //authenticated
      });
      return true;
    }
  };

  // Hard coding some example Pins for UX before user signs-up for website
  function fillExamplePins() {
    var infowindow = new google.maps.InfoWindow()
    markerJackson(infowindow);
    markerScotland(infowindow);
    markerNYC(infowindow);
  }

  function markerJackson(infowindow) {
    var markerJackson = new google.maps.Marker({
      // Jackson WY
      position: {lat: 43.4912, lng: -110.81347},
      map: map,
      infowindow: infowindow
    })
    // Hold example Pins for clearing later.
    examplePins.push(markerJackson);
    google.maps.event.addListener(markerJackson, 'click', function(e) {
      var marker = e.currentTarget;
      this.infowindow.setContent(
        `City: Jackson Hole, WY<br>
        Date: March 2014<br>
        Journal: Shredded pow pow on the mountain`
      )
      infowindow.open(map, markerJackson)
    });
  }

  function markerScotland(infowindow) {
    var markerScotland = new google.maps.Marker({
      // Scotland
      position: {lat: 57.8918, lng: -4.3464},
      map: map,
      infowindow: infowindow
    })
    examplePins.push(markerScotland)
    google.maps.event.addListener(markerScotland, 'click', function(e) {
      var marker = e.currentTarget;
      this.infowindow.setContent(
        `City: Bonar Bridge, Scotland<br>
        Date: January 19<br>
        Journal: Locals can be quite testy`
      )
      infowindow.open(map, markerScotland)
    })
  }

  function markerNYC(infowindow) {
    var markerNYC = new google.maps.Marker({
      // New York City
      position: {lat: 40.7128, lng: -74.0059},
      map: map,
      infowindow: infowindow
    })
    examplePins.push(markerNYC);
    google.maps.event.addListener(markerNYC, 'click', function(e) {
      var marker = e.currentTarget;
      this.infowindow.setContent(
        `City: New York City, New York<br>
        Date: Aug 2015<br>
        Journal: Spent so much money`
      )
      infowindow.open(map, markerNYC)
    });
  }
  // Setting up an event listener on the map
  // Sending Latitude and Longitude of click thru GEOCODE
  // Sending GEOCODE response to placeMarker
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
            var lat = results[0].geometry.bounds.f.b;
            var lon = results[0].geometry.bounds.b.b;
            var city = results[0].address_components[1].long_name + ', ' + results[0].address_components[3].short_name;
            placeMarker(event.latLng, city, listen, lat, lon);
          }
        }
      });
    };
  };

  function placeMarker(location, address, listen, lat, lon) {
    $('#new-pin').show();
    var infowindow = new google.maps.InfoWindow();
    var user = Lockr.get('user');
    var custom_data = {
      position: location,
      address: address,
      map: map,
      user: user,
      lat: lat,
      lon: lon,
      infowindow: infowindow
    }
    var marker = new google.maps.Marker(custom_data);
    custom_data.marker = marker;

    google.maps.event.removeListener(listen);

    markers.push(marker)
    $('#new-pin').on('submit', function() {

      if (isSignedIn() == undefined){
        alert('sign in first! :)');
        lock.show();
      }
      var journal = document.getElementById('journal').value;
      var date = document.getElementById('date').value;
      $(this).hide();
      marker = markers[markers.length - 1];
      marker.journal = journal;
      marker.date = date;
      custom_data.journal = journal;
      custom_data.date = date;
      console.log(marker);
      ajaxPost(custom_data);
      // fillPersonalPins();

      google.maps.event.addListener(marker, 'click', function() {
         this.infowindow.setContent(
         `City: ${address}<br>
         Date: ${this.date}<br>
         Journal: ${this.journal}<br>
         <span id='delete'>Delete Pin</span>`);
         infowindow.open(map, this);
        });

        google.maps.event.addListener(marker, 'click', function(e) {
          console.log('markerThis', this);
          console.log('custom_data.marker', custom_data.marker);
          var index = this.index;
          const thismarker = e.currentTarget;
          $('#delete').click(function() {
            custom_data.marker.setMap(null);
            var options = {
              url: 'http://localhost:3000/pins/'+custom_data.marker._id,
              method: 'DELETE',
              headers: {
                'Authorization': 'Bearer ' + Lockr.get('idToken')
              }
            }
            var request = $.ajax(options);
            request.done(function(response){
              console.log('deleted');
            })
            request.fail(function(jqXHR, textStatus, errorThrown){
              console.log('errorThrown', errorThrown);
            })
          });
        });
    });
  };

  function logOut() {
    localStorage.removeItem('idToken');
    localStorage.removeItem('profile');
    localStorage.removeItem('user');
    Lockr.rm('idToken');
    userProfile = null;
    window.location.href = "/";
  };

}); // doc ready
