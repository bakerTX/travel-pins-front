$(document).ready(function() {
  $('#new-pin-button').on('click', function(){
    console.log('button clicked');
    e.preventDefault();
    $('new-pin').show();
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
      localStorage.setItem('idToken', authResult.idToken);
      localStorage.setItem('user', authResult.idTokenPayload.sub);
      checkSignIn();
    });
    console.log('should have signed in here');
  });
  $('#signin').on('click', function(e) {
    e.preventDefault();
    lock.show();
  });

  $('#signout').on('click', function(e) {
    e.preventDefault();
    logOut();
  });
  function isSignedIn() {
    var idToken = localStorage.getItem('idToken');
    if (null == idToken){
      return false;
    } else if (null != idToken) {

      lock.getProfile(idToken, function(err, profile) {
        if (err) {
          console.log('err?');
          // Remove expired token (if any) from localStorage
          localStorage.removeItem('idToken');
          return alert('There was an error getting the profile: ' + err.message);
        } else {
          // Authenticated
          return true;
        }
      })
      return true;
    }
  };
  function checkSignIn(){
    console.log('checking sign in');
    // console.log(isSignedIn());
    if (isSignedIn()==true){
      console.log('is signed in');
      $('#signin').hide();
      $('#signout').show();
      fillPersonalPins();
    } else {
      console.log('not signed in');
      fillExamplePins();
    }
  };
  checkSignIn();

}); // doc ready


function fillExamplePins() {

}

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
  userProfile = null;
  window.location.href = "/";
};
