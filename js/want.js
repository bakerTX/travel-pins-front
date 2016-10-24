$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    var query = $('#search').val();
    loadFlicks(query);
  });
});


var loadFlicks = function(query){
  var value= $('#cityLookup').val()
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&name='+ value,
    data: {
      api_key: 'bb51ffbd4a070baac4fcb1b8e1325a8e',
    }
  })
  .done(function(response){
    for (var i=0; i<5; i++){
      // var parseResponse = $(response).parseJSON();
      console.log('response', response);
      // var $img = $('<img />').attr('src', response[i]);
      // var $p = $('<p>X</p>');



      $('.content').append('#document');
    }
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    alert('oh no!');
    console.log(textStatus, errorThrown);
  })
  .always(function() {
    console.log('I always run no matter what');
  })
}

function jsonFlickrApi(jsonObject){
  console.log('hello?');
}
