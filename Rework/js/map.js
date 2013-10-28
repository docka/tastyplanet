$(document).ready(function(){
	//var map = L.mapbox.map('map', 'tastyplanetse.map-mnphjjx4');
	//var json = null;
	var map_options, map, marker, lat, lon;
	//$("#part1").hide();



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
		var userAddress = placeData.userAddress;

		lat = userAddress.substring(0, userAddress.indexOf(","));
		lon = userAddress.substring(userAddress.indexOf(",") + 1, userAddress.length);

		console.log("user is here: " + placeData.userAddress);


		//console.log("latitude: " + lat);
		//console.log("longitude: " + lon);
		//console.log(properties.userAddress);
		createMarker(lat, lon);
	});

	

	function createMarker(lat, lon){
		var myLatLng = new google.maps.LatLng(lat, lon);
		Marker = new google.maps.Marker({
			position: myLatLng,
			map: map
		}

	);
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

