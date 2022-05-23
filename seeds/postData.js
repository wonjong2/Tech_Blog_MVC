const { Post } = require('../models');

const postData = [
    {
        title: 'About CSS',
        content: `CSS is the language we use to style an HTML document.
CSS describes how HTML elements should be displayed.`,
        date: 'January 2, 2021',
        creator_id: 3
    },
    {
        title: 'Waht is MVC?',
        content: `MVC (Model-View-Controller) is a pattern in software design commonly used to implement user interfaces, data, and controlling logic. It emphasizes a separation between the software's business logic and display. This "separation of concerns" provides for a better division of labor and improved maintenance. Some other design patterns are based on MVC, such as MVVM (Model-View-Viewmodel), MVP (Model-View-Presenter), and MVW (Model-View-Whatever).`,
        date: 'May 2, 2021',
        creator_id: 2
    },
    {
        title: 'Using HTTP cookies',
        content: `An HTTP cookie (web cookie, browser cookie) is a small piece of data that a server sends to a user's web browser. The browser may store the cookie and send it back to the same server with later requests. Typically, an HTTP cookie is used to tell if two requests come from the same browser—keeping a user logged in, for example. It remembers stateful information for the stateless HTTP protocol.`,
        date: 'May 15, 2022',
        creator_id: 1
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;