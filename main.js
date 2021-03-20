//"C:\Users\gusza\OneDrive\Desktop\College\Senoir Year\Spring 2021\Special Topics\Web_Dev_Final_Project+Exp_Node_MDB"
//use CTRL+SHIFT+M for seeing readme preview
const express = require("express"), app = express(),
homeController = require("./controllers/homeControllers"),
errorController = require("./controllers/errorController"),
layouts = require("express-ejs-layouts");



app.set("port", process.env.PORT || 3000);

app.set("view engine", "ejs");
app.use(layouts);


//default loader change to main page
app.get("/", homeController.showSignUp)  //this is what renders first in the layout.ejs file
//app.get("/",);

//pre processing requests
app.use(express.static("public"));  //can serve static content to users
app.use(
    express.urlencoded({
        extended: false,
    })
);




//routes
app.use(express.json());




app.listen(app.get("port"), () => {
    console.log(`Server is running on port ${app.get("port")}`);

});
