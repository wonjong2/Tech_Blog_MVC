const newPostHandler = async (event) => {
    const dashboardEl = document.querySelector('#dashboard');
    const newPostFormEl = document.querySelector('#new-post-form');

    dashboardEl.style.display = 'none';
    newPostFormEl.style.display = 'block';
};

document
    .querySelector('#new-post')
    .addEventListener('click', newPostHandler);