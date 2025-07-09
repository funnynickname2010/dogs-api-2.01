// ES modules syntax
import express from "express"
import { getAllPosts } from "../controllers/dogs.controllers.js"
import { getPost } from "../controllers/dogs.controllers.js"
import { likePost } from "../controllers/dogs.controllers.js"


const dogsRouter = express.Router();

dogsRouter.get("/posts/:filename", getPost);
dogsRouter.get("/", getAllPosts);
dogsRouter.post("/like/:filename", likePost);


export default dogsRouter;