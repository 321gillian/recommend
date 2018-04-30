//
// functions for toggling between the various side bar menus
//

// toggle the main side menu (for when the user is logged in only)
// the class 'revealed-side-bar' just adds the transform/translation to bring the menu in from offscreen
function toggle_side_menu()
{
    $('#main-side-bar').toggleClass('revealed-side-bar');
    $('#user-menu-button-image').toggleClass('transparent-button');
}

// switches between the main side menu and the profile one
// called when clicking the cog in the avatar and when the back button
// is pressed in the Profile settings menu
// the class 'revealed-side-bar' just adds the transform/translation to bring the menu in from offscreen
function switch_between_main_and_profile()
{
    $('#main-side-bar').toggleClass('revealed-side-bar');
    $('#profile-side-bar').toggleClass('revealed-side-bar');
}

// switches between the profile settings side menu and the change password one
// called when clicking the change password button, when the back button
// is pressed in the change password menu and when the user successfully changes their password.
// NOTE: the last of these three has not yet been implemented
// the class 'revealed-side-bar' just adds the transform/translation to bring the menu in from offscreen
function switch_between_profile_and_password()
{
    $('#profile-side-bar').toggleClass('revealed-side-bar');
    $('#password-side-bar').toggleClass('revealed-side-bar');
}

// toggle the login side menu (for when the user is NOT logged in)
// this should be the onclick property for the user icon in the
// top right if the user is not logged in
// the class 'revealed-side-bar' just adds the transform/translation to bring the menu in from offscreen
function toggle_login_menu()
{
    $('#login-side-bar').toggleClass('revealed-side-bar');
    $('#user-menu-button-image').toggleClass('transparent-button');
}

// switches between the login side menu and the sign up one
// the class 'revealed-side-bar' just adds the transform/translation to bring the menu in from offscreen
function switch_between_login_and_signup()
{
    $('#login-side-bar').toggleClass('revealed-side-bar');
    $('#signup-side-bar').toggleClass('revealed-side-bar');
}




function get_favourites()
{
    $.ajax
    (
        {
            url: "/favourites",
            type: 'GET',
            dataType: 'json',
            success: function(data)
            {
                // process result
                // data should look something like this:

                // { "status": 200,
                //      "favourites": [
                //          { ... song ... },
                //          { ... song ... },
                //          { ... song ... },
                //          { ... song ... }
                //      ]
                // }
                
                // clear the favourites box
                $('#favourites-container').empty();
                var favourites = data.favourites;
                if (favourites.length > 0)
                {
                    for (var i = 0; i < favourites.length; i++)
                    {
                        var song = favourites[i];
                        $('#favourites-container').append(
                            '<div class="col-12 liked-song">' +
                                '<div class="col-2">' +
                                    '<i class="fas fa-times-circle" onclick="unfavourite(' + song.id + ')"></i>' +
                                '</div>' +
                                '<div class="col-8">' +
                                    '<h4>' + song.title + '</h4>' +
                                    '<p>' + song.artist + ' | ' + song.album + ' (' + song.year + ')</p>' +
                                '</div>' +
                                '<div class="col-2">'+
                                    '<i class="fas fa-eye" onclick="play_specific_song(' + song.id + ');"></i>' +
                                '</div>' +
                            '</div>'
                        );
                    }
                    $('#favourites-container').append(
                        '<div class="col-12">' +
                            '<div id="end-of-faves-dash"></div>' +
                        '</div>' +
                        '<div class="col-12">' +
                            '<p>That\'s all folks!</p>' +
                        '</div>'
                    );
                }
                else
                {
                    $('#favourites-container').append(
                        '<p>' +
                            'Nothing here yet...<br>' +
                            'When you find something you like, press the heart and it will show up here!' +
                        '</p>'
                    );
                }
            },
            error: function(e) 
            {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function save_profile()
{
    $.ajax(
        {
            url: "/profile",
            type: 'PUT',
            data: $("#profile-form").serialize(),
            dataType: 'json',
            success: function(result)
            {
                // process result eg. little alert banner to say changes successful/profile updated!
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function update_avatar_preview(event) {
    var reader = new FileReader();
    reader.onload = function()
    {
        var output = document.getElementById('avatar-preview');
        output.src = reader.result;
    }
    reader.readAsDataURL(event.target.files[0]);
}

function update_password()
{
    $.ajax(
        {
            url: "/update_password",
            type: 'PUT',
            data: $("#password-form").serialize(),
            dataType: 'json',
            success: function(result)
            {
                // process result eg. little alert banner to say changes successful
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function signup()
{
    $.ajax(
        {
            url: "/signup",
            type: 'POST',
            data: $("#signup_form").serialize(),
            dataType: 'json',
            success: function(result)
            {
                // process result eg. little alert banner to say signup successful
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function login()
{
    $.ajax(
        {
            url: "/login",
            type: 'POST',
            data: $("#login_form").serialize(),
            dataType: 'json',
            success: function(result)
            {
                // process result eg. little alert banner to say login successful
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}

function confirm_delete_profile()
{
    $('#delete-profile-button').prop('onclick', null);
    $('#delete-profile-button').html('CONFIRM DELETE');
    $('#delete-profile-button').click(delete_profile);
}

function delete_profile()
{
    $.ajax(
        {
            url: "/profile",
            type: 'DELETE', // backend should take session's user's id to find the user to delete
            dataType: 'json',
            success: function(result)
            {
                // process result eg. log the user out and maybe reload the page to reset everything?
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}