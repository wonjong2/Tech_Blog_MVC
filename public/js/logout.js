// var authCheckTimer = setTimeout(checkAuthStatus, 15000);

const logoutHandler = async (event) => {
    event.preventDefault();

    console.log("logoutHandler");
    const response = await fetch('/api/users/logout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// const checkAuthStatus = async () => {
//     const response = await fetch('api/users/auth', {
//         method: 'GET'
//     });

//     if (response.ok) {
//         clearTimeout(checkAuthCheck);
//         authCheckTimer = setTimeout(checkAuthStatus, 15000);
//     }
//     else {
//         alert("Please login again to add, update or delete post/comment");
//     }
// }

document
    .querySelector('#logout')
    .addEventListener('click', logoutHandler);