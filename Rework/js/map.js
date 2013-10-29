$(document).ready(function(){
	//var map = L.mapbox.map('map', 'tastyplanetse.map-mnphjjx4');
	//var json = null;
	map = null;
	var map_options, marker, lat, lon;
	var geocoder = new google.maps.Geocoder();
  var currentInfoWin = null;



	try{
	map_options = {
		center: new google.maps.LatLng(59.324902069, 18.06962436220),
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP	
	}

	map = new google.maps.Map($("#map_canvas")[0], map_options);



	}

	catch(err){
		console.log(err);

	}

	var placeListRef = new Firebase("https://tastyplanetse.firebaseio.com/dinners")
	placeListRef.on('child_added', function(snapshot){
		var placeData = snapshot.val();
		var id = snapshot.name();
		var userAddress = placeData.userAddress;

		console.log("user is here: " + placeData.userAddress);


		//console.log("latitude: " + lat);
		//console.log("longitude: " + lon);
		//console.log(properties.userAddress);
		createMarker(id, placeData);
	});


  window.codeAddress = function(address, callback) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        callback(null, results[0].geometry.location);
      } else {
        callback("uh oh something went wrong with geocoding your address. Make sure your address actually exists :)");
      }
    });
  }   

	

	function createMarker(id, properties){
		var myLatLng = new google.maps.LatLng(properties.lat, properties.lng);
		var marker = new google.maps.Marker({
			position: myLatLng,
			map: map
		});

		var contentString = '<div class="infowindow">'+
		  '<h1>' + properties.dinnerName + '</h1>' +
			'<div>User: ' + properties.userName + '</div>' +
			'<div>Where: ' + properties.address + '</div>' +
			'<div>When: ' + properties.dateTime + '</div>' +
			'<div>Max Seats: ' + properties.maxSeats + '</div>' +
			'<div>Message: ' + properties.message + '</div>' +
			'<button data-id="' + id + '"class="bookListingBtn">Book</button>' +
      '</div>';

		var infowindow = new google.maps.InfoWindow({
      content: contentString
  	});

  	google.maps.event.addListener(marker, 'click', function() {
    	infowindow.open(map,marker);
      if (currentInfoWin !== null) {
        currentInfoWin.close(map, this); 
      }
      currentInfoWin = infowindow;  
  	});
	}



/*
	function createMarker(properties) {
		var marker = L.marker([userAddressInput]).addTo(map);
		marker.bindPopup(properties.dinnerName, properties.userAddress, properties.dateTime, properties.userId, properties.message).openPopup();
	}; */
/*
  var marker = new google.maps.Marker({
      position: userLatLng,
      map: map,
      title: 'Hello World!'
  });
*/

});

