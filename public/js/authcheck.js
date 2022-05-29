// Variable to check if there is logout menu in navibar
const isLogin = document.querySelector('#logout');

// If there is logout in navibar, it means the logged-in state.
// Login-state check timer will start only when logged-in state
if (isLogin) {
    let timeValue = 17000;
    async function checkAuthStatus() {
        const response = await fetch('api/users/auth', {
            method: 'GET'
        });

        if (response.ok) {
            clearTimeout(authCheckTimer);
            authCheckTimer = setTimeout(checkAuthStatus, timeValue);
        }
        else {
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