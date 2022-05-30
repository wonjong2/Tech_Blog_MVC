// Variable to check if there is logout menu in navibar
const isLogin = document.querySelector('#logout');

// If there is the logout menu in navibar, which means it is the logged-in state.
// Login-state check timer will start only when it is the logged-in state
if (isLogin) {
    // Timer duration : 1 Hour and 10 Seconds
    let timeValue = 3610000;

    // Callback function to be called when the timer expires
    async function checkAuthStatus() {
        // Send GET request to the Server
        const response = await fetch('api/users/auth', {
            method: 'GET'
        });

        if (response.ok) {
            // It is the logged-in state, restart the timer
            clearTimeout(authCheckTimer);
            authCheckTimer = setTimeout(checkAuthStatus, timeValue);
        }
        else {
            // It is the logged-out state, show the user the message and redirect to the login page
            alert("Please login again to add, update or delete post/comment");
            document.location.replace('/login');
        }
    }

    var authCheckTimer = setTimeout(checkAuthStatus, timeValue);


    function restartAuthTimer() {
        clearTimeout(authCheckTimer);
        authCheckTimer = setTimeout(checkAuthStatus, timeValue);
    }
}