$(document).ready(function(){
    // the "href" attribute of .modal-trigger must specify the modal ID that wants to be triggered
    $('.modal').modal();
});

// // Initialize Firebase
// // firebase Roman
//   var config = {
//     apiKey: "AIzaSyAzrf8-HFMI0rYABhns7pYbWDA5No-w9mM",
//     authDomain: "test-project-3313e.firebaseapp.com",
//     databaseURL: "https://test-project-3313e.firebaseio.com",
//     storageBucket: "test-project-3313e.appspot.com",
//     messagingSenderId: "861837605444"
//   };
//   firebase.initializeApp(config);
//
// // Store database paths in global variables
// const database = firebase.database();
// const userData = firebase.database().ref("users/");
// const tripData = firebase.database().ref("trips/");
// const auth = firebase.auth();
//
// // When user's authentication status changes, show certain things on the site
// auth.onAuthStateChanged(firebaseUser => {
// 	if(firebaseUser){
// 		$('#user-trips').removeClass('hide');
// 		$('#signInModal').modal('close');
// 		$("#btnLogout").removeClass("hide");
// 		$("#sign-in-link").addClass("hide");
// 		$("#sign-up-link").addClass("hide");
// 		database.ref("users/" + firebaseUser.uid).once("value").then(function(snapshot) {
// 			if (snapshot.val() === null) {
// 				addUser();
// 			}
// 		});
// 		displayTrips();
// 	} else {
// 		$("#dashboard").addClass("hide");
// 		$("#user-trips").addClass("hide");
// 		$("#btnLogout").addClass("hide");
// 		$("#sign-in-link").removeClass("hide");
// 		$("#sign-up-link").removeClass("hide");
// 		$("#sign-in-title").text("Sign In");
// 		$("#btnLogin").removeClass("hide");
// 		$("#btnSignUp").addClass("hide");
// 		$("#back2Trips").addClass("hide");
// 		console.log("Not logged in");
// 	}
// });
//
// // Open sign-in modal upon user clicking "Sign In" button
// $("#sign-in-link").on("click", function(event) {
// 	event.preventDefault();
// 	$('#signInModal').modal();
// 	$('#sign-in-title').text("Sign In");
// 	$('#btnLogin').removeClass('hide');
// 	$('#btnSignUp').addClass('hide');
// 	$("#txtEmail").attr("value", "");
// 	$("#txtPassword").attr("value", "");
// });
//
// // Change sign-in modal if user clicks "Sign Up" button
// $("#sign-up-link").on("click", function(event) {
// 	event.preventDefault();
// 	$('#signInModal').modal();
// 	$('#sign-in-title').text("Sign Up");
// 	$('#btnLogin').addClass('hide');
// 	$('#btnSignUp').removeClass('hide');
// 	$("#txtEmail").attr("value", "");
// 	$("#txtPassword").attr("value", "");
// });
//
// // add login event
// $("#btnLogin").on("click", function(event){
// 	event.preventDefault();
// 	$('#signInModal').modal();
// 	const email = $("#txtEmail").val();
// 	const pass = $("#txtPassword").val();
// 	//sign in
// 	const promise = auth.signInWithEmailAndPassword(email, pass);
// 	promise.catch( e=> console.log(e.message));
// });
//
// // User sign up
// $("#btnSignUp").on("click", function(event){
// 	event.preventDefault();
// 	const email = $("#txtEmail").val();
// 	const pass = $("#txtPassword").val();
// 	//sign in
// 	//check for real email
// 	const promise = auth.createUserWithEmailAndPassword(email, pass).then(addUser());
// 	promise.catch( e=> console.log(e.message));
// });
//
// // User sign out
// $("#btnLogout").on("click", function(event){
// 	event.preventDefault();
// 	auth.signOut();
// 	$("#trip-list").empty();
// });
//
// // Add user to user object
//
// function addUser() {
// 	var userId = auth.currentUser.uid;
// 	var email = auth.currentUser.email;
// 	database.ref("users/" + userId).set({
// 		"email": email,
// 	});
// }
//
// // Display user's trips on login
//
// function displayTrips() {
// 	$("#trip-list").empty();
// 	var userId = auth.currentUser.uid;
// 	database.ref("users/" + userId + "/trips").once("value").then(function(snapshot) {
// 		snapshot.forEach(function(childSnapshot) {
// 			var tripId = childSnapshot.key;
// 			var location = childSnapshot.val();
//
// 			// Build HTML elements
//
// 			var tripTxt = $("<span>").attr({"class":"activate-dashboard", "data-id":tripId}).text(location);
// 			$("#trip-list").append(tripTxt);
// 		});
// 	});
// }
//
// // Display user's trips to delete
//
// function displayTripsDelete() {
// 	$("#deleteTrips").empty();
// 	var userId = auth.currentUser.uid;
// 	database.ref("users/" + userId + "/trips").once("value").then(function(snapshot) {
// 		snapshot.forEach(function(childSnapshot) {
// 			var tripId = childSnapshot.key;
// 			var location = childSnapshot.val();
//
// 			// Build HTML elements
//
// 			var tripTxt = $("<span>").attr({"class":"delete-trip", "data-id":tripId}).text(location);
// 			$("#deleteTrips").append(tripTxt);
// 		});
// 	});
// }
//
// $("#deleteATrip").on("click", function() {
// 	displayTripsDelete();
// });
//
// // Delete trip from database
//
// $(document).on("click", ".delete-trip", function() {
// 	var tripId = $(this).data("id");
// 	var userId = auth.currentUser.uid;
//
// 	database.ref("trips/" + tripId).remove();
// 	database.ref("users/" + userId + "/trips/" + tripId).remove();
//
// 	$("#removeTripModal").modal("close");
// 	displayTrips();
// });
//
// // Pull up Add Trip modal upon clicking "Add A Trip" button
//
// $("#add-trip-link").on("click", function(event) {
// 	event.preventDefault();
// 	$('#addTripModal').modal();
// });
//
// // Add a trip when someone fills out the form
//
// $("#set-location").on("click", function(event) {
// 	event.preventDefault();
// 	$("#trip-list").empty();
// 	var city = $("#trip-city").val().trim();
// 	var state = $("#trip-state").val().trim();
// 	var location = city + ", " + state;
// 	var dayLeaving = $("#trip-leaving").val().trim();
// 	var dayReturning = $("#trip-returning").val().trim();
// 	var userId = auth.currentUser.uid;
// 	var tripId = tripData.push().key;
//
// 	database.ref("trips/" + tripId).set({
// 		city: city,
// 		state: state,
// 		leaving: dayLeaving,
// 		returning: dayReturning,
// 		owner: userId
// 	});
//
// 	database.ref("users/" + userId + "/trips/" + tripId).set(
// 		location
// 	);
// 	$("#addTripModal").modal("close");
// 	$('#closeModal').modal('close');
// 	displayTrips();
// });
//
// // Take user back to trips screen
//
// $('#back2Trips').on("click", function(event){
// 	event.preventDefault();
// 	$('#user-trips').removeClass("hide");
// 	$("#dashboard").addClass("hide");
// 	$('#back2Trips').addClass("hide");
// 	emptyDash();
// });
//
// // Populate existing data from database upon clicking trip
//
// $(document).on("click", ".activate-dashboard", function(event) {
// 	event.preventDefault();
// 	var tripId = $(this).data("id");
// 	showDashboard(tripId);
// });
//
// // Empty Dashboard
//
// function emptyDash() {
// 	$("#city-name").empty();
// 	$("#trip-timeFrame").empty();
// 	$("#flightStatus").empty();
// 	$("#userHotel").empty();
// 	$("#userCar").empty();
// 	$("#userHotel").empty();
// }