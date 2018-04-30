'use strict';
function next(first_time) 
{
    // the next three lines are for demo purposes only
    // remove them when ajax is set up
    var first_time = first_time;
    var choices = ['janelle', 'thundercat', 'bowie', 'parton', 'haim', 'grace'];
    var choice = choices[Math.floor(Math.random()*choices.length)];
    $.ajax(
        {
            // url: "/next",
            // type: 'GET',
            // dataType: 'json',     // uncomment this section when connecting front end to back end
            // success: function(data)
            url: "/json_dummy/"+choice+".json",
            type: 'GET',             // delete these three when connecting front end to back end
            dataType: 'json',
            success: function(data)
            {
                var song = data.song_info;
                next_song_animation(song, first_time);
            },
            error: function(e) {
                //do something about the error
            }
        }
    )
}

function favourite(songID)
{
    fave_animation();
    $.ajax
    (
        {
            url: "/fave?songID="+songID,
            type: 'POST',
            dataType: 'json',
            success: function(data)
            {
                // process result
                if (typeof data.success != "undefined")
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

function play_specific_song(songID, first_time)
{
    var first_time = first_time;
    var choices = ['janelle', 'thundercat', 'bowie', 'parton', 'haim', 'grace'];
    var choice = choices[songID];
    $.ajax
    (
        {
            url: "/play?songID="+songID,
            type: 'GET',
            dataType: 'json',
            success: function(result)
            {
                // process result
                var song = result.song_info;
                next_song_animation(song);
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

