function reset_track_layout()
{
    $('track_container').animate(
        // slide the track container to the left
        {
            // put css to change to here
            'margin-left': "50px",            
        }, 
        250,
        function ()
        {
            // perform some action when animation finishes?
        }
    )
}

function next()
{
    reset_track_layout();
    $.ajax
    (
        {
            url: "/next",
            type: 'GET',
            dataType: 'json',
            success: function(result)
            {
                // process result
                /* 
                The variable "song" will be an object
                containing the track info from the JSON and the individual
                fields are accessible using the following syntax:
                song['title'] for the Thundercat track would return "Show You the Way"
                the "pitchforkReview" field is a dictionary itself, with
                its own fields, they can be accessed by adding another ['query']
                song['pitchforkReview']["score"] would return 8.5
                fields can also be accessed by using object-oriented syntax like so:
                song.title would return "Show You the Way"
                song.pitchforkReview.score would return 8.5
                */
                // JSON.parse() is a part of the built-in library to convert raw JSON 
                // returned from the server into an object
                var song = JSON.parse(result);
                $('#song_title').innerText = song.title;
                $('#song_artist').innerText = song.artist;
                $('#song_albumTitle').innerText = song.albumTitle;
                $('#song_albumYear').innerText = song.albumYear;
                $('#song_spotifyLink').setAttribute('href') = song.spotifyLink;
                $('#song_googleMusicLink').setAttribute('href') = song.googleMusicLink;
                $('#song_pitchforkReviewLink').setAttribute('href') = song.pitchforkReviewLink;
                $('#song_albumArt').setAttribute('src') = song.albumArtURL;
                $('#song_review_score').innerText = song.pitchforkReview.score;
                $('#song_review_editorial').innerText = song.pitchforkReview.editorial;
                $('#song_review_author').innerText = song.pitchforkReview.author;
                $('#song_review_date').innerText = song.pitchforkReview.date;
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function reveal_track()
{
    $('track_container').animate(
        // slide the track container to the left
        {
            // put css to change to here
            'margin-left': "20px",
        }, 
        250,
        function ()
        {
            // perform some action when animation finishes?
        }
    )
}

function favourite(songID)
{
    reveal_track();
    $.ajax
    (
        {
            url: "/fave?songID="+songID,
            type: 'POST',
            dataType: 'json',
            success: function(result)
            {
                // process result
                var response = JSON.parse(result);
                if (typeof response.success != "undefined")
                {
                    // it worked!
                }
                else
                {
                    alert('Something went wrong!');
                }
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    );
}

function unfavourite(songID)
{
    $.ajax
    (
        {
            url: "/unfave?songID="+songID,
            type: 'DELETE',
            dataType: 'json',
            success: function(result)
            {
                // process result
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function play_specific_song(songID)
{
    reset_track_layout();
    $.ajax
    (
        {
            url: "/play?songID="+songID,
            type: 'GET',
            dataType: 'json',
            success: function(result)
            {
                // process result
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}