// ES import syntax
import axios from "axios"

function isaVideo(mystring) {
    return mystring.endsWith(".mp4") || mystring.endsWith(".webm");
}

// Get all the posts' URLs and assign like value to them, parse their type
// GET /posts
async function getAllPosts(req, res) {
    
    // In case something breaks in the process of fetching
    try {
        const response = await axios.get("http://random.dog/doggos");
        // The site sends back the names of the pictures
        let filesArray = response.data;

        // Creating an array of json objects, posts, in memory
        global.posts = filesArray.map(file => ({
            file,
            url: `http://random.dog/${file}`,
            likes: 0,
            type: isaVideo(file)
        }))
    }
    catch (err) {
        console.log("Error 'getAllPosts': ", err);
        return res.status(500) // Internal server error status code
    }

    res.json(posts);
}

// GET /posts/:filename
function getPost(req, res) {
    // The result variable is needed in order not to create multiple return statements
    let result = null;
    let statusCode = null;

    // If the getAllPosts was invoked at least once
    if (posts) {
        // Searching for the post in our "database"
        const post = posts.find(p => p == req.params.filename);

        // Check whether we found the post
        if (!post) {
            // No post with such a name found
            statusCode = 404; // 404 - Not found
            result = { message: "No such dog file found." };
        } // If we found the searched post
        else {
            result = post; // Send the requested json file
            statusCode = 200; // 200 - OK
        }

    }
    else {
        statusCode = 204; // 204 - No content
        result = { message: "Please search for all the posts first."};
    }

    res.status(statusCode).json(result);
}

// POST /:filename
function likePost(req, res) {

    // If we have the database up
    if (posts) {
        const post = posts.find(p => p == req.params.filename);

        // Found the post
        if (post) {
            post.likes++;
            res.status(200).json(post); // OK
        }
        else { // Haven't found the post
            res.status(404).json( { message: "No such dog file found." });
        }
    }
    else { // Haven't found the database, 204 - No content
        res.status(204).json( { message: "No database, please search for all dogs first."});
    }
}


// ES export syntax
export {
    getAllPosts,
    likePost,
    getPost
}