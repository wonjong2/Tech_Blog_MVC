const updatePostHandler = async (event) => {
    event.preventDefault();

    // Collect values from the login form
    const id = document.querySelector('.card').dataset.id
    const title = document.querySelector('#title-post').value.trim();
    const content = document.querySelector('#content-post').value.trim();

    if (id && title && content) {
        // Send a POST request to the API endpoint
        const response = await fetch(`/api/posts/${id}`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, content }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            // If successful, redirect the browser to the dashboard page
            document.location.replace('/dashboard');
        } else {
            alert(response.statusText);
        }
    }
}

const deletePostHandler = async (event) => {

}

document
    .querySelector('#update-post-button')
    .addEventListener('click', updatePostHandler);

document
    .querySelector('#delete-post-button')
    .addEventListener('click', deletePostHandler);