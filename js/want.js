$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    var query = $('#searchPlace').val(); // query comes from the word typed into the search field
    $('#showPhoto').empty();
    loadFlicks(query); // sending in query
  });
});


var loadFlicks = function(query){ // query == json?
  console.log('load flicks is running');
  console.log(query);
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&text='+query+'&format=json', // replace with json? replace with query?
    jsonpCallback: "jsonFlickrApi",
    dataType: 'jsonp',
    data: {
      api_key: 'bb51ffbd4a070baac4fcb1b8e1325a8e',
      per_page:25,
      safe_search: 1,
      content_type: 1,
      sort: 'relevance'
    }
  })
  .done(function(response){
    console.log('success ever?');
  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  })
  .always(function() {
    console.log('I always run no matter what');
  })
}

function jsonFlickrApi(jsonObject){
  console.log(jsonObject);
  //There is a bug in the line of code below.
  $.each( jsonObject.photos.photo, function( i, gp ) {

  var farmId = gp.farm;
  var serverId = gp.server;
  var id = gp.id;
  var secret = gp.secret;

  var $li = $('<li />');
  $li.append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_m.jpg"/>');
  $('#showPhoto').append($li);
  });



};
