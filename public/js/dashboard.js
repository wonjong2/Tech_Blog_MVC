async function checkAuthStatus() {
    const response = await fetch('api/users/auth', {
        method: 'GET'
    });

    if (response.ok) {
        clearTimeout(authCheckTimer);
        authCheckTimer = setTimeout(checkAuthStatus, 15000);
    }
    else {
        alert("Please login again to add, update or delete post/comment");
        document.location.replace('/login');
    }
}

var authCheckTimer = setTimeout(checkAuthStatus, 5000);

const newPostHandler = (event) => {
    const dashboardEl = document.querySelector('#dashboard');
    const newPostFormEl = document.querySelector('#new-post-form');

    dashboardEl.style.display = 'none';
    newPostFormEl.style.display = 'block';
};

const createPostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const title = document.querySelector('#title-post').value.trim();
    const content = document.querySelector('#content-post').value.trim();

    if (title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch('/api/posts/', {
            method: 'POST',
            body: JSON.stringify({ title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        clearTimeout(checkAuthCheck);
        authCheckTimer = setTimeout(checkAuthStatus, 15000);

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

const selectedPostHandler = async (event) => {
    const id = event.target.dataset.postId ? event.target.dataset.postId : event.target.parentElement.dataset.postId;

    if (id) {
        clearTimeout(authCheckTimer);
        authCheckTimer = setTimeout(checkAuthStatus, 15000);
        document.location.assign(`/dashboard/${id}`);
    }
};

document
    .querySelector('#dashboard')
    .addEventListener('click', selectedPostHandler);

document
    .querySelector('#new-post')
    .addEventListener('click', newPostHandler);

document
    .querySelector('.create-post-form')
    .addEventListener('submit', createPostHandler);