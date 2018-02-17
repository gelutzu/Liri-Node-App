require("dotenv").config();

switch (process.argv[2]) {
    case "my-tweets":
        twitterFunc();
        break;
    case "spotify-this-song":
        spotifyFunc();
        break;
    case "movie-this":
        movie();
        break;
    case "do-what-it-says":
        random();
        break;
    default:
        random();
}

// Movie function
function movie(title) {

    var i = 3;
    var movieName = "";
    var fs = require("fs");

    if (!title) {

        while (process.argv[i] !== undefined) {
            movieName += process.argv[i] + " ";
            i++;
        }

        if (process.argv[3] === undefined) {
            movieName = "Mr. Nobody";
        }
    } else {
        movieName = title;
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";

    var request = require("request");

    request(queryUrl, function(error, response, body) {

        if (!error && response.statusCode === 200) {

            console.log("The movie's title is: " + JSON.parse(body).Title);
            console.log("The movie's year is: " + JSON.parse(body).Year);
            console.log("The movie's imdbRating is: " + JSON.parse(body).imdbRating);
            console.log("The movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value);
            console.log("The movie was produced in: " + JSON.parse(body).Country);
            console.log("The movie's language is: " + JSON.parse(body).Language);
            console.log("The movie's plot is: " + JSON.parse(body).Plot);
            console.log("The movie's actors are: " + JSON.parse(body).Actors);

            fs.appendFile("log.txt", " \nThe movie's title is: " + JSON.parse(body).Title, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's year is: " + JSON.parse(body).Year, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's imdbRating is: " + JSON.parse(body).imdbRating, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's Rotten Tomatoes rating is: " + JSON.parse(body).Ratings[1].Value, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie was produced in: " + JSON.parse(body).Country, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's language is: " + JSON.parse(body).Language, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's plot is: " + JSON.parse(body).Plot, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
            fs.appendFile("log.txt", " \nThe movie's actors are: " + JSON.parse(body).Actors, function(err) {
                if (err) {
                    return console.log(err);
                }
            });
        }
    });
}

// Twitter function
function twitterFunc() {
    var fs = require("fs");

    for (var i = 0; i < 5; i++) {
        (function(i) {
            var Twitter = require('twitter');

            var client = new Twitter({
                consumer_key: process.env.TWITTER_CONSUMER_KEY,
                consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
                access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
            });
            var params = { screen_name: 'george horo', count: 5 };

            client.get('statuses/user_timeline', params, function(error, tweets, response) {
                if (!error) {
                    //console.log(tweets);
                    console.log(tweets[i].text);
                    console.log(tweets[i].created_at);
                    fs.appendFile("log.txt", "\n" + tweets[i].text, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });
                    fs.appendFile("log.txt", "\n" + tweets[i].created_at, function(err) {
                        if (err) {
                            return console.log(err);
                        }
                    });

                }
            });
        })(i)
    }
}

// Spotify function
function spotifyFunc(title) {

    var fs = require("fs");
    var Spotify = require('node-spotify-api');
    var spotify = new Spotify({
        id: process.env.SPOTIFY_ID,
        secret: process.env.SPOTIFY_SECRET
    });

    var i = 3;
    var songName = "";

    if (!title) {

        while (process.argv[i] !== undefined) {
            songName += process.argv[i] + " ";
            i++;
        }

        if (process.argv[3] === undefined) {
            songName = "All that she wants";
        }

    } else {
        songName = title;
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log("The Artist : " + data.tracks.items[0].artists[0].name);
        console.log("The name of the song: " + data.tracks.items[0].name);
        console.log("Preview link: " + data.tracks.items[0].preview_url);
        console.log("The album: " + data.tracks.items[0].album.name);

        fs.appendFile("log.txt", " \nThe name of the song: " + data.tracks.items[0].name, function(err) {
            if (err) {
                return console.log(err);
            }
        });
        fs.appendFile("log.txt", " \nThe Artist : " + data.tracks.items[0].artists[0].name, function(err) {
            if (err) {
                return console.log(err);
            }
        });
        fs.appendFile("log.txt", " \nPreview link: " + data.tracks.items[0].preview_url, function(err) {
            if (err) {
                return console.log(err);
            }
        });
        fs.appendFile("log.txt", " \nThe album: " + data.tracks.items[0].album.name, function(err) {
            if (err) {
                return console.log(err);
            }
        });
    });
}

// Random function reads from a text file
function random() {

    var fs = require("fs");
    fs.readFile("random.txt", "utf8", function(error, data) {

        if (error) {
            return console.log(error);
        }
        console.log(data);
        //var dataArr = data.split(",");
        var dataArr = data.split("\n");
        //var data2 = data1.split("\r");
        //dataArr = data.split("\n");
        var data0 = dataArr[0];
        var data1 = dataArr[1];
        var rowSplit1 = data0.split(",");
        var rowSplit2 = data1.split(",");

        //console.log(rowSplit1);
        //console.log(rowSplit2);

        if (Math.floor(Math.random() * 2) === 0) {
            arg1 = rowSplit1[0];
            arg2 = rowSplit1[1].split('"').join('');
            console.log(arg1);
            console.log(arg2);
        } else {
            arg1 = rowSplit2[0];
            arg2 = rowSplit2[1].split('"').join('');
            console.log(arg1);
            console.log(arg2);
        }

        switch (arg1) {
            case "my-tweets":
                twitterFunc();
                break;
            case "spotify-this-song":
                spotifyFunc(arg2);
                break;
            case "movie-this":
                movie(arg2);
                break;
        }

    });

}