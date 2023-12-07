import {Schema, model, models} from 'mongoose';

const UserChema = new Schema({
	email: {
		type: String, 
		unique: [true, "Email already exists!"],
		required: [true, "Email is required!"]
	},
	username: {
		type: String, 
		required: [false, "Username is required!"]
	},
	image: {
		type: String	
	}
})

const User = models.User || model("User", UserChema);

export default User;