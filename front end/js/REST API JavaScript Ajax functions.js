function next() 
{
    // $.ajax(
    //     {
    //         url: "/next",
    //         type: 'GET',
    //         dataType: 'json',
    //         success: function(result)
    //         {
    //             //process result
    //         },
    //         error: function(e) {
    //             //do something about the error
    //         }
    //     }
    // )
    $.ajax(
        {
            url: "/json_dummy/thundercat.json",
            type: 'GET',
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

$('#next_song_button').onclick(
    next()
)

$('#signup_form').onclick(
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

$('#save_profile').onclick(
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

$('#delete_profile_button').onclick(
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