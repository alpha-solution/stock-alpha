import Part from "@/models/part";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    try {
        await connectMongoDB();
        const { part } = req.query;
        console.log(part);

        const insertedPart = new Part({
            part_code: part[0],
            part_name: part[1]
        });
        insertedPart.save();
        return res.status(200).json({ success: true });
    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ success: false });
    }
}