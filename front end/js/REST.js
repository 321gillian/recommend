'use strict';
function next(first_time) 
{
    var first_time = first_time;
    var choices = ['janelle', 'thundercat', 'bowie', 'parton', 'haim', 'grace'];
    var choice = choices[Math.floor(Math.random()*choices.length)];
    $.ajax(
        {
            // url: "/next",
            // type: 'GET',
            // dataType: 'json',
            // success: function(data)
            url: "/json_dummy/"+choice+".json",
            type: 'GET',
            dataType: 'json',
            success: function(data)
            {
                next_song_animation(data, first_time);
            },
            error: function(e) {
                //do something about the error
            }
        }
    )
}

$('#signup-form').click(
    function () 
    {
        $.ajax(
            {
                url: "/profile/",
                type: 'POST',
                data: $("#signup_form").serialize(),
                dataType: 'json',
                success: function(result)
                {
                    //process result
                },
                error: function(e) {
                    //do something about the error
                }
            }
        )
    }
);

$('#save-profile').click(
    function () 
    {
        $.ajax(
            {
                url: "/profile/",
                type: 'PUT',
                data: $("#profile_edit_form").serialize(),
                dataType: 'json',
                success: function(result)
                {
                    //process result
                },
                error: function(e) {
                    //do something about the error
                }
            }
        )
    }
);

$('#delete_profile_button').click(
    function()
    {
        $.ajax(
            {
                url: "/profile/",
                type: 'DELETE',
                data: $("#profile_delete_form").serialize(),
                dataType: 'json',
                success: function(result)
                {
                    //process result
                },
                error: function(e) {
                    //do something about the error
                }
            }
        )
    }
)