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

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
};

document
    .querySelector('#new-post')
    .addEventListener('click', newPostHandler);

document
    .querySelector('.create-post-form')
    .addEventListener('submit', createPostHandler);