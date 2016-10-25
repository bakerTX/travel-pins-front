$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    var query = $('#search').val(); // query comes from the word typed into the search field
    $('#showPhoto').empty();
    loadFlicks(query); // sending in query
  });
});


var loadFlicks = function(json){ // query == json?
  console.log('load flicks is running');
  console.log(json);
  var value= $('#cityLookup').val() // value has become extinct
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.getRecent&format=json&name='+ value, // replace with json? replace with query?
    // jsonpCallback: "logResults",
    dataType: 'jsonp',
    data: {
      api_key: 'bb51ffbd4a070baac4fcb1b8e1325a8e'
    }
  })
  .done(function(response){

  })

  .fail(function(jqXHR, textStatus, errorThrown) {
    console.log(textStatus, errorThrown);
  })
  .always(function() {
    console.log('I always run no matter what');
  })
}

function jsonFlickrApi(jsonObject){
  var imageInfo = jsonObject.photos.photo
  for (var i=0; i<=imageInfo.length; i++) {}
  // console.log(imageInfo[i]);
  // https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  // var farm = imageInfo[i].farm
  // var server = imageInfo[i].server
  // var id = imageInfo[i].id
  // var secret = imageInfo[i].secret
  // console.log(imageInfo[i]);

  $.each( jsonObject.photos.photo, function( i, gp ) {

  var farmId = gp.farm;
  var serverId = gp.server;
  var id = gp.id;
  var secret = gp.secret;

  // console.log(farmId + ", " + serverId + ", " + id + ", " + secret);

  //  https://farm{farm-id}.staticflickr.com/{server-id}/{id}_{secret}.jpg
  var $li = $('<li />');
  $li.append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '.jpg"/>');
  $('#showPhoto').append($li);

  });
};

  // console.log(imageInfo[i].farm + ", " + imageInfo[i].server + ", " + imageInfo[i].id + ", " + imageInfo[i].secret);

  // var imageUrl = "'https://' + imageInfo[i].farm + '.staticflickr.com/' + imageInfo[i].server + '/' + imageInfo[i].id + '_' + imageInfo[i].secret + '.jpg'"
  // $("#flickr").append('<img src="https://farm' + imageInfo[i].farm + '.staticflickr.com/' + imageInfo[i].server + '/' + imageInfo[i].id + '_' + imageInfo[i].secret+ '.jpg"/>');
  // console.log(imageUrl);
// }
