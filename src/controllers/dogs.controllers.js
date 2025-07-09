// ES import syntax
import axios from "axios"
import { isaVideo } from "../utils/dogs.utils.js"

// Get all the posts' URLs and assign like value to them, parse their type
export async function fetchPosts() {
    const response = await axios.get("http://random.dog/doggos");
    let filesArray = response.data;

    global.posts = filesArray.map(file => ({
        file,
        url: `http://random.dog/${file}`,
        likes: 0,
        type: isaVideo(file)
    }));
}

// GET /
export async function getAllPosts(req, res) {
    try {

        if (!global.posts) {
            await fetchPosts();
        }

        // 200 - OK
        res.status(200).json(global.posts);

    } catch (err) {
        console.log("Error 'getAllPosts':", err);
        res.status(500).json({ 
            success: false,
            message: "Internal server error." 
        });
    }
}

// GET /post/:filename
export function getPost(req, res) {

    // If the getAllPosts was invoked at least once
    if (posts) {
        // Searching for the post in our "database"
        const post = posts.find(p => p.file === req.params.filename);

        // Check whether we found the post
        if (!post) {
            // No post with such a name found
            res.status(404).json({
                success: false,
                message: "No such dog file found."
            })
        } // If we found the searched post
        else {
            // Send the requested json file
            res.status(200).json({
                success: true,
                data: post
            });
        }

    }
    else {
        // 204 - No content
        res.status(204).json({
            success: false,
            message: "Please search for all the posts first."
        })
    }
}

// POST /:filename
export function likePost(req, res) {

    // If we have the database up
    if (posts) {
        const post = posts.find(p => p.file == req.params.filename);

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