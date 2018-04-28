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
                unfave_animation();
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
                fave_animation();
            })
        }
    );
    
}