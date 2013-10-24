$(document).ready(function(){
	var map = L.mapbox.map('map', 'tastyplanetse.map-mnphjjx4');
	var json = null;

	var placeListRef = new Firebase("https://tastyplanetse.firebaseio.com/dinners")
	placeListRef.on('child_added', function(snapshot){
		var placeData = snapshot.val();
		//console.log(properties.userAddress);
		createMarker(placeData);
	});

	function createMarker(properties) {
		var marker = L.marker([userAddress]).addTo(map);
		marker.bindPopup(properties.dinnerName, properties.userAddress, properties.dateTime, properties.userId, properties.message).openPopup();
	};

});