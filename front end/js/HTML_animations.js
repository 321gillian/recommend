function fave_animation()
{
    liked = true;
    $("#main-fave-button").removeClass('unfaved');
    $("#main-fave-button").addClass('faved');

    $("#main-fave-button").animate(
        {
            // put css to change to here
            // 'width': ''+$('#main-fave-button').width()*1.1,
            // 'height': ''+$('#main-fave-button').height()*1.1,
        }, 
        200,
        function ()
        {
            // perform some action when animation finishes?
            $("#main-fave-button").animate(
                {
                    // put css to change to here
                    // 'width': ''+$('#main-fave-button').width()/1.1,
                    // 'height': ''+$('#main-fave-button').height()/1.1
                }, 
                200,
            );
            $("#main-fave-button").prop('onclick',null).off('click');
            $("#main-fave-button").on('click', function()
            {
                unfavourite(song_info.id);
            })
        }
    );
}

function unfave_animation()
{
    liked = false;
    $("#main-fave-button").removeClass('faved');
    $("#main-fave-button").addClass('unfaved');
    $("#main-fave-button").animate(
        {
            // put css to change to here
            // 'width': ''+$('#main-fave-button').width()*1.1,
            // 'height': ''+$('#main-fave-button').height()*1.1,
        }, 
        200,
        function ()
        {
            // perform some action when animation finishes?
            $("#main-fave-button").animate(
                {
                    // put css to change to here
                    // 'width': ''+$('#main-fave-button').width()/1.1,
                    // 'height': ''+$('#main-fave-button').height()/1.1
                }, 
                200,
            );
            $("#main-fave-button").prop('onclick',null).off('click');
            $("#main-fave-button").on('click', function()
            {
                favourite(song_info.id);
            })
        }
    );
    
}

function next_song_animation(first_time)
{

    // TODO: make the heart red if the next track is in the user's faves!


    var genre_color_dict = {
        "Pop": "linear-gradient(to bottom, #ED4264, #FFCEBC)",
        "Funk": "linear-gradient(to bottom, #45A247, #283C86)",
        "Electronica": "linear-gradient(to bottom, #5C258D, #4389A2)",
        "Rock": "linear-gradient(to bottom, #DCE35B, #45B649)",
        "Folk": "linear-gradient(to bottom, #43C6AC, #F8FFAE)",
        "Alternative": "linear-gradient(to bottom, #005AA7, #FFFDE4)"
    }

    $('#bg').addClass(song_info.genre);
    
    setTimeout(function () {
        $('body').css(
            'background-image', genre_color_dict[song_info.genre]
        );
        $('#bg').removeClass();
    }, 1000)

    if (first_time == true)
    {
        p5instance = new p5(s);
    }
    else 
    {
        unfave_animation();
        $('#song-info-div').fadeOut(
            200,
            function () 
            {
                $(this).remove();
            }
        );
        if (x_offset < (sketch_instance.width - (sketch_instance.height*scale_const)*1.5)/2) {
            moving = true;
            draw_function = next_track_reset_draw;
            liked = false;
            vis.song_file.stopAll();
            // vis.song_file.remove();
            vis.song_file.dispose();
            // vis.fft.remove();
            vis.fft.dispose();
            vis = new Visualiser();
            albumart = sketch_instance.loadImage(song_info.cover);
            sketch_vis_colors();
            sketch_instance.fill(240);
            sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
            sketch_instance.fill(vc1);
            sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
            vis.last_frame = sketch_instance.get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
        }
        else {
            vis.song_file.stopAll();
            vis.song_file.dispose();
            vis.fft.dispose();
            albumart = sketch_instance.loadImage(song_info.cover);
            vis = new Visualiser();
            liked = false;
            sketch_vis_colors();
            sketch_instance.fill(240);
            sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
            sketch_instance.fill(vc1);
            sketch_instance.rect(vis.zx, vis.zy, vis.w, vis.h);
            vis.last_frame = sketch_instance.get(vis.zx,vis.zy+1,vis.w,vis.h-vis.speed);
        }
        
    }
}