//initialize firebase
var config = {
    apiKey: "AIzaSyBXqFf0OzgkDyeqLzQ--E7wSHjfaj9haRE",
    authDomain: "train-schedule-73bb1.firebaseapp.com",
    databaseURL: "https://train-schedule-73bb1.firebaseio.com",
    projectId: "train-schedule-73bb1",
    storageBucket: "train-schedule-73bb1.appspot.com",
    messagingSenderId: "627803682849"
};
firebase.initializeApp(config);

var database = firebase.database();

// button to add new trains

$("#add-train-btn").on("click", function (event) {
    event.preventDefault();

    var trainName = $("#train-name-input").val().trim();
    var trainDestination = $("#destination-input").val().trim();
    var trainTime = $("#time-input").val().trim();
    var trainFrequency = $("#frequency-input").val().trim();

    var newTrain = {
        name: trainName,
        destination: trainDestination,
        time: trainTime,
        frequency: trainFrequency
    };

    database.ref().push(newTrain);

    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.time);
    console.log(newTrain.frequency);

    // alert("New train was succesfully added.");

    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#time-input").val("");
    $("#frequency-input").val("");
});

//Using a firebase event to add the new train to the database and a row to the table

database.ref().on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    var trainName = childSnapshot.val().name;
    var trainDestination = childSnapshot.val().destination;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    console.log(trainName);
    console.log(trainDestination);
    console.log(trainTime);
    console.log(trainFrequency);

//calculating out the time to see when the next train arrives

var firstTrain = "3:30";

var firstTimeConverted = moment(firstTrain, "HH:mm").subtract(1,"years");
console.log(firstTimeConverted);

var currentTime = moment();
console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
console.log("DIFFERENCE IN TIME: " + diffTime);

var tRemainder = diffTime % trainFrequency;
console.log(tRemainder);

var tMinutesTillTrain = trainFrequency - tRemainder;
console.log("MINUTES TILL TRAIN " +tMinutesTillTrain);

trainTime = moment().add(tMinutesTillTrain, "minutes");
console.log("ARRIVAL TIME: " +moment(nextTrain).format("hh:mm"))

//new row
    var newRow = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(trainDestination),
        $("<td>").text(trainTime),
        $("<td>").text(trainFrequency),
        $("<td>").text(tMinutesTillTrain),
    );
// appending the new row to the table
    $("#train-table > tbody").append(newRow);
})