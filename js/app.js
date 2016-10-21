$(document).ready(function(){
  if (isSignedIn()){
    signIn();
  }

  $('#login').on('click', function(e){
    e.preventDefault();
  })
  }

  function signIn() {
    $('#signIn').hide()
    $('#usernameSignedIn').show()
    getGrowls();
  }

// All these ids need to be created in our index file. 
