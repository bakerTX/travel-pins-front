// var geocoder = new google.maps.Geocoder();
// $(document).ready(function() {
//   getPinsFillBoard();
//
// });
//
// function getPinsFillBoard(){
//   var options = {
//     url: 'http://localhost:3000/pins'
//   }
//   var request = $.ajax(options);
//   request.done(function(response){
//     console.log(response);
//     for (var i = 0; i < response.length; i++){
//
//       geocoder.geocode({
//         'address': response[i].formatted_address
//       }, function(results, status) {});
//
//     }
//   })
//   request.fail(function(jqXHR, textStatus, errorThrown){
//     console.log('errorThrown: ', errorThrown);
//   })
// }
