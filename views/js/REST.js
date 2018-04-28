function next(first_time) 
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
    var first_time = first_time;
    var choices = ['janelle', 'thundercat'];
    var choice = choices[Math.floor(Math.random()*choices.length)]
    $.ajax(
        {
            url: "/json_dummy/"+choice+".json",
            type: 'GET',
            dataType: 'json',
            success: function(data)
            {
                //process result
                // console.log(result);
                // var data = JSON.parse(result);
                song_info = data.song_info;
                if (song_info.genre == "Pop") 
                {
                    $('body').css('background', 'linear-gradient(to bottom, #ED4264, #FFCEBC)')
                }
                else if (song_info.genre == "Funk") 
                {
                    $('body').css('background', 'linear-gradient(to bottom, #45A247, #283C86)')
                }
                console.log(first_time);
                if (first_time == true)
                {
                    p5instance = new p5(s);
                }
                else 
                {
                    sound.stop();
                    sound = sketch_instance.loadSound(
                        song_info.audio, //resource to load
                        function(s) // callback function for success
                        {
                            s.setVolume(1.0);
                            s.play();
                        }, 
                        function(e){alert(e)} // callback function for error
                    );
                    albumart = sketch_instance.loadImage(song_info.cover);
                    sketch_vis_colors(sketch_instance);
                    vis.song_file = sound;
                    
                }
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