import Part from "@/models/part";
import connectMongoDB from "@/utils/database";

export default async function handler(req, res) {

    try {

        await connectMongoDB();
        const { part } = req.query;
        console.log(part);

        switch (req.method) {

            case "POST":
                const insertedPart = new Part({
                    part_code: part[0],
                    part_name: part[1]
                });

                const resultPost = await insertedPart.save();

                if (resultPost) {
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ success: false });
                }

            case "DELETE":
                const partCode = part[0];
                const resultDelete = await Part.deleteOne({ part_code: partCode });

                if (resultDelete) {
                    return res.status(200).json({ success: true });
                } else {
                    return res.status(500).json({ success: false });
                }

            default:
                return res.status(405).json({ error: "Method Not Allowed" });
        }

    } catch (error) {
        console.error("Error: ", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}