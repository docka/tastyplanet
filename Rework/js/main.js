$(document).ready(function(){

    $( "#setting" ).on('click', function() {
      //$("#part1").append("whaaat");
      $("#part1").hide();
      $("#part3").hide();
      $("#part4").hide();
      $("#part2").show();

    });    

    $("#cook").on('click', function() {
      $("#part1").hide();
      $("#part2").hide();
      $("#part4").hide();
      $("#part3").show();


    }); 

    $("#book").on('click', function() {
      $("#part1").hide();
      $("#part2").hide();
      $("#part3").hide();
      $("#part4").show();

    //$('#text').fadeOut();
    //console.log("click")
   });


  //instagram feed

    // Function that is called once the data is returned
    function processImages(response) {
    // The variable "data" represents the information we got back.
    //find the image url: data.items[i].media.m
    //find the amount of loops: data.items.length
    	for (var i=0; i < response.data.length; i++) {
    		var url = response.data[i].images.low_resolution.url;
    		$("#images").append("<img src='" + url + "'>");
    		//    <img src="someadress.jpg">
    		//    <img src='someadress.jpg'>
   		}
  	}

	$('#search').click(function(){
		var hashtag = $('#hashtag').val();
		var url = "https://api.instagram.com/v1/tags/" + hashtag + "/media/recent?access_token=22702850.f59def8.6825c67f29e84bf8826b9cdd204743ed&callback=?";
		$.getJSON(url, processImages);
      $("#images img").remove();

  //instagram feed ends

});





});