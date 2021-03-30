"use strict";

const mongoose = require("mongoose"),
	User = require("./models/user");

mongoose.connect("mongodb://localhost:27017/Orbit_Users", { useNewUrlParser: true });
mongoose.connection;

var users = [
	{
		firstName: "Gabriel",
    	lastName: "Jones",
    	Gender: "Male",
    	City_State: "Colorado",
    	Username: "Toast",
    	Email: "toast@toast.com",
    	Password: "Toast123",
    	VPassword: "Toast123",
    	DOB: "04/04/1444",
    	Bio: "yes",
    	SecurityQ1: "yes",
    	SecurityA1: "yes",
    	SecurityQ2: "yes",
    	SecurityA2: "yes",
    	SecurityQ3: "yes",
    	SecurityA3: "yes"		
	},
	{
		firstName: "Gabriellll",
    	lastName: "Jonessss",
    	Gender: "Male",
    	City_State: "Colorado",
    	Username: "Toast5",
    	Email: "toast5@toast.com",
    	Password: "Toast1235",
    	VPassword: "Toast1235",
    	DOB: "04/04/1444",
    	Bio: "yes",
    	SecurityQ1: "yes",
    	SecurityA1: "yes",
    	SecurityQ2: "yes",
    	SecurityA2: "yes",
    	SecurityQ3: "yes",
    	SecurityA3: "yes"		
	},
	{
		firstName: "Gabriella",
    	lastName: "Jonesy",
    	Gender: "Male",
    	City_State: "Colorado",
    	Username: "Toast7",
    	Email: "toast7@toast.com",
    	Password: "Toast1237",
    	VPassword: "Toast1237",
    	DOB: "04/04/1444",
    	Bio: "yes",
    	SecurityQ1: "yes",
    	SecurityA1: "yes",
    	SecurityQ2: "yes",
    	SecurityA2: "yes",
    	SecurityQ3: "yes",
    	SecurityA3: "yes"		
	}
];

User.deleteMany()
	.exec()
	.then(() => {
		console.log("User data is empty!");
	});

var commands = [];

users.forEach(c => {
	commands.push(
		User.create({
			firstName: c.firstName,
    		lastName: c.lastName,
    		Gender: c.Gender,
    		City_State: c.City_State,
    		Username: c.Username,
    		Email: c.Email,
    		Password: c.Password,
    		VPassword: c.VPassword,
    		DOB: c.DOB,
    		Bio: c.Bio,
    		SecurityQ1: c.SecurityQ1,
    		SecurityA1: c.SecurityA1,
    		SecurityQ2: c.SecurityQ2,
    		SecurityA2: c.SecurityA2,
    		SecurityQ3: c.SecurityQ3,
    		SecurityA3: c.SecurityA3
		})
	);
});

Promise.all(commands)
	.then(r => {
		console.log(JSON.stringify(r));
		mongoose.connection.close();
	})
	.catch(error => {
		console.log('ERROR: ${error}')
	});

