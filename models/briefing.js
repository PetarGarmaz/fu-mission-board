import  {Schema, model, models} from "mongoose";

const BriefingSchema = new Schema ({
	host: {
		type: Schema.Types.ObjectId,
		ref: "User",
	},
	title: {
		type: String,
		required: [true, "Mission title is required!"]
	},
	host_date: {
		type: Date,
		required: [true, "Host date is required!"]
	},
	briefing: {
		type: String,
		required: [true, "Briefing is required!"]
	},
	briefing_image: {
		type: String
	},
	status: {
		type: String,
		required: [true, "Status is required!"]
	}
});

const Briefing = models.Briefing || model("Briefing", BriefingSchema)

export default Briefing;