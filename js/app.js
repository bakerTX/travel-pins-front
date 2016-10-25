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
      localStorage.setItem('idToken', authResult.idToken);
      localStorage.setItem('user', authResult.idTokenPayload.sub);
      console.log('yes', authResult);
      signIn();
    });
  });
  function isSignedIn() {
    console.log("is signed in?");
    var idToken = localStorage.getItem('idToken');

    if (null != idToken) {
      lock.getProfile(idToken, function(err, profile) {
        if (err) {
          // Remove expired token (if any) from localStorage
          localStorage.removeItem('idToken');
          return alert('There was an error getting the profile: ' + err.message);
        } else {
          // Authenticated
          return true;
        }
      })
    }
  };

  if (isSignedIn()){
    console.log('is signed in');
    fillPersonalPins();
  }


  $('#signin').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#signout').on('click', function(e) {
    e.preventDefault();
    logOut();
  });
});

function signIn() {
  $('#signin').hide();
  $('#signout').show();
  fillPersonalPins();
}

function fillPersonalPins(){
  console.log('filling personal pins');
  var options = {
    url: 'http://localhost:3000/pins',
    headers: {
      'Authorization': 'Bearer ' + localStorage.getItem('idToken')
    }
  }
  var request = $.ajax(options)
  request.done(function(response){
    console.log(response);
  })
  request.fail(function(jqXHR, textStatus, errorThrown){
    console.log('fuck');
  })
}



function getPins() {}

function logOut() {
  localStorage.removeItem('idToken');
  localStorage.removeItem('profile');
  localStorage.removeItem('user');
  userProfile = null;
  window.location.href = "/";
};
