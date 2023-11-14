import Part from "@/models/part";
import connectMongoDB from "@/utils/connect";

export default async function handler(req, res) {
    if (req.method === "POST") {
        try {
            await connectMongoDB();
            const { part } = req.query;
            console.log(part);

            const insertedPart = new Part({
                part_code: part[0],
                part_name: part[1]
            });

            const result = await insertedPart.save();

            if (result) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false });
            }

        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }

    if (req.method === "DELETE") {
        try {
            await connectMongoDB();
            const { part } = req.query;
            console.log(part);

            const partCode = part[0];

            const result = await Part.deleteOne({ part_code: partCode });

            if (result) {
                return res.status(200).json({ success: true });
            } else {
                return res.status(500).json({ success: false });
            }

        } catch (error) {
            console.error("Error: ", error);
            return res.status(500).json({ error: "Internal Server Error" });
        }
    }
}