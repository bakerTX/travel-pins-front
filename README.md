# travel pins
![Image of Landing page v6.0](/images/site6.png)

## example code blocks

#### Google Maps API
```
<script>
  function initMap() {
    geocoder = new google.maps.Geocoder();
    var latlng = new google.maps.LatLng(20, -30);
    map = new google.maps.Map(document.getElementById('map'), {
      center: latlng,
      zoom: 2,
      minZoom:2
    });
  }
</script>
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
![Image of New Pin Form](/images/feature1.png)
#### New Pin Form
```
#new-pin{
  padding: 8px;
  border: none;
  background-color: rgba(255, 255, 255, 0.86);
  position:absolute;
  top: 10.4em;
  right:2.4em;
}

#new-pin input{
  text-align: center;
  border: none;
  border-bottom: 2px solid black;
  width: 258px;
  margin: 2px;
  font-family: monospace;
  color: black;
  text-align: center;
}
```
---
## Next steps / Next Features
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

---

## project history
![Image of Site v1.0](/images/site1)
![Image of Site v2.0](/images/site2.png)
![Image of Site v3.0](/images/site3.png)
![Image of Site v4.0](/images/site4.png)
![Image of Site v5.0](/images/site5.png)


