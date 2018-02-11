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
var input = process.argv[3];

//This will show last 20 tweets and when they were created at in your terminal/bash window.
function myTweets(){
    client.get('statuses/user_timeline', 'StoverDeveloper', function (error, tweets, response) {
        if (!error) {
            for (var x=0; x <= 19; x++){
                var thisTweet = tweets[x]; //grabs x tweet
                var timestamp = thisTweet.created_at //grabs only timestamp value
                var tweetText = thisTweet.text //grabs only tweet text
                console.log(tweetText);
                console.log(timestamp);
                console.log("__________________________\n"); //inserts line between each tweet for legibility
            };
        }
    });
};

//prints spotify information to the terminal/bash window
function spotifyThis(){
    console.log("spotifyThis");
    /*
    * Artist(s)
    * The song's name
    * A preview link of the song from Spotify
    * The album that the song is from
 */
};

//outputs movie information to your terminal/bash window
function movieThis() {
    console.log("movieThis");
    /* This will output the following information to your terminal/bash window:

   * Title of the movie.
   * Year the movie came out.
   * IMDB Rating of the movie.
   * Rotten Tomatoes Rating of the movie.
   * Country where the movie was produced.
   * Language of the movie.
   * Plot of the movie.
   * Actors in the movie. */
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