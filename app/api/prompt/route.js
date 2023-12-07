import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";

export const GET = async (req) => {
	try {
		await connectToDB();

		const briefings = await Briefing.find({}).populate("host");

		return new Response(JSON.stringify(briefings), {status:200})
	} catch (error) {
		return new Response("FAIL", {status:500})
	}
}