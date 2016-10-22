$(document).ready(function() {
  if (isSignedIn()) {
    signIn();
  }

  $('#btn-login').on('click', function(e) {
    e.preventDefault();
  });

});

function signIn() {
  $('#btn-login').hide()
  $('#usernameSignedIn').show()
  getPins();
}

function isSignedIn() {

}

function getPins() {

}
