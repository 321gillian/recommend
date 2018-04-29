function toggle_side_menu()
{
    $('#main-side-bar').toggleClass('revealed-side-bar');
    $('#user-menu-button-image').toggleClass('transparent-button');
}

function save_profile()
{
    $.ajax(
        {
            url: "/profile",
            type: 'PUT',
            data: $("#profile_edit_form").serialize(),
            dataType: 'json',
            success: function(result)
            {
                // process result
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
                // process result
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
                // process result
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
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
                // process result
            },
            error: function(e) {
                //do something about the error
                alert('Something went wrong!'+'\n'+e);
            }
        }
    )
}