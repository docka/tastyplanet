user = null;
userAddress = null;
userName = null;

$(document).ready(function(){
    $( "#setting" ).on('click', function() {
      //$("#part1").append("whaaat");
      $("#part1").hide();
      $("#part3").hide();
      $("#part4").hide();
      $("#part2").show();
      $("#part5").hide();

    });    

    $("#cook").on('click', function() {
      $("#part1").hide();
      $("#part2").hide();
      $("#part4").hide();
      $("#part3").show();
      $("#part5").hide();


    }); 

    $("#loginBtn").on('click', function() {
      $("#part1").hide();
      $("#part2").hide();
      $("#part3").hide();
      $("#part4").hide();
      $("#part5").show();
    }); 

    $("#book").on('click', function() {
      $("#part1").hide();
      $("#part2").hide();
      $("#part3").hide();
      $("#part4").show();
      $("#part5").hide();
      // nasty hack that makes the map load properly
      google.maps.event.trigger(map, 'resize');
    //$('#text').fadeOut();
    //console.log("click")
   });

    // Login section
    $('.loginBtn').on('click', function() {
      var email = $('#login .email').val();
      var password = $('#login .password').val();
      // make sure the user specified a email & password
      if (email && password) {
        auth.login('password', {
          email: email,
          password: password
        });
      } else {
        alert("You need to specify an email and password.")
      }
    });

    // Create account section
    $('.createAccountBtn').on('click', function() {
      var email = $('#create-account .email').val();
      var password = $('#create-account .password').val();
      var passwordConfirmation = $('#create-account .password-confirm').val();
      // make sure the user specified a email & password
      if (email && password && passwordConfirmation) {
        // Make sure that both passwords are the same
        if (password === passwordConfirmation) {
          auth.createUser(email, password, function(error, user) {
            if (!error) {
              $("#part1").hide();
              $("#part3").hide();
              $("#part4").hide();
              $("#part2").show();
              $("#part5").hide();
              auth.login('password', {
                email: email,
                password: password
              });
              console.log('User Id: ' + user.id + ', Email: ' + user.email);
            } else {
              alert(error);
            }
          });
        } else 
        {
          alert("The supplied passwords don't match");
        }
      } else {
        alert("You need to specify an email and a password.");
      }
    });

    $('#logout').on('click', function() {
      $("#part1").show();
      $("#part3").hide();
      $("#part4").hide();
      $("#part2").hide();
      $("#part5").hide();
      auth.logout();
    });


    var myProfileRef = new Firebase('https://tastyplanetse.firebaseio.com/profiles');
    $('#userAddressInput').keypress(function (e) {
      if (e.keyCode == 13) {
        saveProfile();          
      }
    });

    $('#saveProfileBtn').on('click', function (e) {
        saveProfile();          
    });

    function saveProfile() {
      var userName = $('#userNameInput').val();
      var userAddress = $('#userAddressInput').val();
      //var userFavourites = $('Favourites').val();
      myProfileRef.set({userName: userName, userAddress: userAddress}); 
    }

    // Firebase logic for logging in
    var auth = new FirebaseSimpleLogin(myProfileRef, function(error, user) {
      if (error) {
        // an error occurred while attempting login
        alert(error);
      } else if (user) {
        // user authenticated with Firebase
        // If the user is logged in, then show all the buttons accessible when you are logged in.
        $('#logged-out-actions').hide();
        $('#logged-in-actions').show();
        this.user = user;

        // The firebase URL should now be set to the specific user's id.
        // For example, if I am user 6
        // then my 'profile url' will be at /profiles/6
        myProfileRef = new Firebase('https://tastyplanetse.firebaseio.com/profiles/' + user.id);
        myProfileRef.on('value', handleProfileChange);
        console.log('User ID: ' + user.id + ', Provider: ' + user.provider);
      } else {
        // If the user is logged out, then show all the buttons accessible when you are logged out.
        $('#logged-out-actions').show();
        $('#logged-in-actions').hide();
        // user is logged out
      }
    });

    // This function is called anytime the user's profile is updated
    // in firebase. In this case, it will update any time you
    // go into the "me" section, and save your profile.
    function handleProfileChange(snapshot) {
        var profile = snapshot.val();
        userName = profile.userName;
        userAddress = profile.userAddress;
        $('#userNameInput').val(profile.userName);
        $('#userAddressInput').val(profile.userAddress);
    }



    var myDinnerRef = new Firebase('https://tastyplanetse.firebaseio.com/dinners');
    $('#messageInput').keypress(function (e) {
      if (e.keyCode == 13) {
        saveDinner();
      }
    });

    $('#saveDinnerBtn').on('click', function (e) {
        saveDinner();
    });

    function saveDinner() {
      var dinnerName = $('#dinnerNameInput').val();
      var dateTime = $('#dateTimeInput').val();
      var userId = $('#userIdInput').val();
      var maxSeats = $('#seatsNameInput').val();
      //console.log(tastyplanetse.dinners.userAddress)
      var message =$('#messageInput').val();
      // Try geocoding the address, and then saving it to firebase!
      codeAddress(userAddress, function(error, address) {
        if (error) {
          alert(error)
        } else {
          console.log("dinner saved!");
          myDinnerRef.push({dinnerName: dinnerName, dateTime: dateTime, userId: user.id, lat: address.lb, lng: address.mb, address: userAddress, userName: userName, maxSeats: maxSeats, message: message});
        }
      });
    }

    $('#map_canvas').on('click', '.bookListingBtn', function() {
      // Make sure you are logged in
      if(user) {
        // The booking id is in the html as a data attribute.
        // You can see it somewhere like <button data-id='-J7Qerwerwer'>Book</button>
        // Check the web inspector. You'll see it.
        var dinnerId = $(this).data('id');
        alert("You are making a booking! Modify this part of the code if you want to do something magical here.")
        // Store the user as a guest. Save the time that they "booked at" 
        var dinnerRef = new Firebase('https://tastyplanetse.firebaseio.com/dinners/' + dinnerId + '/guests/' + user.id);
        dinnerRef.set({bookedAt: Firebase.ServerValue.TIMESTAMP })
      } else {
        alert("You must be logged in to make a booking.");
      }
    })

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