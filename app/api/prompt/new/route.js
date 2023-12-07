import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";

export const POST = async (req) => {
	const {userId, briefing, title, host_date, briefing_image, status} = await req.json();

	try {
		await connectToDB();

		const newBriefing = new Briefing({
			host: userId,
			title: title,
			host_date: host_date,
			briefing: briefing,
			briefing_image: briefing_image,
			status: status,
		});

		await newBriefing.save();

		return new Response(JSON.stringify(newBriefing), {status: 201})
	} catch (error) {
		return new Response("Failed to create briefing", {status: 500})
	}
}