const checkAuthStatus = async () => {
    const response = await fetch('api/users/auth', {
        method: 'GET'
    });

    if (response.ok) {
        clearTimeout(checkAuthCheck);
        authCheckTimer = setTimeout(checkAuthStatus, 15000);
    }
    else {
        alert("Please login again to add, update or delete post/comment");
        document.location.replace('/login');
    }
}

let authCheckTimer = setTimeout(checkAuthStatus, 15000);

const submitCommentHandler = async (event) => {
    event.preventDefault();

    // Collect values from the edit form
    const comment = document.querySelector('#comment').value.trim();
    const post_id = document.querySelector('.post-card').dataset.postId;

    if (comment && post_id) {
        // Send a PUT request to the API endpoint
        const response = await fetch('/api/comments/', {
            method: 'POST',
            body: JSON.stringify({ comment, post_id }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace(`/${post_id}`);
        } else {
            alert(response.statusText);
        }
    }
}

document
    .querySelector('#submit-comment-button')
    .addEventListener('click', submitCommentHandler);