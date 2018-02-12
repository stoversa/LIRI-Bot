//node package requirements
require("dotenv").config();
var request = require("request");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
const keys = require("./keys.js");
const fs = require('fs');

//pulling keys
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

//application code proper
var command = process.argv[2];
let input = "";
// Capture all the words in the input (ignoring the first two Node arguments)
for (let i = 3; i < process.argv.length; i++) {
    // Build a string with the information
    input = input + " " + process.argv[i];
};

//This will show last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
    client.get('statuses/user_timeline', 'StoverDeveloper', function (error, tweets, response) {
        if (!error) {
            console.log("Here are your tweets: \n"); //inserts line between each tweet for legibility
            for (var x=0; x <= 19; x++){
                var thisTweet = tweets[x]; //grabs x tweet
                console.log(thisTweet.text); //grabs and console logs only tweet text
                console.log(thisTweet.created_at); //grabs and console logs only timestamp value
                console.log("__________________________\n"); //inserts line between each tweet for legibility
            };
        }
    });
};

//prints spotify information to the terminal/bash window
function spotifyThis(){
    spotify.search({ type: 'track', query: input, limit: 3 }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }
        // console.log(JSON.stringify(data, null, 2));
        var song = (data.tracks.items[0] || "No information available");
        var artists = song.artists;
        if (artists){
            artists.forEach(function (element) {
                console.log("Artist: " + element.name);
            }); //artist(s) name
        };
        console.log("Track Name: " + song.name || "No song information available"); //song name
        console.log("Preview Link: " + song.external_urls.spotify || "No preview link available");//preview link
        console.log("Album: " + song.album.name || "No album information available");//album song is from
        console.log("__________________________\n"); //inserts line between each tweet for legibility
    });
};

//outputs movie information to your terminal/bash window
function movieThis() {
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=trilogy", function (error, response, body) {
        if (!error && response.statusCode === 200) {
            var movie = JSON.parse(body);
            console.log("Here's some information about your movie: \n"); //inserts line between each tweet for legibility
            console.log("Title: " + (movie.Title || "No title available")); //Title of the movie.
            console.log("Year: " + (movie.Year || "No year available")); //Year the movie came out.
            console.log("IMDB Rating: " + (movie.imdbRating + "/10" || "No rating available"));//IMDB Rating of the movie.
            if (movie.Ratings[1]){
                console.log("Rotten Tomatoes Rating: " + movie.Ratings[1].Value); 
            }
            else {
                console.log("Rotten Tomatoes Rating: No Rotten Tomatoes Rating Available");
            } //Rotten Tomatoes Rating of the movie. This rating is not always included, hence the logic
            console.log("Country: " + (movie.Country || "No country information available")); //Country where the movie was produced.
            console.log("Language(s): " + (movie.Language || "No language available")); // Language of the movie. 
            console.log("Plot: " + (movie.Plot || "No plot information available"));// Plot of the movie. 
            console.log("Actors: " + (movie.Actors || "No actor information available")); // Actors in the movie. 
            console.log("__________________________\n"); //inserts line between each tweet for legibility
        }
    });
};
// Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
function doWhat() {

    fs.readFile('random.txt', 'utf8', function (error, data) {
        if (error) {
            return console.log(error);
        }
        var dataArr = data.split(",");
        //first statement in txt file is taken as the command, executes that function
        command = dataArr[0];
        input = dataArr[1];
        runCommand();
    });
};

//command function, which selects specific commands to run
function runCommand(){
switch (command) {
    case "my-tweets":
        myTweets();
        break;

    case "spotify-this-song":
        spotifyThis();
        break;

    case "movie-this":
        movieThis();
        break;

    case "do-what-it-says":
        doWhat();
        break;
    };
};

runCommand(); //executes intital command on run