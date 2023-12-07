import mongoose from 'mongoose';

let isConnected = false;

export const connectToDB = async () => {
	mongoose.set('strictQuery', true) //must do

	if (isConnected) {
		console.log("MongoDB is connected");
		return;
	}

	try {
		await mongoose.connect(process.env.MONGODB_URI, {
			dbName: "fu_mission_board",
			useNewUrlParser: true,
			useUnifiedTopology: true
		})

		isConnected = true;
		console.log("MongoDB conncted");
	} catch (error) {
		console.log(error);
	}
}