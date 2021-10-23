const express = require('express');
const app = express();//create our server
const port = 3000;
const connectDB= require("./database")

const userRouter=require("./routes/user");
const bookRouter=require("./routes/book");
app.use(express.json()); //read only json files

app.use("/users", userRouter)
app.use("/books", bookRouter)

//localhost:3000/users/1245358


const start = async () => {
    try {
        await connectDB("mongodb+srv://nodeproject:nodeproject@nodeproject.83mwm.mongodb.net/myFirstDatabase?retryWrites=true&w=majority");
        app.listen(port, () => console.log(`Server is listening port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();