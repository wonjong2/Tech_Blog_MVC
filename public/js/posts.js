const selectedPostHandler = async (event) => {
    console.log(event);
    const id = event.target.dataset.postId ? event.target.dataset.postId : event.target.parentElement.dataset.postId;

    console.log(id)
    if (id) {
        // try {
        // const response = await fetch(`/${id}`, {
        //     method: 'GET'
        // });

        // if (response.ok) {
        document.location.assign(`/${id}`);
        // }
        //         else {
        //     alert(response.statusText);
        // }
        // }
        // catch (err) {
        //     alert(err);
        // }
    }
};

document
    .querySelector('.posts-home')
    .addEventListener('click', selectedPostHandler);