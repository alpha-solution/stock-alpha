import Part from "@/models/part";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const { partcode } = req.query;
        const result = await Part.findOne({ part_code: partcode }).exec();
        return res.status(200).json(result);
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
}