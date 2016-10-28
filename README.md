# travel pins
![Image of Landing page](/images/site6.png)
## project history
Here is some history of the project


## example code blocks
```
console.log('hello world!');
```
#### Flickr API:
```
$(document).ready(function() {
  $('#cityLookup').on('submit', function(e){
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
```
## next steps / next features
Upcoming Features
Broaden the two major functionalities of the website

* ### "Where do you want to go?" Section:
  * Use Facebook API to bring in events occurring around the user’s specified dates
  * Use Yelp API to show a short list of top restaurants in your specified location
  * Link the populated images 

* ### “My Pins” Section 
  *Expand journal entries to include:
    * Place ratings
    * User avatar
    * Upload images, which populate under the map when you click on the journal entry
    * How many times travelled to location
    * Recommendations 
    * Events attended 

      
  
* ### Bug Extermination
* ### Completely refactor the codebase from scratch?
* ### _Sell app to HomeAway, become rich_


