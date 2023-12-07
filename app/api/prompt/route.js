import { connectToDB } from "@utils/database";
import Briefing from "@models/briefing";

export const GET = async (req) => {
	try {
		await connectToDB();

		const briefings = await Briefing.find().populate("host");
		const res = Response(JSON.stringify(briefings), {status:200});

		// Add a unique identifier to the URL to force a cache-busting reload
        const url = new URL(req.url);
        url.searchParams.set("t", Date.now());
        res.headers.set("Cache-Control", "no-cache, no-store, must-revalidate");
        res.headers.set("Pragma", "no-cache");
        res.headers.set("Expires", "0");
        res.headers.set("Location", url.toString());

        return res;
	} catch (error) {
		return new Response("FAIL", {status:500})
	}
}