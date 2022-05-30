// Event handler for the clicking on the specific post in the home page
const selectedPostHandler = async (event) => {
    console.log(event);
    const id = event.target.dataset.postId ? event.target.dataset.postId : event.target.parentElement.dataset.postId;

    console.log(id)
    if (id) {
        // Login state now, restart the timer to check auth.
        if (isLogin) {
            restartAuthTimer();
        }

        document.location.assign(`/${id}`);
    }
};

document
    .querySelector('.posts-home')
    .addEventListener('click', selectedPostHandler);