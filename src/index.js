// ES modules syntax
// "type": "module", in package.json needed
import express from "express"
import dogsRouter from "./routes/dogs.routes.js";
import { getAllPosts } from "./controllers/dogs.controllers.js"

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(dogsRouter);

app.listen(PORT, () => {
    console.log(`Server is online on ${PORT} port.`);
    getAllPosts();
})