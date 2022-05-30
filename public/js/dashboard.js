// Event handler for the new post button click
const newPostHandler = (event) => {
    const dashboardEl = document.querySelector('#dashboard');
    const newPostFormEl = document.querySelector('#new-post-form');

    dashboardEl.style.display = 'none';
    newPostFormEl.style.display = 'block';
};

// Event handler for the create button click
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
        if (isLogin) {
            restartAuthTimer();
        }

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

// Event handlers for the clicking on the specific post in the dashboard page 
const selectedPostHandler = async (event) => {
    const id = event.target.dataset.postId ? event.target.dataset.postId : event.target.parentElement.dataset.postId;

    if (id) {
        if (isLogin) {
            restartAuthTimer();
        }
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