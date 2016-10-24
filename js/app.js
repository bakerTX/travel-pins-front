$(document).ready(function() {

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
        // Handle error
        return;
      }
      localStorage.setItem('id_token', authResult.idToken);
      console.log('yes', authResult);
      signIn();
    });
  });

  $('#signin').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#signout').on('click', function(e) {
    e.preventDefault();
    logOut();
  });

  // if (isSignedIn()) {
  //   signIn();
  // };

});

function signIn() {
  $('#signin').hide();
  $('#signout').show();
  getPins();
}

function isSignedIn() {
  var id_token = localStorage.getItem('id_token');

  if (null != id_token) {
    lock.getProfile(id_token, function(err, profile) {
      if (err) {
        // Remove expired token (if any) from localStorage
        localStorage.removeItem('id_token');
        return alert('There was an error getting the profile: ' + err.message);
      } else {
        // Authenticated
        return true;
      }
    })
  }
};

function getPins() {}

function logOut() {
  localStorage.removeItem('id_token');
  userProfile = null;
  window.location.href = "/";
};

// var geocoder = new google.maps.Geocoder();
// $(document).ready(function() {
//   getPinsFillBoard();
//
// });
//
// function getPinsFillBoard(){
//   var options = {
//     url: 'http://localhost:3000/pins'
//   }
//   var request = $.ajax(options);
//   request.done(function(response){
//     console.log(response);
//     for (var i = 0; i < response.length; i++){
//
//       geocoder.geocode({
//         'address': response[i].formatted_address
//       }, function(results, status) {});
//
//     }
//   })
//   request.fail(function(jqXHR, textStatus, errorThrown){
//     console.log('errorThrown: ', errorThrown);
//   })
// }
