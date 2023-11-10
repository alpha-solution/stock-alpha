import Part from "@/models/part";
import connectMongoDB from "@/utils/connect";

export default async function handler(res) {
    try {
        await connectMongoDB();
        const parts = await Part.find({});
        return res.status(200).json(parts);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}