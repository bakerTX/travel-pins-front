$(document).ready(function() {
  $('form').on('submit', function(e){
    e.preventDefault();
    var query = $('#search').val(); // query comes from the word typed into the search field
    $('#showPhoto').empty();
    loadFlicks(query); // sending in query
  });
});


var loadFlicks = function(query){ // query == json?
  console.log('load flicks is running');
  console.log(query);
  $.ajax({
    url: 'https://api.flickr.com/services/rest/?method=flickr.photos.search&text='+query+'&format=json', // replace with json? replace with query?
    safe_search: 1,
    content_type: 1,
    jsonpCallback: "jsonFlickrApi",
    dataType: 'jsonp',
    data: {
      api_key: 'bb51ffbd4a070baac4fcb1b8e1325a8e',
      per_page:25
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
  $li.append('<img src="https://farm' + farmId + '.staticflickr.com/' + serverId + '/' + id + '_' + secret + '_m.jpg"/>');
  $('#showPhoto').append($li);

  });
};

  // console.log(imageInfo[i].farm + ", " + imageInfo[i].server + ", " + imageInfo[i].id + ", " + imageInfo[i].secret);

  // var imageUrl = "'https://' + imageInfo[i].farm + '.staticflickr.com/' + imageInfo[i].server + '/' + imageInfo[i].id + '_' + imageInfo[i].secret + '.jpg'"
  // $("#flickr").append('<img src="https://farm' + imageInfo[i].farm + '.staticflickr.com/' + imageInfo[i].server + '/' + imageInfo[i].id + '_' + imageInfo[i].secret+ '.jpg"/>');
  // console.log(imageUrl);
// }
